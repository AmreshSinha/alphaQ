import { useState } from 'react';
import styles from '@/styles/metrics.module.scss';
import EyeSVG from '@/assets/Eye.svg';

export default function Metrics({ count }: {count: number}) {
    const [metrics, setMetrics] = useState();
    return (
        <div className={styles.metric_wrapper}>
            {metrics==undefined ? (<div className={styles.clickOnAd}><h1>Click on Ad to see the metrics</h1></div>) : (<h1>Metrics</h1>)}
        </div>
    )
}