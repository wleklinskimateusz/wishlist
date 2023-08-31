"use client";
import { useQuery } from "@tanstack/react-query";

import { getPrismaClient } from "../_prisma";
import { useAuth } from "@clerk/nextjs";

export function WishItems() {
  const { userId } = useAuth();
  const prisma = getPrismaClient();

  const { data: wishItems } = useQuery(["wishItems"], () =>
    prisma.wish.findMany({
      where: {
        userId: userId ?? undefined,
      },
    }),
  );
  return (
    <>
      <h3>Wish Items</h3>
      <ul>
        {wishItems?.map((item, idx) => <div key={idx}>{item.title}</div>)}
      </ul>
    </>
  );
}
