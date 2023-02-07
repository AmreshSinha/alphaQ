import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Last.module.css'
import style from '@/styles/Last.module.scss'
import Nav from '@/comps/nav'
import AdImage from '@/comps/AdImage'
import Bottom from '@/assets/bottom2.svg'
import Img from '@/assets/img.svg'
import alert from '@/assets/alert.svg'
import ad from '@/assets/ad.svg'
import { useRef } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className={styles.home}>

      <Nav/>

      <div className={styles.h_down_cont}>
        <div className={style.h_try_cont}>

          <div className={styles.h_try_block}>
            <div className={styles.box}><img src={Img.src} alt="" /></div>
            <div className={styles.h_try_heading}>There's a better way to engage to new community members</div>
            <div className={styles.h_try_content}>You don’t want to let new members in your community turn inactive. Let the Foinbok bot take care of it.</div>
            <div className={styles.h_try_button}><span>Try DaoManager</span></div>
          </div>

          <div className={styles.h_down_svg}>
            <div className={styles.why_cont}>
              <img src={alert.src} alt="" className={styles.i}  />
              <span className={styles.ad_content}>Your ads may be based on other advertiser choices, your profile and activities - like websites you visit and ads you interact with - as well as other information not listed here.</span>
              <div className={styles.why}>Why am I seeing this Ad</div>
            </div>

            <div className={styles.ad_cont}>
              <img src={ad.src} alt="" />
              <div className={styles.by}>by DaoLens</div>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
