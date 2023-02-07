import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import style from '@/styles/Home.module.scss'
import Nav from '@/comps/nav'
import AdImage from '@/comps/AdImage'
import Girl from '@/assets/girl.svg'
import SitGirl from '@/assets/sitGirl.svg'
import bullet from '@/assets/bullet.svg'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className={styles.home}>
      <Nav/>
      
      <div className={styles.home_cont}>
        <div className={styles.cont1}>
          <div className={styles.cont1_left}>

            <div className={styles.welcome}>Welcome to Decentralized Advertising</div>

            <div className={styles.desc}>MetaMask Ad Platform utilizes the power of blockchain technology and the Ethereum network to create a Decentralized advertising solution. </div>

            <div className={styles.be}>
              <div className={styles.be_text}>Be an</div>
              <div className={styles.be_buttons}>

              <Link href='/advertisee_desc'><div className={style.be_button}><div>Advertisee</div></div></Link>
              <Link href='/landing'><div className={style.be_button}><div>Advertiser</div></div></Link>

              </div>
            </div>
          </div>

          <div className={styles.cont1_right}><img src={Girl.src} alt="" className={styles.girl}/></div>
        </div>
        <div className={styles.cont2}>

          <div className={styles.cont2_left}><img src={SitGirl.src} alt="" className={styles.girl}/></div>

          <div className={styles.cont2_right}>
            <div className={styles.head_points}>Key Points</div>
            <div className={styles.points}>
              <div className={styles.point}><img src={bullet.src} alt="" /><div>Advertisers can use our platform to create highly targeted campaigns that reach users based on their interests and demographics.</div></div>
              <div className={styles.point}><img src={bullet.src} alt="" /><div>Our platform offers a user-friendly interface that is easy to navigate and understand.</div></div>
              <div className={styles.point}><img src={bullet.src} alt="" /><div>Users can earn rewards for engaging with ads on our platform, which creates a win-win situation for both advertisers and users.</div></div>
            </div>
          </div>

        </div>
        <div className={styles.cont3}>
          <div className={styles.roadmap}><div>We have an exciting roadmap of future developments planned for our platform, including new features and partnerships.</div></div>
          <div className={styles.questions}><div>If you have any questions or would like to know more about our platform, please do not hesitate to contact us.</div></div>
        </div>
      </div>
    </div>
  )
}
