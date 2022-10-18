import React from 'react'

type Props = {}

function Footer({ }: Props) {
    return (
        <div className='bg-primary'>
            <div className='w-2/3 mx-auto flex justify-between items-center h-auto p-5 '>
                <img src='/logo.svg' alt='Eurospin' className='w-24 h-24' />
                <p className='font-poppins text-sm text-white uppercase cursor-pointer'>Come acquistare</p>
                <p className='font-poppins text-sm text-white uppercase cursor-pointer'>Assistenza e Sicurezza</p>
                <p className='font-poppins text-sm text-white uppercase cursor-pointer'>Scopri Eurospin</p>
                <p className='font-poppins text-sm text-white uppercase cursor-pointer'>Contatti</p>
            </div>
        </div>
    )
}

export default Footer