import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../utils/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
      res.status(401).json({ message: "You must be logged in." });
      return;
    }
    const { id } = req.body;
    await prisma.follows.create({
      data: {
        followerId: session.user.id,
        followingId: id,
      },
    });
    res.json({ message: "Follow created" });
  }

  if (req.method === "GET") {
    const { slug } = req.query as { slug: string };
    const id = slug[0];
    const follows = await prisma.follows.findMany({
      where: {
        followerId: id,
      },
      include: {
        following: true,
      },
    });
    res.json(follows);
  }
}
