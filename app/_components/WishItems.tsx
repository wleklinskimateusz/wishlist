import { useQuery } from "@tanstack/react-query";

import { getPrismaClient } from "../_prisma";
import { auth, useAuth } from "@clerk/nextjs";
import { use } from "react";
import { trpc } from "../_trpc/client";

const prisma = getPrismaClient();

export function WishItems() {
  const { userId } = auth();
  console.log("user", userId);

  const { data: wishItems } = useQuery(["wishItems"], () =>
    trpc.getWishItems.useQuery(),
  );
  return (
    <>
      <h3>Wish Items</h3>
      <ul>
        {wishItems?.data?.map((item, idx) => <div key={idx}>{item.title}</div>)}
      </ul>
    </>
  );
}
