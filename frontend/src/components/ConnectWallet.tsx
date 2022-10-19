import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { tokenAddress } from '../utils/constants'
import React from 'react'

function ConnectWallet() {
    const { address, isConnected } = useAccount()
    const { connect } = useConnect({
        connector: new InjectedConnector(),
    })
    const { disconnect } = useDisconnect()
    const { data: balance } = useBalance({
        addressOrName: address,
        token: tokenAddress,
        watch: true,
    })

    const displayBalance = balance ? balance.formatted.split('.')[0] : 0

    return (
        <>
            {
                isConnected ?
                    <div className='flex space-x-3 items-center' >
                        <p className='font-pixel text-white'>{displayBalance}</p>
                        <img src="/logo.png" className="w-6 h-6 ring-2 ring-accent rounded-md" />
                        <button className='border-2 border-white rounded-xl text-white p-2 text-sm font-pixel' onClick={() => disconnect()}>Disconnect</button>
                    </div>
                    :
                    <button className='border-2 border-white rounded-xl text-white text-sm p-2 font-pixel' onClick={() => connect()}>Connect Wallet</button>
            }
        </>
    )
}

export default ConnectWallet
