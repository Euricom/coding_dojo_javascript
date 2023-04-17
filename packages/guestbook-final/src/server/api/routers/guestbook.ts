import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const guestbookRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.guestbook.findMany({
      include: {
        likes: true,
      },
    });
  }),

  remove: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.guestbook.delete({
        where: {
          id: input.id,
        },
      });
    }),

  createEntry: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        message: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.guestbook.create({
        data: {
          name: input.name,
          message: input.message,
        },
      });
    }),

  likeMessage: protectedProcedure
    .input(
      z.object({
        guestbookId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      return ctx.prisma.like.create({
        data: {
          guestbookId: input.guestbookId,
          userId: userId,
        },
      });
    }),

  unlikeMessage: protectedProcedure
    .input(
      z.object({
        guestbookId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      return await ctx.prisma.like.delete({
        where: {
          guestbookId_userId: {
            guestbookId: input.guestbookId,
            userId,
          },
        },
      });
    }),
});
