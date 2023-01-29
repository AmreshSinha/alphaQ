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
 * {
 *   attributes: [
 *     { trait_type: 'Background', value: 'Blue' },
 *   ],
 *   description: 'This is a test NFT',
 *   image: 'aweiofujslkufqWEAVIODKMLIAK',
 *   name: 'Test NFT'
 * }
 */
export async function getRandomAd() {
  // const provider = await detectEthereumProvider();
  const provider = new providers.JsonRpcProvider("https://quiet-damp-brook.matic-testnet.discover.quiknode.pro/c73a64e337a259e2a9e69e3aec35a64c753bc426/");
  // const web3Provider = new providers.Web3Provider(provider);
  const nftContract = new Contract(nftAddress, nftAbi, provider);
  const ntemp = await nftContract.count();
  const n = parseInt((ntemp).toString());
  const idx = (Math.floor(Math.random()*n)).toString();
  const ipfsUrl = await nftContract.tokenURI(idx);
  const response = await fetch(ipfsUrl);
  const json = await response.json();
  return json
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
export const onRpcRequest: OnRpcRequestHandler = async ({ origin, request }) => {
  switch (request.method) {
    case 'hello':
      const randomAd = await getRandomAd();
      return wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: getMessage(origin),
            description:
              'Heading',
            textAreaContent:
              `Its an main add ${randomAd.image}`,
          },
        ],
      });
    default:
      throw new Error('Method not found.');
  }
};
