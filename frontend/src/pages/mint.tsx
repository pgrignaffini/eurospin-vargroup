import React from 'react'
import MintButton from '../components/MintButton'

function MintPage() {
    return (
        <div className='flex min-h-screen justify-center items-center'>
            <MintButton image='/nft/sport.png' name='Sportivo'
                description='Lo sportivo ti regala uno sconto del 5% su prodotti della cateogria sport per un anno'
                type='extended'
                category='sport'
                discount='0.05' />
        </div>
    )
}

export default MintPage