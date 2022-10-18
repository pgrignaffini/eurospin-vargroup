import React from 'react'

type Props = {}

function Menu({ }: Props) {
    return (
        <div className='w-full h-auto flex justify-between items-center py-3 px-40 '>
            <p className='font-poppins text-sm text-black bg-yellow-500 p-2 rounded-md'>Offerte solo casa</p>
            <p className='font-poppins text-sm text-black'>Casa</p>
            <p className='font-poppins text-sm text-black'>Tecnologia & Elettrodomestici</p>
            <p className='font-poppins text-sm text-black'>Fai da te</p>
            <p className='font-poppins text-sm text-black'>Giochi & Bimbo</p>
            <p className='font-poppins text-sm text-black'>Tempo Libero</p>
            <p className='font-poppins text-sm text-black'>Saldi d'Autunno</p>
        </div>
    )
}

export default Menu