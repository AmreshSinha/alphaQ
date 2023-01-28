import { OnRpcRequestHandler } from '@metamask/snap-types';
import {nftAddress, nftAbi} from "./constants";
import { Contract, providers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import {ethers} from "ethers"
var adsMap = new Map<string, Object>([
  ['0x1', {
    heading: 'Its an add 1',
  }],
  ['0x2', {
    heading: 'Its an add 1',
  }],
  ['0x3', {
    heading: 'Its an add 1',
  }],
]);

// const MUMBAI_PROVIDER = new JsonRpcProvider("https://quiet-damp-brook.matic-testnet.discover.quiknode.pro/c73a64e337a259e2a9e69e3aec35a64c753bc426/");
// const nftContract = new Contract(nftAddress, nftAbi, MUMBAI_PROVIDER);


/**
 * import { JsonRpcProvider, Contract } from 'ethers';
import { ethers } from 'ethers';

const MUMBAI_PROVIDER = new JsonRpcProvider("https://quiet-damp-brook.matic-testnet.discover.quiknode.pro/c73a64e337a259e2a9e69e3aec35a64c753bc426/");
const nftContract = new Contract(nftAddress, nftAbi, MUMBAI_PROVIDER);

async function getNFTData(): Promise<any> {
  const ntemp = await nftContract.count();
  const n = parseInt((ntemp).toString());
  const idx = (Math.floor(Math.random()*n)).toString();
  const ipfsUrl = await nftContract.tokenURI(idx);
  const response = await fetch(ipfsUrl);
  const json = await response.json();
  return json.attributes;
}

 */

/**
 * Get a message from the origin. For demonstration purposes only.
 *
 * @param originString - The origin string.
 * @returns A message based on the origin.
 */
export const getMessage = (originString: string): string =>
  `Hello, ${originString}!`;

/**
 * Set random ad for each snap call
 */
export async function getRandomAd() {
  const provider = await detectEthereumProvider();
  const web3Provider = new providers.Web3Provider(provider);
  const nftContract = new Contract(nftAddress, nftAbi, web3Provider);
  const ntemp = await nftContract.count();
  const n = parseInt((ntemp).toString());
  const idx = (Math.floor(Math.random()*n)).toString();
  const ipfsUrl = await nftContract.tokenURI(idx);
  const response = await fetch(ipfsUrl);
  const json = await response.json();
  return "asukdasudb"
  // const MUMBAI_PROVIDER=new ethers.providers.JsonRpcProvider("https://quiet-damp-brook.matic-testnet.discover.quiknode.pro/c73a64e337a259e2a9e69e3aec35a64c753bc426/");
  // const nftContract  = new Contract(nftAddress, nftAbi, MUMBAI_PROVIDER);
  // const ntemp = await nftContract.count();
  // // console.log(ntemp)
  // const n = parseInt((ntemp).toString());
  // const idx = (Math.floor(Math.random()*n)).toString();
  // const ipfsUrl = await nftContract.tokenURI(idx);
  // const response = await fetch(ipfsUrl);
  // const json = await response.json();
  // const attr = json.attributes;
  // return "kasbjkdjabs";
  ///AMRESH wrote the below thing
  // let adsLen = adsMap.size;
  // const resKey = Array.from(adsMap.keys())[Math.floor(Math.random() * adsLen)];
  // return adsMap.get(resKey) as {heading: string};
}

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns `null` if the request succeeded.
 * @throws If the request method is not valid for this snap.
 * @throws If the `snap_confirm` call failed.
 */
export const onRpcRequest: OnRpcRequestHandler = ({ origin, request }) => {
  switch (request.method) {
    case 'hello':
      return wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: getMessage(origin),
            description:
              'Heading',
            textAreaContent:
              `Its an main add ${getRandomAd()}`,
          },
        ],
      });
    default:
      throw new Error('Method not found.');
  }
};
