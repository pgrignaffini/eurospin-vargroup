import React from 'react'
import nftContractABI from "../../../contracts/abi/nft.json"
import SpinTokenABI from "../../../contracts/abi/spintoken.json"
import { useContractWrite, useAccount, useWaitForTransaction, usePrepareContractWrite } from 'wagmi'
import { nftAddress, tokenAddress } from '../utils/constants';
import { uploadJSONToIPFS } from "../utils/pinata"
import TxHash from './TxHash';
import { Ring } from '@uiball/loaders'
import { NFTItem, Item } from '../types/types';
import { utils } from "ethers"

type Props = {
    item: NFTItem | Item
}

function MintButton({ item }: Props) {

    const { address } = useAccount()
    const [minted, setMinted] = React.useState<boolean>(false)

    const amount = utils.parseEther(item?.price?.toString())

    const { config: configApprove } = usePrepareContractWrite({
        addressOrName: tokenAddress,
        contractInterface: SpinTokenABI,
        functionName: 'approve',
        args: [address, amount],
    })

    const { write: transferTokens } = useContractWrite({
        mode: 'recklesslyUnprepared',
        addressOrName: tokenAddress,
        contractInterface: SpinTokenABI,
        functionName: 'transferFrom',
    })

    const { writeAsync: approveTokens } = useContractWrite(configApprove)


    const uploadMetadataToIPFS = async () => {
        const name = item?.name
        const description = item?.description
        const image = item?.image
        const category = item?.category
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
    })

    const { isLoading: isLoadingTx } = useWaitForTransaction({
        hash: data?.hash,
        onSuccess() {
            setMinted(true)
        }
    })

    return (
        <div className='w-full flex flex-col space-y-2 items-center justify-center'>
            {/* {data &&
                <TxHash hash={data?.hash} />
            } */}
            {!minted ? <button className="btn btn-primary font-poppins text-xl" onClick={async () => {
                const tokenUri = await uploadMetadataToIPFS()
                createToken?.({
                    recklesslySetUnpreparedArgs: [address, tokenUri]
                })
                await approveTokens?.()
                transferTokens?.({
                    recklesslySetUnpreparedArgs: [address, tokenAddress, amount]
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