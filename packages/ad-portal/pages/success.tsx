import Nav from "@/comps/nav";
import styles from '@/styles/Success.module.css'
import Check from "@/comps/check";
import Link from "next/link";

const success = () => {
    return (
        <div className={styles.success}>
            <Nav/>
            <div className={styles.donut_cont}>
                <div className={styles.donut}></div>
                <div className={styles.success_cont}>
                    <div className={styles.check}>
                        <Check/>
                        <div className={styles.success}>Success</div>
                    </div>
                    <div className={styles.text}>Consider what you’re advertising, and enter the most relevant page of your website. This might be your homepage, or  a more specific page.</div>
                    <Link href="/adsDash" className={styles.profile}><div>check profile</div></Link>
                </div>
            </div>
        </div>
        
    );
}
 
export default success;