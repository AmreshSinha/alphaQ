import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client'
import axios from "axios";

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const hashId = req.query.hashId as string
        const ads = await prisma.hash.findUnique({
            where: {
                ethAddress: hashId.toLowerCase(),
            },
            include: {
                counts: true,
            }
        })
        if (ads!.counts.length === 0) {
            res.status(404).json({ message: 'No ads found', error: true })
        }
        let returnAds: unknown[] = []
        for (const ad of ads!.counts) {
        // ads!.counts.forEach(ad => {
            const pinataRes = await axios.get(`https://gateway.pinata.cloud/ipfs/${ad.contentId}`)
            const adName = pinataRes.data.name
            const adImage = pinataRes.data.image
            returnAds.push({ad, adName, adImage})
        };
        // console.log(returnAds)
        res.status(200).json({ads: returnAds, error: false})
    } else {
        res.status(405).json({ message: 'Method not allowed', error: true })
    }
}