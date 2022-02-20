import { ConnectWallet } from '@3rdweb/react'
import { useWeb3 } from "@3rdweb/hooks";
import { useSwitchNetwork } from "@3rdweb/hooks";
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { middleStringTruncate } from 'utils/middleStringTruncate';
import { HiSwitchHorizontal } from 'react-icons/hi'
import { MATIC_CHAIN_ID } from 'config';
import { BiWallet } from "react-icons/bi"

export const WalletButton = () => {
    const { connectWallet, address, chainId, error, provider, getNetworkMetadata, balance } = useWeb3();
    const {switchNetwork} = useSwitchNetwork()

    const _connectWallet = () => {
        if (error) {
            toast.error(error.message)
        }
        connectWallet("injected")
    }

    if (error) {
        return (
            <div className='flex flex-col gap-2'>
                <button className='bg-red-500 rounded-md p-2' onClick={_connectWallet}>Network Error</button>
                <div>
                    <h2 className='text-white'>Please connect to {getNetworkMetadata(MATIC_CHAIN_ID).chainName}</h2>
                    <button className='bg-white rounded-md flex gap-2 px-2' onClick={() => switchNetwork(MATIC_CHAIN_ID)}> 
                        <div className='flex h-full'>
                            <HiSwitchHorizontal /> 
                        </div>
                        <span className='text-sm font-bold'>Switch Network</span>
                    </button>
                </div>
            </div>
        )
    }

    if (!address) {
        return (
            <button className='bg-sky-600 rounded-md p-2' onClick={() => connectWallet("injected")}>
                <div className='flex justify-center gap-2'>
                    <div className='flex items-center'>
                        <BiWallet color='white' />
                    </div>
                    <span className='font-bold text-white'>Connect Wallet</span>
                </div>
            </button>
        )
    }

    return (
        <div className='flex justify-center bg-sky-600 rounded-md p-2 gap-2 max-w-max'>
            <div className='flex items-center'>
                <BiWallet color='white' />
            </div>
            <span className='font-bold text-white'>
                {middleStringTruncate(address, 6, 6)}
            </span>
        </div>
    )
    
}