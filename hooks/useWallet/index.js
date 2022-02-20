import { WAVE_PORTAL_CONTRACT } from "../../config"
import wavePortalAbi from "../../contracts/WavePortal.sol/WavePortal.json"
import { useWeb3 } from "@3rdweb/hooks"
import { ethers } from "ethers"
import { useEffect, useState, useCallback } from "react"
import toast from 'react-hot-toast'

export const useWallet = () => {
    const { error, provider, getNetworkMetadata, chainId } = useWeb3();
    const [isLoading, setLoading] = useState(false);
    const [totalWaves, setTotalWaves] = useState(0)
    const [waveList, setWaveList] = useState([])

    const updateWaves = useCallback((provider) => {
		const runUpdates = async () => {
			setTotalWaves(await getTotalWaves(provider));
			setWaveList(await getAllWaves(provider));
		};
		runUpdates();
	}, [setTotalWaves, setWaveList]);

    const sendWave = (message) => {
        if (error) {
            toast.error(error.message)
            return
        }

        if (!provider) {
            toast.error("Connect your wallet")
            return
        }

        setLoading(true)

        writeWave(provider.getSigner(), message).then(async(transaction) => {
            await transaction.wait();
            setLoading(false)
            toast.success("Thanks you for you wave")
            updateWaves(provider)
            const lastWave = await getLastWave(provider)

            if (lastWave.isRewarded) {
                const symbolNetwork = getNetworkMetadata(chainId).symbol
                toast(`Congratulations. You win 0.0001 ${symbolNetwork}`, { icon: "🎉" })
            }
        }).catch((error) => {
            setLoading(false)
            if (error.data) {
                toast.error(error.data.message)
            } else {
                toast.error(error.message)
            }
        }
        );
    }

    useEffect(() => {
		subscribeToWaveEvents(provider, (newWave) => {
			updateWaves(provider);
		});
	}, []);
    
    useEffect(() => {
        if (provider) {  
            updateWaves(provider);
        }
	}, [provider]);

    return {
        isLoading,
        totalWaves,
        waveList,
        sendWave
    }
}

const getTotalWaves = async (provider) => {
    const wavePortalContract = new ethers.Contract(
        WAVE_PORTAL_CONTRACT,
        wavePortalAbi.abi,
        provider
    )
    const totalWaves = await wavePortalContract.getTotalWaves()
    return Number.parseInt(totalWaves.toString(), 10);
}

const writeWave = (signer, message) => {
    const wavePortalContract = new ethers.Contract(
		WAVE_PORTAL_CONTRACT,
		wavePortalAbi.abi,
		signer,
	);

	return wavePortalContract.wave(message, { gasLimit: 400000 });
}

const getLastWave = async (provider) => {
    const wavePortalContract = new ethers.Contract(
        WAVE_PORTAL_CONTRACT,
        wavePortalAbi.abi,
        provider,
    );

    return await wavePortalContract.getLastWave();
}

const getAllWaves = async (provider) => {
    const wavePortalContract = new ethers.Contract(
        WAVE_PORTAL_CONTRACT,
        wavePortalAbi.abi,
        provider,
    );

    const allWaves = await wavePortalContract.getAllWaves();
    
    const normalizeWave = (wave) => ({
        id: Number.parseInt(wave.id.toString(), 10),
        message: wave.message,
        from: wave.from,
        timestamp: new Date(wave.timestamp * 1000),
        isRewarded: wave.isRewarded
    });

    return allWaves.map(normalizeWave).sort((a, b) => b.timestamp - a.timestamp);
}

const subscribeToWaveEvents = (provider, callback) => {
    if (!provider) {
        return
    }

	const wavePortalContract = new ethers.Contract(
		WAVE_PORTAL_CONTRACT,
		wavePortalAbi.abi,
		provider,
	);

	wavePortalContract.on("NewWave", (message, from, timestamp) => {
		callback({ message, from, timestamp });
	});
}