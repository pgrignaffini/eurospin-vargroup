import React from 'react'
import { useAccount } from 'wagmi'
import { useAppContext } from '../context/AppContext'
import type { OwnedNft } from "alchemy-sdk"
import { useQuery } from 'react-query'
import { nftAddress } from '../utils/constants';
import OwnedNFT from './OwnedNFT'

type Props = {
    nfts: OwnedNft[]
    setSelectedNFTInfo: React.Dispatch<React.SetStateAction<OwnedNft | null>>
}

function YourNFTs({ nfts, setSelectedNFTInfo }: Props) {

    return (
        <div className="grid grid-cols-4 gap-12">
            {nfts && nfts.length > 0 && nfts.map((nft: OwnedNft) => (
                <div key={nft.tokenId} onClick={() => setSelectedNFTInfo(nft)}>
                    <label htmlFor="nft-info-modal" className="cursor-pointer" >
                        <OwnedNFT nft={nft} />
                    </label>
                </div>
            ))}
        </div>
    )
}

export default YourNFTs