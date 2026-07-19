import { RPCHandler } from "@orpc/server/fetch";
import { router } from "./project";
import { CORSHandlerPlugin } from "@orpc/server/plugins";

export const handler = new RPCHandler(router, {
  fetchInterceptors: [
    async ({ next }) => {
      console.log("1 adapter 进");
      const r = await next();
      console.log("1 adapter 出");
      return r;
    },
  ],
  routingInterceptors: [
    async ({ next }) => {
      console.log("2 routing 进");
      const r = await next();
      console.log("2 routing 出");
      return r;
    },
  ],
  interceptors: [
    async ({ next }) => {
      console.log("3 interceptor 进");
      const r = await next();
      console.log("3 interceptor 出");
      return r;
    },
  ],
  clientInterceptors: [
    async ({ next }) => {
      console.log("4 client interceptor 进");
      const r = await next();
      console.log("4 client interceptor 出");
      return r;
    },
  ],
  plugins: [
    new CORSHandlerPlugin({
      allowHeaders: ["Content-Disposition", "Standard-Server"],
      exposeHeaders: ["Content-Disposition", "Standard-Server"],
    }),
  ],
});
