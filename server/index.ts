import { prisma } from "@/app/_prisma";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  getWishItems: publicProcedure.query(async () => {
    return prisma.wish.findMany();
  }),
});

export type AppRouter = typeof appRouter;
