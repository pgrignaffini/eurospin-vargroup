import React from 'react'
import { UserIcon, BookOpenIcon, ShoppingCartIcon, SearchIcon } from "@heroicons/react/outline"
import type { Item } from "../types/types"
import dynamic from 'next/dynamic'
import { useAccount } from 'wagmi'

const ConnectWallet = dynamic(
    () => import('../components/ConnectWallet'),
    { ssr: false }
)


type Props = {
    cartItems: Item[],
    setSelectedTab: React.Dispatch<React.SetStateAction<string>>
}

function Header({ cartItems, setSelectedTab }: Props) {

    const { isConnected } = useAccount()

    const total = (cartItems.reduce((acc, item) => acc + item.price, 0)).toFixed(2)

    return (
        <div className='bg-primary'>
            <div className='w-4/5 mx-auto flex justify-between items-center h-auto p-5 '>
                <img src='/logo.svg' alt='Eurospin' className='w-24 h-24' />
                <input type="text"
                    className='w-1/3 h-12 p-3 rounded-lg border-2 border-gray-300 text-sm 
            placeholder:font-poppins placeholder:text-black outline-none' placeholder='Cosa stai cercando?' />
                <div className='flex items-center space-x-4'>
                    {isConnected && <UserIcon className='h-8 w-8 text-white cursor-pointer' onClick={() => setSelectedTab('your-nfts')} />}
                    <BookOpenIcon className='h-8 w-8 cursor-pointer text-white' onClick={() => setSelectedTab('catalogue')} />
                    <div className='relative'>
                        <label htmlFor="cart-modal" className="cursor-pointer" >
                            <ShoppingCartIcon className='h-8 w-8 cursor-pointer text-white' />
                        </label>
                        <div className='absolute -top-2.5 left-4 rounded-full w-6 h-6 text-center bg-accent'>
                            <p className='text-white font-poppins'>{cartItems.length ?? 0}</p>
                        </div>
                    </div>
                    <p className='font-poppins text-md text-white'>{total}€</p>
                </div>
                <ConnectWallet />
            </div>
        </div>
    )
}

export default Header