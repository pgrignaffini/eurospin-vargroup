import React from 'react'
import { useAccount } from 'wagmi'
import { useAppContext } from '../context/AppContext'
import type { OwnedNft } from "alchemy-sdk"
import { useQuery } from 'react-query'
import { nftAddress } from '../utils/constants';
import OwnedNFT from './OwnedNFT'

type Props = {
    setSelectedNFTInfo: React.Dispatch<React.SetStateAction<OwnedNft | null>>
}

function YourNFTs({ setSelectedNFTInfo }: Props) {

    const { alchemySdk } = useAppContext()
    const { address } = useAccount()

    const getNFTs = async () => {
        const response = await alchemySdk.nft.getNftsForOwner(address as string)
        return response?.ownedNfts
    }
    const { data: nfts, isLoading } = useQuery(['your-nfts', address], getNFTs, {
        select: (data: OwnedNft[]) => data?.filter((nft: OwnedNft) =>
            (nft.contract.address.toUpperCase() === nftAddress.toUpperCase()) && nft.tokenUri
        )
    })

    console.log(nfts)

    return (
        <div className="grid grid-cols-4 gap-12">
            {isLoading && <p>Loading...</p>}
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