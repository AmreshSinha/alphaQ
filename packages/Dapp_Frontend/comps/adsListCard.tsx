import styles from '@/styles/adsListCard.module.scss'

export default function AdsListCard({ title, image}: {title: string, image: string}) {
    return (
        <>
            <div className={styles.card}>
                <div className={styles.icon}>
                    <img src={image} />
                </div>
                <h3>{title}</h3>
            </div>
        </>
    )
}