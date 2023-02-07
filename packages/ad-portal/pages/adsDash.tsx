import { useContext, useEffect, useState } from "react";
import { MetaMaskContext } from "@/hooks";
import Nav from "@/comps/nav";
import AdsListCard from "@/comps/adsListCard";
import Metrics from "@/comps/metrics";
import styles from '@/styles/adsDash.module.scss';
import metamaskLogo from '@/assets/metamask-logo.png';
import axios from "axios";

export default function adsDash() {
    const [ads, setAds] = useState([]);
    const [selectedAd, setSelectedAd] = useState<number>();
    const callback = (count: number | undefined) => {
        setSelectedAd(count)
    }
    console.log(selectedAd)
    const fetchAds = async () => {
        if (typeof window !== 'undefined') {
            if (window.ethereum.selectedAddress === null) {
                window.location.href = '/landing';
            }
            const origin = window.location.origin;
            const response = await axios.get(`${origin}/api/fetchAds`, {
                params: {
                    hashId: window.ethereum.selectedAddress
                }
            });
            // console.log(response.data.ads);
            setAds(response.data.ads);
        }
    }
    // console.log(ads)
    
    useEffect(() => {
        fetchAds();
    }, [])
    
    return (
        <>
            <Nav />
            <div className={styles.infoWrapper}>
                <div className={styles.infoCard}>
                    <div className={styles.metamaskLogo}>
                        <img src={metamaskLogo.src} />
                    </div>
                    <div className={styles.info}>
                        <h1>Metamask Ad</h1>
                        <p>Create content to articulate message about DAO operations. vision, mission and structure for social platforms. Create content to articulate message about DAO operations. vision, mission and structure for social platforms.</p>
                    </div>
                </div>
                <div className={styles.fillerCard}></div>
            </div>
            <hr className={styles.hrLine} />
            <div className={styles.adsWrapper}>
                <div className={styles.adsList}>
                    <h1>Ads posted</h1>
                    {ads.map((ad: {ad: {contentId: string}, adImage: string, adName: string}, index) => {
                        return (
                            <AdsListCard 
                                key={index}
                                title={ad.adName}
                                image={ad.adImage}
                                contentId={ad.ad.contentId}
                                onClick={callback}
                            />
                        )
                    })
                    }
                    {/* <AdsListCard /> */}
                </div>
                <div className={styles.metricsWrapper}>
                    <h1>Metrics</h1>
                    {selectedAd !== undefined ? <Metrics count={selectedAd} /> : <Metrics />}
                </div>
            </div>
        </>
    )
}