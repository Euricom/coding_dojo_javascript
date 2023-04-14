import { createTRPCRouter, publicProcedure } from "../trpc";

export const guestbookRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.guestbook.findMany();
    } catch (error) {
      console.log("error", error);
    }
  }),
});
