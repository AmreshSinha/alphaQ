import Nav from '@/comps/nav';
import styles from '@/styles/Landing.module.css'
import meta from '@/assets//metamask.gif'
import { connectMetamask } from '@/utils';
import { useEffect, useState } from 'react';

const Landing = () => {
    const [windowDefined, setWindowDefined] = useState(false);
    const [connected, setConnected] = useState(false);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowDefined(true);
            if (window.ethereum.selectedAddress) {
                window.location.href = '/form2';
                setConnected(true);
            }
        }
    })
    const handleConnectClick = async () => {
        await connectMetamask();
        setConnected(true);
        setTimeout(() => {window.location.href = '/form3'}, 3000);
    }
    return (
        <div className={styles.landing}>
            <Nav/>

            <div className={styles.cont}>
                <div className={styles.cont1}>
                    <div className={styles.top}>
                        <div className={styles.grow}>Grow your community with Metamask Ads</div>
                        <div className={styles.desc}>Be seen by users at the very moment they do a transaction in a popular dapp using metamask wallet.</div>
                    </div>
                    <div className={styles.down}>
                        {windowDefined ? (connected ? <div className={styles.conn_button}><div>Connected</div></div> : <div className={styles.conn_button} onClick={handleConnectClick}><div>Connect Wallet</div></div>) : <div className={styles.conn_button}><div>Loading...</div></div>}
                        <div className={styles.text}>Get started with free personalised support. Create your custom ad plan with Metamask Ads</div>
                    </div>
                </div>
                <div className={styles.cont2}>
                    <img src={meta.src} alt="" />
                </div>
            </div>
        </div>
    );
}
 
export default Landing;