import { WAVE_PORTAL_CONTRACT } from "../../config"
import wavePortalAbi from "../../contracts/WavePortal.sol/WavePortal.json"
import { useWeb3 } from "@3rdweb/hooks"
import { ethers } from "ethers"
import { useEffect, useState, useCallback } from "react"
import toast from 'react-hot-toast'

export const useWallet = () => {
    const { error, provider } = useWeb3();
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

        writeWave(provider.getSigner(), message).then(async(transaction) => {
            await transaction.wait();
            toast.success("Thanks you for you wave")
            updateWaves(provider)
        }).catch((error) => {
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

	return wavePortalContract.wave(message);
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