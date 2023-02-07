import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Ad.module.css'
import style from '@/styles/Ad.module.scss'
import Nav from '@/comps/nav'
import AdImage from '@/comps/AdImage'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className={styles.home}>

      <Nav/>

      <div className={styles.h_ad_content}>
        <AdImage/>

        <div className={styles.h_ad_text}>
          <div className={styles.h_ad_title}>Foinbok</div>
          <div className={styles.h_ad_body}>
            Create content to articulate message about DAO operations, vision, mission and structure for social platforms.
          </div>
        </div>
      </div>

      <div className={styles.h_down_cont}>
        <div className={style.h_try_cont}>

          <div className={styles.h_try_block}>
            <div className={styles.h_try_heading}>There's a better way to engage to new members</div>
            <div className={styles.h_try_content}>You don’t want to let new members in your community turn inactive. Let the Foinbok bot take care of it.</div>
            <div className={styles.h_try_button}><span>Try our Product</span></div>
          </div>

          <div className={styles.h_down_svg}>
            <svg width="32" height="17" viewBox="0 0 32 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="16.5517" fill="white"/>
            <path d="M9.10014 14L11.2375 3.24138H13.0163L15.125 14H13.4323L13.1167 12.1639H11.1156L10.7928 14H9.10014ZM11.3738 10.5142H12.8585L12.0121 5.49352H12.2417L11.3738 10.5142ZM16.5165 14V3.24138H19.0986C19.8971 3.24138 20.5331 3.48524 21.0065 3.97296C21.4798 4.45591 21.7165 5.09664 21.7165 5.89517V11.3462C21.7165 12.14 21.4798 12.7807 21.0065 13.2684C20.5331 13.7561 19.8971 14 19.0986 14H16.5165ZM18.1662 12.3503H19.0986C19.3998 12.3503 19.6365 12.2595 19.8087 12.0778C19.9808 11.8913 20.0669 11.6474 20.0669 11.3462V5.89517C20.0669 5.59393 19.9808 5.35246 19.8087 5.17076C19.6365 4.98428 19.3998 4.89103 19.0986 4.89103H18.1662V12.3503Z" fill="#121212"/>
            </svg>
          </div>
          
        </div>
      </div>
    </div>
  )
}
