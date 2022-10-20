
import React from "react";
import { usePrepareContractWrite, useContractWrite, useAccount, useWaitForTransaction } from 'wagmi'
import SpinTokenABI from "../../../contracts/abi/SpinToken.json"
import { tokenAddress } from "../utils/constants";
import { Ring } from "@uiball/loaders"
import { utils } from "ethers"

type Props = {
    price: number
}

function ClaimItemButton({ price }: Props) {

    const { address } = useAccount()
    const amount = utils.parseEther(price?.toString())

    const { config: configApprove } = usePrepareContractWrite({
        addressOrName: tokenAddress,
        contractInterface: SpinTokenABI,
        functionName: 'approve',
        args: [address, amount],
    })

    const { config: configTransfer } = usePrepareContractWrite({
        addressOrName: tokenAddress,
        contractInterface: SpinTokenABI,
        functionName: 'transferFrom',
        args: [address, tokenAddress, amount],
    })

    const { data, isLoading, write: burnTokens, } = useContractWrite(configTransfer)
    const { writeAsync: approveTokens } = useContractWrite(configApprove)

    const { isSuccess, isLoading: isLoadingTx } = useWaitForTransaction({
        hash: data?.hash,
    })

    return (
        <>
            {!isSuccess ? <button className="w-fit btn mt-4 btn-primary" onClick={async () => {
                await approveTokens?.()
                burnTokens?.()
            }}>
                <div className="flex space-x-8 items-center">
                    <p className="font-poppins text-md">{isLoading || isLoadingTx ? "Acquisto in corso" : "Acquista"}</p>
                    {isLoading || isLoadingTx && <Ring size={30} color="#ffffff" />}
                </div>
            </button> :
                <div className="p-2 mt-4 bg-primary rounded-md">
                    <p className="font-poppins text-md text-center text-white">Acquistato</p>
                </div>}
        </>
    )
}

export default ClaimItemButton