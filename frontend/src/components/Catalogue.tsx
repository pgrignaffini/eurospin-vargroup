import React from 'react'
import { Item } from '../types/types'
import { CatalogueList } from "../utils/constants"
import CatalogueItem from './CatalogueItem'

type Props = {
    setSelectedCatalogueItem: React.Dispatch<React.SetStateAction<Item | null>>
}

function Catalogue({ setSelectedCatalogueItem }: Props) {
    return (
        <div className="grid grid-cols-4 gap-12">
            {CatalogueList.map((item: Item) => (
                <label key={item.name} htmlFor="item-modal" className="cursor-pointer" >
                    <div onClick={() => setSelectedCatalogueItem(item)}>
                        <CatalogueItem item={item} />
                    </div>
                </label>
            ))}
        </div>
    )
}

export default Catalogue