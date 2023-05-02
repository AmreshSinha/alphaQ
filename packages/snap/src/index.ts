import { OnRpcRequestHandler } from '@metamask/snap-types';
import {nftAddress, nftAbi} from "./constants";
import { Contract, providers } from 'ethers';

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
  const provider = new providers.JsonRpcProvider("https://quiet-damp-brook.matic-testnet.discover.quiknode.pro/c73a64e337a259e2a9e69e3aec35a64c753bc426/");
  const nftContract = new Contract(nftAddress, nftAbi, provider);
  const ntemp = await nftContract.count();
  const n = parseInt((ntemp).toString());
  const idx = (Math.floor(Math.random()*n)).toString();
  const ipfsUrl = await nftContract.tokenURI(idx);
  // Uncomment after Demo
  var contentId = ipfsUrl.split("/").pop();
  contentId = contentId.split("?");
  const response = await fetch(ipfsUrl);
  const json = await response.json();
  // For Demo (Comment after demo)
  // const contentIdLst = ["QmS3mPm2vX3zuJPEKh7dVuHBMUCE37tY8RJeLwbZv3aeXX", "QmXrXKhw1eDxAioTtVYeu7jurqMMVHnkD5XC9HkmKU587y"]
  // const contentId = contentIdLst[Math.floor(Math.random()*contentIdLst.length)];
  return [json, contentId];
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

      // Storing contentId in state
      const state = {
        contentId: randomAd[1][0],
      }
      await wallet.request({
        method: 'snap_manageState',
        params: ['update', state]
      })

      return wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: randomAd[0].name,
            description:
              'Advertisement',
            textAreaContent:
              randomAd[0].description,
          },
        ],
      });
    case 'getAd':
      return await wallet.request({
        method: 'snap_manageState',
        params: ['get']
      })
    default:
      throw new Error('Method not found.');
  }
};
