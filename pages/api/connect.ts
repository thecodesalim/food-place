import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

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
}
