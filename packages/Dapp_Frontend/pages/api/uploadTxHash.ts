import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Process a POST request

    // Check if the Address is already registered
    const checkAddress = await prisma.hash.findUnique({
      where: {
        ethAddress: req.body.ethAddress
      }
    })

    // Create the address document if it doesn't exist
    if (!checkAddress) {
      const createHash = await prisma.hash.create({
        data: {
          ethAddress: req.body.ethAddress,
        }
      })
      console.log('Hash created')
    }

    // Create the hash document
    const createCount = await prisma.count.create({
      data: {
        contentId: req.body.contentId,
        count: 0,
        purchasedViews: req.body.purchasedViews,
        status: true,
        transactionHash: req.body.txHash,
        hashId: req.body.ethAddress,
      }
    })
    if (createCount) {
      console.log('Count created')
      res.status(200).json({ message: 'Success', error: false })
    } else {
      res.status(500).json({ message: 'Error', error: true })
    }
  } else {
    // Handle any other HTTP method
    res.status(405).json({ message: 'Method not allowed', error: true })
  }
}