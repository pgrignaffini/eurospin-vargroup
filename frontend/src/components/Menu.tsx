import React from 'react'
import { useAccount } from 'wagmi'


type Props = {
    setSelectedTab: React.Dispatch<React.SetStateAction<string>>
}

function Menu({ setSelectedTab }: Props) {

    const { isConnected } = useAccount()

    return (
        <div className='w-full h-auto flex justify-between items-center py-3 px-40 '>
            {isConnected && <p className='font-poppins text-sm text-black
             bg-yellow-500 p-2 cursor-pointer rounded-md'
                onClick={() => setSelectedTab('marketplace')}>NFT Marketplace</p>}
            <p className='font-poppins text-sm text-black cursor-pointer' onClick={() => setSelectedTab('home')}>Casa</p>
            <p className='font-poppins text-sm text-black cursor-pointer' onClick={() => setSelectedTab('home')}>Tecnologia & Elettrodomestici</p>
            <p className='font-poppins text-sm text-black cursor-pointer' onClick={() => setSelectedTab('home')}>Fai da te</p>
            <p className='font-poppins text-sm text-black cursor-pointer' onClick={() => setSelectedTab('home')}>Giochi & Bimbo</p>
            <p className='font-poppins text-sm text-black cursor-pointer' onClick={() => setSelectedTab('home')}>Tempo Libero</p>
            <p className='font-poppins text-sm text-black cursor-pointer' onClick={() => setSelectedTab('home')}>Saldi d'Autunno</p>
        </div>
    )
}

export default Menu