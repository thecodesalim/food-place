import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../utils/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
      res.status(401).json({ message: "You must be logged in." });
      return;
    }
    const { slug } = req.query as { slug: string };
    const id = slug[0];
    console.log(id, session.user.id);
    const follows = await prisma.follows.findMany({
      where: {
        followerId: session.user.id,
        //followingId: id,
      },
      include: {
        following: true,
      },
    });
    res.json(follows);
  }
}
