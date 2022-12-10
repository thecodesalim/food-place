import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";

// POST /api/user
// Required fields in body: name, email
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name } = req.body;
  const items = await prisma.user.findMany({
    where: {
      name: "Salim Abubakar",
    },
    include: {
      Items: true,
    },
  });

  //console.log(items[0].Items);
  res.json(items[0].Items);
}
