import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import prisma from "../../utils/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  if (req.method === "POST") {
    const { title, description } = req.body;
    await prisma.list.create({
      data: {
        title,
        description,
        userId: session.user.id,
      },
    });
    res.json({ message: "List created" });
  }

  if (req.method === "GET") {
    const lists = await prisma.list.findMany({
      where: {
        userId: session.user.id,
      },
    });
    res.json(lists);
  }
}
