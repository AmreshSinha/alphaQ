import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client'
import axios from "axios";

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const contentId = req.query.contentId as string
        const count = await prisma.count.findFirst({
            where: {
                contentId: contentId
            }
        })
        res.status(200).json({metrics: {
            views: count?.count,
        } , message: 'Success', error: false})
    } else {
        res.status(405).json({ message: 'Method not allowed', error: true })
    }
}