import Nav from '@/comps/nav';
import styles from '@/styles/Form2.module.css'
import arrow from '@/assets/arrow.svg'
import bullet from '@/assets/bullet.svg'
import Link from 'next/link';
import pic_drag from '@/assets/pic_drag.svg'
import { useState, useCallback, FormEvent } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import Router from 'next/router';



const Form2 = () => {
    const [fileImg, setFileImg] = useState<File | null>(null);
    console.log(fileImg)
    const {getRootProps, getInputProps, isDragActive} = useDropzone({accept: {
        'image/*': []
      },
      onDrop: acceptedFiles => {
        setFileImg(acceptedFiles[0])
      }
    })
    const sendFileToIPFS = async (e: FormEvent) => {
        e.preventDefault();
        if (fileImg) {
            const formData = new FormData();

            formData.append('file', fileImg);

            const metadata = JSON.stringify({
                name: `${fileImg.name}`,
            });
            formData.append('pinataMetadata', metadata);

            const options = JSON.stringify({
                cidVersion: 0,
            })
            formData.append('pinataOptions', options);
            console.log("Uploading file to IPFS...")
            try {
                const resFile = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
                    maxBodyLength: Infinity,
                    headers: {
                        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`
                    },
                })
                
                Router.push({
                    pathname: '/form3',
                    query: { cid: resFile.data.IpfsHash }
                })
            } catch (error) {
                console.log('Error: ', error)
            }
        }
    }

    return (
        <div className={styles.form2}>
            <Nav/>

            <div className={styles.step_bar}>
                <Link href='/form1'><img src={arrow.src} alt=""/></Link>
                <div className={styles.bars}>
                    <div></div>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                </div>
            </div>

            <form className={styles.form_cont} onSubmit={sendFileToIPFS}>

                <div className={styles.img_cont} {...getRootProps()}>
                    {fileImg && <img src={URL.createObjectURL(fileImg)} style={{width: "100%", height: "100%"}}/>}
                    <input {...getInputProps()}/>
                    {!fileImg ? <img src={pic_drag.src} alt="" /> : null}
                    {!fileImg ?<div className={styles.upl_cont}>
                        <span className={styles.upl_text}>Upload a file</span>
                        <span className={styles.drag}> or drag and drop</span>
                    </div> : null}
                    {!fileImg ? <div className={styles.limit_cont}>PNG, JPG, GIF up to 10MB</div> : null}
                </div>

                <div className={styles.text_cont}>
                    <div className={styles.time}>Now its time to Create your Ad</div>
                    <div className={styles.points_cont}>
                        <div className={styles.point_cont}>
                            <img src={bullet.src} alt="" />
                            <div className={styles.point}>Advertisers can use our platform to create highly targeted campaigns that reach users based on their interests and demographics. </div>
                        </div>
                        <div className={styles.point_cont}>
                            <img src={bullet.src} alt="" />
                            <div className={styles.point}>Our platform offers a user-friendly interface that is easy to navigate and understand.</div>
                        </div>
                    </div>
                </div>

                <button className={styles.proc_button} type='submit'>Proceed to Ad</button>

            </form>

        </div>
    );
}
 
export default Form2;