import arrow from '@/assets/arrow.svg'
import Nav from '@/comps/nav';
import styles from '@/styles/Form5.module.css'
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import line from '@/assets/line.svg'
import { nftAddress, nftAbi } from "@/constants";
import { useRouter } from 'next/router';
import detectEthereumProvider from '@metamask/detect-provider';
import { Contract, providers } from 'ethers';
import { ExternalProvider } from '@ethersproject/providers';
import axios from 'axios';

const Form5 = () => {
    const router = useRouter();
    console.log(`https://gateway.pinata.cloud/ipfs/${router.query.hash}`)

    let [val,setVal] = useState(0.255);
    let [total,setTotal] = useState(0.279)

    const ref = useRef<HTMLInputElement>(null);

    // useEffect(() => {
    //     const element = ref.current;
    //     if(element){
    //         element.style.left = `${Number(val/4)}px`;
    //     } 
    //   });
    

    const valChange = (num:string) => {
        let n= Number(num);
        let final = n*(0.5-0.01)/100 + 0.01;
        setVal(+final.toFixed(3));
        let total = Number(final.toFixed(3))+0.024;
        setTotal(+total.toFixed(3));

        const
        rangeV = ref.current;
            const
            newValue = Number( (n - 0) * 100 / (100 - 0) ),
            newPosition = 10 - (newValue * 0.2) - 30;
            // rangeV!.innerHTML = `<span>${Number(final).toFixed(3)} ETH</span>`;
            rangeV!.style.left = `calc(${newValue}% + (${newPosition}px))`;
        
    }

    const getProviderorSigner = async (needSigner = false) => {
        if (window.ethereum) {
            const provider = await detectEthereumProvider();
            const web3Provider = new providers.Web3Provider(provider as ExternalProvider);
        
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
    }

    const proceedToPayment = async () => {
        const signer = await getProviderorSigner(true);
        const nftContract = new Contract(nftAddress, nftAbi, signer);
        const tx = await nftContract.mint(`https://gateway.pinata.cloud/ipfs/${router.query.hash}`);
        await tx.wait().then(async (res: any) => {
            console.log('Transaction Hash', res.transactionHash);
            if (typeof window !== 'undefined') {
                const origin = window.location.origin;
                const response = await axios.post(`${origin}/api/uploadTxHash`, {
                    contentId: router.query.hash,
                    ethAddress: window.ethereum.selectedAddress,
                    txHash: res.transactionHash,
                    purchasedViews: 5000
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                console.log(response);
                if (response.data.message === 'Success') {
                    router.push({
                        pathname: '/success'
                    })
                }
            }
        });
    }

    return (
        <div className={styles.form5}>
            <Nav/>

            <div className={styles.step_bar}>
                <Link href='/form4'><img src={arrow.src} alt=""/></Link>
                <div className={styles.bars}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>

            <div className={styles.payment}>Payment</div>
            <div className={styles.consider}>Consider what you're advertising, and enter the most relevant page of your website. This might be your homepage, or  a more specific page.</div>

            <div className={styles.range_cont}>
                <input type='range' id='range' className={styles.range} min='0' max='100' onChange={(e)=> valChange(e.target.value)} />
                <div className={styles.range_value} id="rangeV" ref={ref}>{val} ETH</div>
                <div className={styles.label_cont}>
                    <div className={styles.label}>0.01 ETH</div>
                    <div className={styles.label}>0.5 ETH</div>
                </div>
                <div className={styles.represent}>*This is currently just for representational purposes. Right now it will charge gas fee only.</div>
            </div>

            <div className={styles.money_top_cont}>
                <div className={styles.money_cont}>
                    <div className={styles.money_txt}>Ad Budget</div>
                    <div className={styles.money}>{val} ETH</div>
                </div>
                <div className={styles.money_cont}>
                    <div className={styles.money_txt}>Convenience fee</div>
                    <div className={styles.money}>0.012 ETH</div>
                </div>
                <div className={styles.money_cont}>
                    <div className={styles.money_txt}>Gas fee</div>
                    <div className={styles.money}>0.012 ETH</div>
                </div>
            </div>
            <img src={line.src} alt="" className={styles.line} />

            <div className={styles.money_cont}>
                <div className={styles.money_txt}>Total payable amount</div>
                <div className={styles.money}>{total} ETH</div>
            </div>

            <button className={styles.proc_button} onClick={proceedToPayment}>Proceed to Pay</button>


        </div>
    );
}
 
export default Form5;