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
import { useState, useRef, useEffect } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { nftAddress, nftAbi } from '@/constants'
import { Contract, providers } from 'ethers';
import axios from 'axios'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ fetchedAd }: {fetchedAd: {name: string, description: string, image: string, attributes: any[]}}) {
    console.log(fetchedAd)
    const redirectToAdSite = () => {
      if (typeof window !== 'undefined') {
        window.open(fetchedAd.attributes[1].value, '_blank')
      }
    }
  return (
    <div className={styles.home}>

      <Nav/>

      <div className={styles.h_down_cont}>
        <div className={style.h_try_cont}>

          <div className={styles.h_try_block}>
            <div className={styles.box}><img src={Img.src} alt="" /></div>
            <div className={styles.h_try_heading}>{fetchedAd.name}</div>
            <div className={styles.h_try_content}>{fetchedAd.description}</div>
            <div className={styles.h_try_button} onClick={redirectToAdSite}><span>{fetchedAd.attributes[0]!.value}</span></div>
          </div>

          <div className={styles.h_down_svg}>
            <div className={styles.why_cont}>
              <img src={alert.src} alt="" className={styles.i}  />
              <span className={styles.ad_content}>Your ads may be based on other advertiser choices, your profile and activities - like websites you visit and ads you interact with - as well as other information not listed here.</span>
              <div className={styles.why}>Why am I seeing this Ad</div>
            </div>

            <div className={styles.ad_cont}>
              <img src={ad.src} alt="" />
              <div className={styles.by}>by {fetchedAd.name}</div>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export async function getServerSideProps(context : any) {
  const { id } = context.query
  const response = await axios.get('https://ipfs.io/ipfs/' + id)
  console.log(response.data)
  return {
    props: {
      fetchedAd: response.data
    }
  }
}

// export const getStaticProps: GetStaticProps = async (context) => {
//     const contentId = context.params?.id
//     const response = await axios.get('https://gateway.pinata.cloud/ipfs/' + contentId)
//     const data = response.data
//     return {
//         props: {
//           data
//         },
//     }
// }

// export const getStaticPaths: GetStaticPaths = async () => {
//     return {
//         paths: [{params: {}}],
//         fallback: true
//     }
// }
