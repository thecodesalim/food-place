import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";

// POST /api/user
// Required fields in body: name, email
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, meal, id } = req.body;
  await prisma.item.create({
    data: {
      meal: meal,
      restaurant: name,
      date: new Date(),
      userId: id,
    },
  });
  res.json({
    id: 1,
    meal: "Shawarma",
    restaurant: "4U Snacks",
    date: new Date(),
  });
}
