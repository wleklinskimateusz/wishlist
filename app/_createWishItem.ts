import { z } from "zod";
import { getPrismaClient } from "./_prisma";
import { auth } from "@clerk/nextjs";
import { getQueryClient } from "./_useQuery";

export async function createWishItem(formData: FormData) {
  "use server";

  const queryClient = getQueryClient();

  const data = {
    title: formData.get("title"),
    url: formData.get("url"),
    price: formData.get("price"),
  };
  const { title, url, price } = z
    .object({
      title: z.string(),
      url: z.string(),
      price: z.string().transform((val) => Number(val)),
    })
    .parse(data);

  const prisma = getPrismaClient();
  const { userId } = auth();

  if (!userId) {
    throw new Error("No user ID");
  }
  const result = await prisma.wish.create({
    data: {
      title,
      url,
      price,
      userId,
    },
  });

  await queryClient.refetchQueries({
    queryKey: ["wishItems"],
    type: "active",
  });
}
