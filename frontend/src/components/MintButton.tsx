import React from 'react'
import nftContractABI from "../../../contracts/abi/nft.json"
import { useContractWrite, useAccount, useWaitForTransaction } from 'wagmi'
import { nftAddress } from '../utils/constants';
import { uploadJSONToIPFS } from "../utils/pinata"
import TxHash from './TxHash';
import { Ring } from '@uiball/loaders'
import { NFTItem } from '../types/types';

function MintButton({ image, name, description, category }: NFTItem) {

    const { address } = useAccount()
    const [minted, setMinted] = React.useState<boolean>(false)
    const [isMinting, setIsMinting] = React.useState<boolean>(false)

    const uploadMetadataToIPFS = async () => {
        const nftJSON = {
            name,
            description,
            image,
            category,
        }
        try {
            const response = await uploadJSONToIPFS(nftJSON);
            if (response.status === 200) {
                const pinataURL = "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
                console.log("Uploaded metadata to Pinata: ", pinataURL);
                return pinataURL;
            }
        } catch (error) {
            console.log("Error uploading metadata to Pinata: ", error);
        }
    }

    const { write: createToken, data, isLoading } = useContractWrite({
        mode: 'recklesslyUnprepared',
        addressOrName: nftAddress,
        contractInterface: nftContractABI,
        functionName: 'mintNFT',
        onMutate() {
            setIsMinting(true)
        }
    })

    const { isLoading: isLoadingTx } = useWaitForTransaction({
        hash: data?.hash,
        onSuccess() {
            setMinted(true)
        }
    })

    return (
        <div className='flex flex-col space-y-2 items-center justify-center'>
            {/* {data &&
                <TxHash hash={data?.hash} />
            } */}
            {!minted ? <button className="btn btn-primary font-poppins text-xl" onClick={async () => {
                const tokenUri = await uploadMetadataToIPFS()
                createToken?.({
                    recklesslySetUnpreparedArgs: [address, tokenUri]
                })
            }}>
                <p className="font-poppins text-sm">{isLoading || isLoadingTx ? "Acquisto in corso" : "Acquista"}</p>
                {isLoading || isLoadingTx && <Ring size={30} color="#ffffff" />}
            </button> :
                <div className="p-2 mt-4 bg-primary rounded-md">
                    <p className="font-poppins text-xl text-center text-white">Acquistato</p>
                </div>}
        </div>
    )
}

export default MintButton