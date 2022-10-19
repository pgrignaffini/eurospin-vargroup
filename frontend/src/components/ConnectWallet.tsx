import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import makeBlockie from "ethereum-blockies-base64"
import React from 'react'

function ConnectWallet() {
    const { address, isConnected } = useAccount()
    const { connect } = useConnect({
        connector: new InjectedConnector(),
    })
    const { disconnect } = useDisconnect()
    const { data: balance } = useBalance({
        addressOrName: address,
        token: '0x0000000000000000000000000000000000001010',
        watch: true,
    })

    const displayBalance = balance ? balance.formatted.split('.')[0] : 0

    return (
        <>
            {
                isConnected ?
                    <div className='flex space-x-3 items-center' >
                        <p className='font-pixel text-white'>{displayBalance}</p>
                        <img src="/logo.svg" className="w-6 h-6 ring-2 p-1 ring-accent rounded-md" />
                        <button className='border-2 border-white rounded-xl text-white p-2 text-sm font-pixel' onClick={() => disconnect()}>Disconnect</button>
                    </div>
                    :
                    <button className='border-2 border-white rounded-xl text-white text-sm p-2 font-pixel' onClick={() => connect()}>Connect Wallet</button>
            }
        </>
    )
}

export default ConnectWallet
