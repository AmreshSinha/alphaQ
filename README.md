# TEAM 45

## Requirements

- Node Version: 18.13.x
- Yarn Required

## Installation

1) Clone the repository
   ```
   git clone 
   ```

2) Install Packages
   ```
   yarn install
   ```

3) Generate Prisma Client
   ```
   cd packages/ad-portal && \
   npx prisma generate && \
   cd ../site && \
   npx prisma generate
   ```

4) Start the Workspace
   ```
   yarn start
   ```

## Publisher Usage

1) Copy the utils directory `./packages/site/utils` to your dapp root directory
2) Copy the hooks directory `./packages/site/hooks` to your dapp root directory
3) Copy the constants directory `./packages/site/hooks` to your dapp root directory
4) Copy the config directory `./packages/site/config` to your dapp root directory
5) Copy the types directory `./packages/site/types` to your dapp root directory
6) In your dapp add this code
   ```Typescript
   import { MetamaskActions, MetaMaskContext } from '../hooks';
   import {
     connectSnap,
     connectMetamask,
     getSnap,
     sendHello,
     showAds,
     shouldDisplayReconnectButton,
   } from '../utils';
   import detectEthereumProvider from '@metamask/detect-provider';
   import { BigNumber, Contract, providers } from 'ethers';
   import { TOKENADDRESS, TOKENABI } from '../constants'
   
   ...
   
   const Index = () => {
     const zero = BigNumber.from("0");
     const [userBalance, setUserBalance] = useState(0);
     const [state, dispatch] = useContext(MetaMaskContext);
    
    // Add the to a button through which you want to connect to metamask
    // <button onClick={handleConnectClick}>Connect</button>
    const handleConnectClick = async () => {
    try {
      await connectMetamask();
      await connectSnap();
      const installedSnap = await getSnap();

      dispatch({
        type: MetamaskActions.SetInstalled,
        payload: installedSnap,
      });
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
   };
   
   // (Optional) For testing
   const handleSendHelloClick = async () => {
    try {
      await showAds();
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
   };
   
   // Gets the Provider
   const getProviderOrSigner = async (needSigner = false) => {
    if (window.ethereum) {
    const provider = await detectEthereumProvider();
    const web3Provider = new providers.Web3Provider(provider);

    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 80001) {
      window.alert("Change the network to Mumbai");
      throw new Error("Change network to Mumbai");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      console.log(signer)
      return signer;
    }
    return web3Provider;
    }
    };

    // Add this to a button through which transaction is being done
    // You will have to modify it according to the type of transaction you are doing
    const handleMintMoneyClick = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      console.log("Signer", signer)
      console.log("TokenAdd", TOKENADDRESS)
      const tokenContract = new Contract(TOKENADDRESS, TOKENABI, signer);
      const address = await signer.getAddress();
      const tx = await tokenContract.mint("1000000000000000000");
      await tx.wait();
      await showAds();
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
    };
    
   ...
   return (
     ...
     
     {Your Code}
     
   )
   }
   ```
