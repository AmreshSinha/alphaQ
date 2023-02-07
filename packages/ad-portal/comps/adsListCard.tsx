import styles from '@/styles/adsListCard.module.scss'
import axios from 'axios';

export default function AdsListCard({ title, image, contentId, onClick}: {title: string, image: string, contentId: string, onClick: (count: number | undefined) => void}) {
    const onCardPress = () => {
        if (typeof window !== 'undefined') {
            const origin = window.location.origin;
            axios.get(`${origin}/api/fetchMetrics`, {
                params: {
                    contentId: contentId
                }
            }).then(res => {
                // console.log(res.data.metrics.views)
                onClick(res.data.metrics.views)
            })
        }
    }
    return (
        <>
            <div className={styles.card} onClick={onCardPress}>
                <div className={styles.icon}>
                    <img src={image} />
                </div>
                <h3>{title}</h3>
            </div>
        </>
    )
}