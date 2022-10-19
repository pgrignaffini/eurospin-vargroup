import React from 'react'
import MintButton from '../components/MintButton'
import { sportImage, faidateImage, fruttaImage, halloweenImage, randomImage, surgelatiImage, viaggiImage } from '../utils/constants'

function MintPage() {
    return (
        <div className='flex flex-col space-y-8 min-h-screen justify-center items-center'>
            <div className='flex space-x-4 items-center'>
                <MintButton image={sportImage} name='Sportivo'
                    description='Lo sportivo ti regala uno sconto del 5% su prodotti della categoria sport per un anno'
                    type='extended'
                    category='sport'
                    discount='0.05'
                    price='15' />
                <p>Sportivo</p>
            </div>
            <div className='flex space-x-4 items-center'>
                <MintButton image={faidateImage} name='Aggiustatutto'
                    description='L&apos;aggiustatutto ti regala uno sconto del 5% su prodotti della categoria fai da te per un anno'
                    type='extended'
                    category='fai-da-te'
                    discount='0.05'
                    price='15' />
                <p>Aggiustatutto</p>
            </div>
            <div className='flex space-x-4 items-center'>
                <MintButton image={fruttaImage} name='Salutista'
                    description='Il salutista ti regala uno sconto del 5% su prodotti della categoria frutta per un anno'
                    type='extended'
                    category='frutta'
                    discount='0.05'
                    price='10' />
                <p>Salutista</p>
            </div>
            <div className='flex space-x-4 items-center'>
                <MintButton image={halloweenImage} name='Zuccone'
                    description='Lo zuccone ti regala uno sconto del 5% su prodotti della categoria halloween per un anno'
                    type='extended'
                    category='halloween'
                    discount='0.05'
                    price='15' />
                <p>Zuccone</p>
            </div>
            <div className='flex space-x-4 items-center'>
                <MintButton image={randomImage} name='Matto'
                    description='Il matto ti regala uno sconto del 50% su un prodotto casuale del tuo carrello con un acquisto minimo di 5 prodotti'
                    type='extended'
                    category='all'
                    discount='0.5'
                    price='50' />
                <p>Matto</p>
            </div>
            <div className='flex space-x-4 items-center'>
                <MintButton image={surgelatiImage} name='Eschimese'
                    description='L&apos;eschimese ti regala uno sconto del 5% su prodotti della categoria surgelati per un anno'
                    type='extended'
                    category='surgelati'
                    discount='0.05'
                    price='15' />
                <p>Eschimese</p>
            </div>
            <div className='flex space-x-4 items-center'>
                <MintButton image={viaggiImage} name='Giramondo'
                    description='Il giramondo ti regala uno sconto del 10% su prodotti della categoria viaggi per un acquisto'
                    type='one-time'
                    category='viaggi'
                    discount='0.1'
                    price='100' />
                <p>Giramondo</p>
            </div>
        </div>
    )
}

export default MintPage