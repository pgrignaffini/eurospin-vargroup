import type { NextPage } from "next";
import Head from "next/head";
import Banner from "../components/Banner";
import ItemCard from "../components/ItemCard";
import dynamic from 'next/dynamic'
import Footer from "../components/Footer";
import React from "react";
import type { Item, NFTItem } from "../types/types";
import NFT from "../components/NFT";
import { usePrepareContractWrite, useContractWrite, useAccount, useWaitForTransaction } from 'wagmi'
import SpinTokenABI from "../../../contracts/abi/spintoken.json"
import { tokenAddress, nftAddress, NFTs } from "../utils/constants";
import { Ring } from "@uiball/loaders"
import MintButton from "../components/MintButton";
import YourNFTs from "../components/YourNFTs";
import { OwnedNft } from "alchemy-sdk";
import Catalogue from "../components/Catalogue";
import ClaimItemButton from "../components/ClaimItemButton";
import { useAppContext } from "../context/AppContext";
import { useQuery } from "react-query";

const Header = dynamic(
  () => import('../components/Header'),
  { ssr: false }
)

const Menu = dynamic(
  () => import('../components/Menu'),
  { ssr: false }
)

const Home: NextPage = () => {

  const [cartItems, setCartItems] = React.useState(Array<Item>());
  const [selectedTab, setSelectedTab] = React.useState('home');
  const [selectedNFT, setSelectedNFT] = React.useState<NFTItem | null>(null);
  const [selectedNFTInfo, setSelectedNFTInfo] = React.useState<OwnedNft | null>(null);
  const [selectedCatalogueItem, setSelectedCatalogueItem] = React.useState<Item | null>(null);
  const [selectedDiscount, setSelectedDiscount] = React.useState<OwnedNft | null>(null)
  const [selectedDiscountItem, setSelectedDiscountItem] = React.useState<NFTItem | null>(null)

  const { address } = useAccount();

  const total = (cartItems.reduce((acc, item) => acc + item.price, 0)).toFixed(2)
  const [discountPrice, setDiscountPrice] = React.useState('-1')
  const cashback = (parseInt(total) / 10).toFixed(0) ?? 0

  const { alchemySdk } = useAppContext()

  const getNFTs = async () => {
    const response = await alchemySdk.nft.getNftsForOwner(address as string)
    return response?.ownedNfts
  }
  const { data: nfts, isLoading: isLoadingNfts } = useQuery(['your-nfts', address], getNFTs, {
    select: (data: OwnedNft[]) => data?.filter((nft: OwnedNft) =>
      (nft.contract.address.toUpperCase() === nftAddress.toUpperCase()) && nft.tokenUri
    )
  })

  const applyDiscount = () => {
    const nft = NFTs?.find((nft: NFTItem) => nft.name === selectedDiscount?.rawMetadata?.name)
    setSelectedDiscountItem(nft as NFTItem)
    const discount = nft?.discount
    const discountPrice = (parseFloat(total) - parseFloat(total) * parseFloat(discount as string)).toFixed(2)
    setDiscountPrice(discountPrice)
  }

  const { config } = usePrepareContractWrite({
    addressOrName: tokenAddress,
    contractInterface: SpinTokenABI,
    functionName: 'transferTokens',
    args: [address, cashback],
  })

  const { data, isLoading, write: sendCashback } = useContractWrite(config)

  const { isSuccess, isLoading: isLoadingTx } = useWaitForTransaction({
    hash: data?.hash,
  })

  const cartModal = (
    <>
      <input type="checkbox" id="cart-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative bg-background">
          <label htmlFor="cart-modal" className="btn btn-primary btn-sm btn-circle absolute right-2 top-2"
            onClick={() => setCartItems([])}>✕</label>
          {
            cartItems.length === 0 ? (
              <p className="font-poppins text-md text-primary">Il tuo carrello è vuoto</p>
            ) : (
              <div className='flex flex-col py-3'>
                <div className='flex justify-between items-center'>
                  <p className='font-poppins text-2xl text-primary'>Carrello</p>
                  <p className='font-poppins text-2xl text-primary'>{cartItems.length} {cartItems.length == 1 ? "elemento" : "elementi"}</p>
                </div>
                <div className='flex flex-col space-y-4 mt-4'>
                  {
                    cartItems.map((item, index) => (
                      <div key={index} className='flex justify-between items-center'>
                        <div className='flex items-center'>
                          <img src={item.image} alt={item.name} className='w-20 h-20 object-contain' />
                          <div className='flex flex-col ml-4'>
                            <p className='font-poppins text-md text-primary'>{item.name}</p>
                            <p className='font-poppins text-md text-primary'>{item.price}€</p>
                          </div>
                        </div>
                        <button className='font-poppins text-md bg-primary text-white rounded-md p-2'
                          onClick={() => {
                            setCartItems((prev) => prev.filter((_, i) => i !== index))
                          }}>
                          Rimuovi
                        </button>
                      </div>
                    ))
                  }
                </div>
                <div className="mt-8 flex flex-col space-y-4 items-center">
                  {selectedDiscountItem ?
                    <div>
                      <p>Sconto del {parseFloat(selectedDiscountItem?.discount as string) * 100}% applicato </p>
                      <p className="text-center font-poppins text-xl">Totale: <span className="line-through text-red-500">{total}€</span><span className="text-primary">{" "}{discountPrice}€</span></p>
                    </div>
                    :
                    <p className="text-center font-poppins text-xl text-primary">Totale: {total}€</p>
                  }
                  <div className="flex items-center space-x-2">
                    <p className="text-center font-poppins text-xl text-primary">Punti spesa: {cashback}</p>
                    <img src="/logo.png" className="w-6 h-6 ring-2 ring-accent rounded-md" />
                  </div>
                </div>
                {nfts && <div className=" font-poppins text-primary mt-8  text-md" >I tuoi NFT:</div>}
                <div className="grid grid-cols-5 p-2 h-28 overflow-y-auto gap-4">
                  {isLoadingNfts && <Ring size={30} />}
                  {nfts &&
                    nfts.map((nft: OwnedNft, index) => (
                      <div key={index} className='cursor-pointer' onClick={() => {
                        selectedDiscount === nft ? setSelectedDiscount(null) : setSelectedDiscount(nft)
                        applyDiscount()
                      }}>
                        <img className={`h-16 w-auto bg-white object-contain ${selectedDiscount === nft && "ring-4 ring-primary"}`} src={nft?.rawMetadata?.image} alt={nft?.rawMetadata?.name} />
                      </div>
                    ))}
                </div>
                {!isSuccess ? <button className="btn mt-4 btn-primary font-poppins text-xl" onClick={async () => {
                  sendCashback?.()
                }}>
                  <div className="flex space-x-8 items-center">
                    <p className="flex-1 font-poppins text-md">{isLoading || isLoadingTx ? "Pagamento in corso" : "Paga"}</p>
                    {isLoading || isLoadingTx && <Ring size={30} color="#ffffff" />}
                  </div>
                </button> :
                  <div className="p-2 mt-4 bg-primary rounded-md">
                    <p className="font-poppins text-xl text-center text-white">Pagato</p>
                  </div>}
              </div>
            )}
        </div>
      </div>
    </>
  )

  const nftModal = (
    <>
      <input type="checkbox" id="nft-modal" className="modal-toggle" />
      <div className="modal ">
        <div className="modal-box relative bg-background">
          <label htmlFor="nft-modal" className="btn btn-accent btn-sm btn-circle absolute right-2 top-2">✕</label>
          <div className="grid grid-cols-2 gap-8">
            <img src={selectedNFT?.image} alt={selectedNFT?.name} className='w-full h-full object-contain' />
            <div className='flex flex-col space-y-4 items-center justify-center'>
              <p className='font-poppins text-2xl text-primary'>{selectedNFT?.name}</p>
              <p className='font-poppins text-md text-gray-700 italic'>{selectedNFT?.description}</p>
              <div className='flex items-center space-x-4'>
                <p className='font-poppins text-xl text-primary'>{selectedNFT?.price}</p>
                <img src="/logo.png" className="w-8 h-8 ring-2 ring-accent rounded-md" />
              </div>
              {selectedNFT && <MintButton item={selectedNFT} />}
            </div>
          </div>
        </div>
      </div>
    </>
  )

  const nftInfoModal = (
    <>
      <input type="checkbox" id="nft-info-modal" className="modal-toggle" />
      <div className="modal ">
        <div className="modal-box relative bg-background">
          <label htmlFor="nft-info-modal" className="btn btn-accent btn-sm btn-circle absolute right-2 top-2">✕</label>
          <div className="grid grid-cols-2 gap-8">
            <img src={selectedNFTInfo?.rawMetadata?.image} alt={selectedNFTInfo?.rawMetadata?.name} className='w-full h-full object-contain' />
            <div className='flex flex-col space-y-4 items-center justify-center'>
              <p className='font-poppins text-2xl text-primary'>{selectedNFTInfo?.rawMetadata?.name}</p>
              <p className='font-poppins text-md text-gray-700 italic'>{selectedNFTInfo?.rawMetadata?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )

  const itemModal = (
    <>
      <input type="checkbox" id="item-modal" className="modal-toggle" />
      <div className="modal ">
        <div className="modal-box relative bg-background">
          <label htmlFor="item-modal" className="btn btn-accent btn-sm btn-circle absolute right-2 top-2">✕</label>
          <div className="grid grid-cols-2 gap-8">
            <img src={selectedCatalogueItem?.image} alt={selectedCatalogueItem?.name} className='w-full h-full object-contain' />
            <div className='flex flex-col space-y-4 items-center justify-center'>
              <p className='font-poppins text-2xl text-primary'>{selectedCatalogueItem?.name}</p>
              <p className='font-poppins text-md text-gray-700 italic'>{selectedCatalogueItem?.description}</p>
              <div className='flex items-center space-x-4'>
                <p className='font-poppins text-xl text-primary'>{selectedCatalogueItem?.price}</p>
                <img src="/logo.png" className="w-8 h-8 ring-2 ring-accent rounded-md" />
              </div>
              {selectedCatalogueItem && <ClaimItemButton price={selectedCatalogueItem.price} />}
            </div>
          </div>
        </div>
      </div>
    </>
  )


  return (
    <>
      <Head>
        <title>VargroupHackathon-Eurospin</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Header cartItems={cartItems} setSelectedTab={setSelectedTab} />
      <main className="bg-background min-h-screen">
        {cartModal}
        <Menu setSelectedTab={setSelectedTab} />
        {selectedTab === 'home' && (
          <>
            <Banner />
            <div className="mt-6">
              <p className="font-poppins uppercase text-lg flex justify-center">LE MIGLIORI OCCASIONI LE TROVI SOLO NELL&apos;ONLINE STORE EUROSPIN</p>
            </div>
            <div className="w-3/4 mx-auto p-6 flex items-center space-x-4">
              <ItemCard image="/pomodori.jpeg" category="food" name="Pomodori" price={3.99} setCartItems={setCartItems} />
              <ItemCard image="/banane.jpeg" category="food" name="Banane" price={2.99} setCartItems={setCartItems} />
              <ItemCard image="/finocchi.jpeg" category="food" name="Finocchi" price={3.99} setCartItems={setCartItems} />
              <ItemCard image="/kiwi.jpeg" category="food" name="Kiwi" price={3.99} setCartItems={setCartItems} />
            </div>
            <div className="w-3/4 mx-auto p-6 flex items-center space-x-4">
              <ItemCard image="/lamponi.jpeg" category="food" name="Lamponi" price={4.99} setCartItems={setCartItems} />
              <ItemCard image="/melanzane.jpeg" category="food" name="Melanzane" price={2.99} setCartItems={setCartItems} />
              <ItemCard image="/peperoni.jpeg" category="food" name="Peperoni" price={3.99} setCartItems={setCartItems} />
              <ItemCard image="/zucchine.jpeg" category="food" name="Zucchine" price={2.99} setCartItems={setCartItems} />
            </div>
          </>)}
        {nftModal}
        {
          selectedTab === 'marketplace' && (
            <div className="w-3/4 mx-auto mt-8">
              <p className="text-2xl my-8 font-poppins font-semibold text-primary text-center">Dai un&apos;occhiata ai nostri sconti intelligenti</p>
              <div className="grid grid-cols-4 gap-12">
                {
                  NFTs.map((item, index) => (
                    <div className="col-span-1" key={index} onClick={() => setSelectedNFT(item)}>
                      <label htmlFor="nft-modal" className="cursor-pointer" >
                        <NFT image={item.image} name={item.name} price={item.price} description={item.description} />
                      </label>
                    </div>
                  ))
                }
              </div>
            </div>
          )
        }
        {nftInfoModal}
        {
          selectedTab === 'your-nfts' && (
            <div className="w-3/4 mx-auto pb-8">
              <p className="text-2xl my-8 font-poppins font-semibold text-primary text-center">Ecco i tuoi sconti disponibili</p>
              {nfts && <YourNFTs nfts={nfts} setSelectedNFTInfo={setSelectedNFTInfo} />}
            </div>
          )
        }
        {itemModal}
        {
          selectedTab === 'catalogue' && (
            <div className="w-3/4 mx-auto pb-8">
              <p className="text-2xl my-8 font-poppins font-semibold text-primary text-center">Utilizza i tuoi punti fedeltà per ricevere fantastici premi</p>
              <Catalogue setSelectedCatalogueItem={setSelectedCatalogueItem} />
            </div>
          )
        }
      </main>
      <Footer />
    </>
  );
};

export default Home;
