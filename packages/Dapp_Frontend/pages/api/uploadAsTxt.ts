import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs';
import path from 'path';
import pinataSDK from '@pinata/sdk';

const pinata = new pinataSDK({pinataJWTKey: process.env.NEXT_PUBLIC_PINATA_JWT})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        // Process a POST request
        let newJsonBody = {
            name: req.body.heading,
            description: req.body.body,
            image: `https://gateway.pinata.cloud/ipfs/${req.body.cid}`,
            attributes: [
                {
                    trait_type: 'CTA_Name',
                    value: req.body.cta
                },
                {
                    trait_type: 'Redirect_Link',
                    value: req.body.website
                },
                {
                    trait_type: 'Ad',
                    value: req.body.heading
                },
                {
                    trait_type: 'Domain',
                    value: req.body.website
                }
            ]
        }

        // Writing the new JSON to a txt file
        fs.writeFileSync(path.join(process.cwd(), '/temp.txt'), JSON.stringify(newJsonBody))
        console.log('JSON written to file successfully')

        // Creating form data for uploading to Pinata
        const readStream = fs.createReadStream(path.join(process.cwd(), '/temp.txt'))

        console.log("Uploading file to IPFS...")
        const options = {
            pinataMetadata: {
                name: `${newJsonBody.name}.txt`,
            },
            pinataOptions: {
                cidVersion: 0 as const,
            }
        }
        await pinata.pinFromFS(path.join(process.cwd())+'/temp.txt', options)
            .then((result) => {
                console.log("File uploaded successfully to IPFS")
                res.status(200).json({ hash: result.IpfsHash, message: 'Success', error: false })
            })
            .catch((err) => {
                console.log('Error: ', err)
                res.status(400).json({ message: 'Data not correct', error: true })
            })
            
            // const metadata = JSON.stringify({
            //     name: `${newJsonBody.name}.txt`,
            // });
            // formData.append('pinataMetadata', metadata);
            // const options = JSON.stringify({
            //     cidVersion: 0,
            // })
            // formData.append('pinataOptions', options);
    
    
            // try {
            //     const resFile = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
            //         maxBodyLength: Infinity,
            //         headers: {
            //             'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            //             Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`
            //         },
            //     })
            //     if (resFile.status === 200) {
            //         console.log("File uploaded successfully to IPFS")
            //         res.status(200).json({ hash: resFile.data.IpfsHash, message: 'Success', error: false })
            //     }
            // } catch (error) {
            //     console.log('Error: ', error)
            //     res.status(400).json({ message: 'Data not correct', error: true })
            // }
        // })

    } else {
        // Handle any other HTTP method
        res.status(405).json({ message: 'Method not allowed', error: true })
    }
}