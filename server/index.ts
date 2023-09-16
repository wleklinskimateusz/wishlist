import { getPrismaClient } from "@/app/_prisma";
import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { auth } from "@clerk/nextjs";

export const appRouter = router({
  getWishItems: publicProcedure.query(async () => {
    const prisma = getPrismaClient();
    return prisma.wish.findMany();
  }),
  addWishItem: publicProcedure
    .input(
      z.object({
        title: z.string(),
        url: z.string(),
        price: z.string().transform((x) => Number(x)),
      }),
    )
    .mutation(async ({ input: { title, url, price } }) => {}),
});

export type AppRouter = typeof appRouter;
