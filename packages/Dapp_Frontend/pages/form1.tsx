import Nav from '@/comps/nav';
import styles from '@/styles/Form1.module.css'
import arrow from '@/assets/arrow.svg'
import upload from '@/assets/upload.svg'
import Link from 'next/link';

const Form1 = () => {


    return (
        <div className={styles.form1}>
            <Nav/>

            <div className={styles.step_bar}>
                <img src={arrow.src} alt=""/>
                <div className={styles.bars}>
                    <div></div>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                </div>
            </div>

            <div className={styles.form_cont}>
                
                <div className={styles.create_name}>Create your Dapp's profile</div>

                <div className={styles.logo_cont}>
                    <div className={styles.logo_left}>
                        <div className={styles.logo_text}>Dapp Logo</div>
                        <div className={styles.logo}></div>
                    </div>
                    <div className={styles.logo_right}><img src={upload.src} alt="" /></div>
                </div>

                <div className={styles.name_cont}>
                    <div className={styles.name}>Name of your Dapp</div>
                    <div className={styles.name_inp}>
                        <input type="text" placeholder='Ex: Metamask Ad' className={styles.inp}/>
                    </div>
                </div>
                <div className={styles.desc_cont}>
                    <div className={styles.desc}>Describe your Dapp</div>
                    <div className={styles.desc_inp}>
                        <input type="text" placeholder='Ex: we created a decentralised ad platform which is transparent.' className={styles.inp2}/>
                    </div>
                </div>
                <div className={styles.proc_button}><Link href='/form2'>Proceed to Ad</Link></div>
            </div>
        </div>
    );
}
 
export default Form1;