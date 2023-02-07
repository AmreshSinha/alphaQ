import Nav from '@/comps/nav';
import styles from '@/styles/Form3.module.css'
import arrow from '@/assets/arrow.svg'
import Link from 'next/link';
import { SyntheticEvent, useState } from 'react';
import { useRouter } from 'next/router';

const Form3 = () => {
    const router = useRouter();
    console.log("Content ID: ", router.query.cid)

    let [heading,setHeading] = useState('Heading');
    let [body,setBody] = useState('Body');
    let [cta, setCta] = useState('CTA');

    const proceedToNext = (e: SyntheticEvent) => {
        e.preventDefault();
        router.push({
            pathname: '/form4',
            query: { cid: router.query.cid, heading: heading, body: body, cta: cta }
        })
    }
    return (
        <div className={styles.form3}>
            <Nav/>

            <div className={styles.step_bar}>
                <Link href='/form2'><img src={arrow.src} alt=""/></Link>
                <div className={styles.bars}>
                    <div></div>
                    <div></div>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                </div>
            </div>

            <div className={styles.form_cont}>
                <div className={styles.preview_cont}>
                    <div className={styles.see_cont}>
                        <div className={styles.heading}>{heading}</div>
                        <div className={styles.body}>{body}</div>
                        <div className={styles.cta}><div>{cta}</div></div>
                    </div>
                    <div className={styles.preview_txt}>Preview</div>
                </div>

                <div className={styles.down_cont}>
                    <div className={styles.time_cont}>
                        <div className={styles.time}>Now its time to write your Ad</div>
                        <div className={styles.inp_cont}>
                            <input type="text" placeholder='Heading' onChange={(e)=> setHeading(e.target.value)}/>
                            <input type="text" placeholder='Body' onChange={(e)=> setBody(e.target.value)}/>
                            <input type="text" placeholder='CTA button name' onChange={(e)=> setCta(e.target.value)}/>
                        </div>
                    </div>

                    <button className={styles.proc_button} onClick={proceedToNext}>Proceed to Ad</button>
                </div>

            </div>
        </div>
    );
}
 
export default Form3;