import React from 'react'
import type { OwnedNft } from "alchemy-sdk";

type Props = {
    nft: OwnedNft
}

function OwnedNFT({ nft }: Props) {
    return (
        <div className='ring-4 shadow-xl cursor-pointer ring-accent p-2 rounded-md flex flex-col space-y-4 justify-center items-center'>
            <img className='h-44' src={nft?.rawMetadata?.image} alt={nft?.rawMetadata?.name} />
            <p className='font-poppins text-primary text-lg uppercase text-center'>{nft?.rawMetadata?.name}</p>
        </div>
    )
}

export default OwnedNFT