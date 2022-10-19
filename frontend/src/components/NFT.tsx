import React from 'react'
import type { Item } from "../types/types"

function NFT({ image, name, description, price }: Item) {
    return (
        <label htmlFor="nft-modal" className="cursor-pointer" >
            <div className='ring-4 shadow-xl cursor-pointer ring-accent p-2 rounded-md flex flex-col space-y-4 justify-center items-center'>
                <img className='h-44' src={image} alt={name} />
                <p className='font-poppins text-primary text-lg uppercase text-center'>{name}</p>
                <div className='flex space-x-4'>
                    <p className='font-poppins text-xl text-primary'>{price}</p>
                    <img src="/logo.png" className="w-8 h-8 ring-2 ring-accent rounded-md" />
                </div>
            </div>
        </label>
    )
}

export default NFT