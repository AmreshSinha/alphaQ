import { useState } from 'react';
import styles from '@/styles/metrics.module.scss';
import EyeSVG from '@/assets/Eye.svg';

export default function Metrics({ count }: {count?: number}) {
    const [metrics, setMetrics] = useState();
    console.log(count)
    return (
        <div className={styles.metric_wrapper}>
            {count !== undefined ? <div className={styles.ad_views_wrapper}>
                <img src={EyeSVG.src} />
                <div className={styles.ad_views}>
                    <h1>{count}</h1>
                    <p>No of people who viewed the ad</p>
                </div>
            </div> : null}
            {count===undefined ? (<div className={styles.clickOnAd}><h1>Click on Ad to see the metrics</h1></div>) : null}
        </div>
    )
}