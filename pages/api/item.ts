import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

// POST /api/user
// Required fields in body: name, email
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  if (req.method === "GET") {
    const items = await prisma.item.findMany({
      where: {
        userId: session.user.id,
      },
    });
    res.json(items);
  }

  if (req.method === "POST") {
    const { name, meal, user } = req.body;
    const item = await prisma.item.create({
      data: {
        meal: meal,
        restaurant: name,
        date: new Date(),
        userId: user.id,
      },
    });
    res.json(item);
  }
}
