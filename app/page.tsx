import { UserButton, auth, currentUser, useAuth } from "@clerk/nextjs";

import { getPrismaClient } from "./_prisma";
import { z } from "zod";
import { WishItems } from "./_components/WishItems";
import { getQueryClient } from "./_useQuery";

export default async function Home() {
  const { userId } = auth();
  const prisma = getPrismaClient();

  async function create(formData: FormData) {
    "use server";

    const data = {
      title: formData.get("title"),
      url: formData.get("url"),
      price: formData.get("price"),
    };

    const schema = z.object({
      title: z.string(),
      url: z.string(),
      price: z.string().transform((x) => Number(x)),
    });

    const result = schema.safeParse(data);

    if (!result.success) {
      throw new Error(`Invalid form data: ${result.error}`);
    }
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const { title, url, price } = result.data;

    await prisma.wish.create({
      data: {
        title,
        url,
        price,
        userId,
      },
    });
  }
  return (
    <main className="">
      <UserButton afterSignOutUrl="/" />
      <div>Hello</div>
      {userId && (
        <form action={create}>
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
