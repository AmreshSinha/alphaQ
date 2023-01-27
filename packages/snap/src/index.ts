import { OnRpcRequestHandler } from '@metamask/snap-types';

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
 */
export const getRandomAd = (): {heading: string;} => {
  let adsLen = Object.keys(adsMap).length;
  const resKey = Object.keys(adsMap)[Math.floor(Math.random() * adsLen)];
  return adsMap.get(resKey);
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
              `Its an main add ${getRandomAd().heading}`,
          },
        ],
      });
    default:
      throw new Error('Method not found.');
  }
};
