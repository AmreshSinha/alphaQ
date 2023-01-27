import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css';
import { BigNumber, Contract, providers, utils } from "ethers";
import { TOKENADDRESS, TOKENABI } from '@/constants'
import Web3Modal from "web3modal";
import React, {useEffect, useState, useRef} from "react";

export default function Home() {
  const zero = BigNumber.from("0")
  console.log(zero)
  const [userBalance, setUserBalance] = useState("0")
  const [walletConnected, setWalletConnected] = useState(false);
  const web3ModalRef = useRef();


  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 80001) {
      window.alert("Change the network to Mumbai");
      throw new Error("Change network to Mumbai");
    }

    if (needSigner) {
      console.log("web3Provider", web3Provider)
      const signer = web3Provider.getSigner();
      console.log("Signer:", signer)
      return signer;
    }
    return web3Provider;
  };

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

  const mintMoney = async()=>{
    const signer = await getProviderOrSigner(true);
    console.log("Signer", signer)
    const tokenContract = new Contract(TOKENADDRESS, TOKENABI, signer);
    const address = await signer.getAddress();
    const tx = await tokenContract.mint("1000000000000000000");
    await tx.wait();
  }

  const getBalance = async()=>{
    const signer = await getProviderOrSigner(true);
    const tokenContract = new Contract(TOKENADDRESS, TOKENABI, signer);
    const address = await signer.getAddress();
    const balance = await tokenContract.balanceOf(address);
    setUserBalance(balance.toString());
  }

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "matic",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
      getBalance();
    }
  }, [walletConnected]);


  return (
    <div style={{
      width:"100vw",
      height:"100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
    <table>
    <td claasName="lines">
    <h1>Yeh Old Dapp hai!</h1>
    <h2>Idhar user aayega. Once he mints the thing by clicking on the below button uske immediate baad popup aana chahiye</h2>
    </td>
    <td>
    <button className='mint' onClick={mintMoney}>Mint Some Money</button>
    <div>{parseInt(userBalance.substring(0,userBalance.length - 15))/1000}</div>
    </td>
    </table>
    </div>
  );
}
/**
 * import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { TOKENADDRESS, TOKENABI } from '@/constants'
import Web3Modal, { providers } from "web3modal";
import React, {useEffect, useState, useRef} from "react";


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [walletConnected, setWalletConnected] = useState(false);
  const web3ModalRef = useRef();

  const getProviderOrSigner = async(needSigner = false)=>{
    const json = await web3ModalRef.current;
    console.log(json)
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    const {chainId} = await web3Provider.getNetwork();
    if (chainId !== 80001) {
      window.alert("Change the network to Mumbai");
      throw new Error("Change network to Mumbai");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  }
  const connectWallet = async () => {
    try {
      // Get the provider from web3Modal, which in our case is MetaMask
      // When used for the first time, it prompts the user to connect their wallet
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };
  const mintBiches = async ()=>{
    const signer = await getProviderOrSigner(true);
    console.log(signer.getAddress())
  }

  //useeffect dalna hai
  useEffect(() => {
    // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
    if (!walletConnected) {
      // Assign the Web3Modal class to the reference object by setting it's `current` value
      // The `current` value is persisted throughout as long as this page is open
      web3ModalRef.current = new Web3Modal({
        network: "matic",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
  }, [walletConnected]);
  return (
    <div style={{
      width:"100vw",
      height:"100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}><button className='mint' onClick={mintBiches()}>Mint Some Money, u broke biches</button></div>
  )
}
 *
 */
