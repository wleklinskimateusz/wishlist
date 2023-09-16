import { UserButton, auth, currentUser } from "@clerk/nextjs";

import { WishItems } from "./_components/WishItems";
import { use } from "react";
import { getPrismaClient } from "./_prisma";
import { z } from "zod";
import { getQueryClient } from "./_useQuery";
import { createWishItem } from "./_createWishItem";

export default function Home() {
  const queryClient = getQueryClient();
  const user = use(currentUser());

  return (
    <main className="">
      <UserButton afterSignOutUrl="/" />
      <div>Hello</div>
      {user && (
        <form action={createWishItem}>
          <input className="border" name="title" />
          <input className="border" name="url" />
          <input className="border" name="price" type="number" />
          <button type="submit">Create</button>
        </form>
      )}
      <WishItems />
    </main>
  );
}
