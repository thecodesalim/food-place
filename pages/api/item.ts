import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";

// POST /api/user
// Required fields in body: name, email
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const items = await prisma.user.findMany({
    where: {
      name: "Salim Abubakar",
    },
    include: {
      items: true,
    },
  });

  //console.log(items[0].Items);
  res.json(items[0].items);
}