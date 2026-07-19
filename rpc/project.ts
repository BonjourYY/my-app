import { os } from "@orpc/server";
import z from "zod";

export const listProjects = os
  .$context<{ a: number }>()
  .input(z.object({ id: z.number(), name: z.string() }))
  .output(z.object({ a: z.number() }))
  .use(async ({ context, next }) => {
    console.log(context);
    return next();
  })
  .handler(async (ctx) => {
    console.log(ctx);
    return { a: 1 };
  });

export const router = os
  .$context<{ a: number }>()
  .use(async ({ context, next }) => {
    console.log(context);
    return next();
  })
  .router({
    project: {
      list: listProjects,
    },
  });
