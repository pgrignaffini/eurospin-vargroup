import React from 'react'
import { UserIcon, HeartIcon, ShoppingCartIcon, SearchIcon } from "@heroicons/react/outline"
type Props = {}

function Header({ }: Props) {
    return (
        <div className='w-full flex justify-between items-center h-auto p-5 bg-primary'>
            <img src='/logo.svg' alt='Eurospin' className='w-24 h-24' />
            <input type="text"
                className='w-1/3 h-12 p-3 rounded-lg border-2 border-gray-300 text-sm 
            placeholder:font-poppins placeholder:text-black outline-none' placeholder='Cosa stai cercando?' />
            <div className='flex space-x-4'>
                <UserIcon className='h-8 w-8 text-white' />
                <HeartIcon className='h-8 w-8  text-white' />
                <ShoppingCartIcon className='h-8 w-8  text-white' />
            </div>
        </div>
    )
}

export default Header