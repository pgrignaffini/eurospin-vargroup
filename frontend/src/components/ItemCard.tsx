import React from 'react'
import type { Item } from "../types/types"

interface Props extends Item {
    setCartItems: React.Dispatch<React.SetStateAction<Item[]>>,
}

function ItemCard({ image, name, price, setCartItems }: Props) {

    const [added, setAdded] = React.useState(false)

    return (
        <div className='group relative flex cursor-pointer'>
            <div className='flex flex-col justify-center'>
                <img src={image} alt={name} className='w-80 h-80 object-contain' />
                <p className='font-poppins font-semibold text-center mt-4 text-md'>{name}</p>
                <p className='font-poppins text-4xl mt-4 text-primary text-center'>{price}€</p>
            </div>
            <div className='absolute opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out
            group-hover:bg-transparent w-60 h-80 z-0'>
                <div className='flex items-center justify-center h-full'>
                    {!added ? <button className='p-3 font-poppins text-md bg-primary text-white rounded-md'
                        onClick={() => {
                            setCartItems((prev) => [...prev, { image, name, price }])
                            setAdded(true)
                        }}>
                        Add to Cart
                    </button> :
                        <div className='p-3 font-poppins text-md bg-accent text-white rounded-md'>Added to Cart</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ItemCard