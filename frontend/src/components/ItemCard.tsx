import React from 'react'

type Props = {
    image: string,
    title: string,
    price: number,
}

function ItemCard({ image, title, price }: Props) {
    return (
        <div className='flex flex-col justify-center cursor-pointer'>
            <img src={image} alt={title} className='w-80 h-80 object-contain' />
            <p className='font-poppins font-semibold text-center mt-4 text-md'>{title}</p>
            <p className='font-poppins text-4xl mt-4 text-primary text-center'>{price}€</p>
        </div>
    )
}

export default ItemCard