import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";

export default async function getItems() {
  const items = await prisma.user.findMany({
    where: {
      name: "Salim Abubakar",
    },
    include: {
      items: true,
    },
  });
  return items;
}
