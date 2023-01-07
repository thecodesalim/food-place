import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/prisma";

// POST /api/user
// Required fields in body: name, email
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query as { slug: string };

  if (req.method === "GET") {
    const users = await prisma.user.findMany({
      where: {
        id: slug[0],
      },
    });
    const items = await prisma.item.findMany({
      where: {
        userId: slug[0],
      },
    });
    res.json({ users, items });
  }
}
