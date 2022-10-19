import React from 'react'
import { Item } from '../types/types'

type Props = {
    item: Item
}

function CatalogueItem({ item }: Props) {
    return (
        <div className='ring-4 shadow-xl cursor-pointer ring-accent p-2 rounded-md flex flex-col space-y-4 justify-center items-center'>
            <img className='h-44' src={item?.image} alt={item?.name} />
            <p className='font-poppins text-primary text-lg uppercase text-center'>{item?.name}</p>
            <div className='flex items-center space-x-4'>
                <p className='font-poppins text-xl text-primary'>{item?.price}</p>
                <img src="/logo.png" className="w-8 h-8 ring-2 ring-accent rounded-md" />
            </div>
        </div>
    )
}

export default CatalogueItem