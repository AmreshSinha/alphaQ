import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const hashId = req.query.contentId as string
        console.log(req.query.contentId)
        const countUpdate = await prisma.count.update({
            where: {
              contentId: hashId
            },
            data: {
              count: 1
            }
        })
        console.log('Count updated: ', countUpdate)
        // console.log(returnAds)
        res.status(200).json({countUpdate: countUpdate, message: 'Success', error: false})
    } else {
        res.status(405).json({ message: 'Method not allowed', error: true })
    }
}