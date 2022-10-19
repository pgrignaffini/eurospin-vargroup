export interface Item {
    name: string
    price: number
    image: string
    description?: string
    category?: string
}

export interface NFTItem {
    image: string
    name: string
    description: string
    price: string
    type?: string
    category?: string
    discount?: string
}