import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { RouterClient } from "@orpc/server";
import { router } from "./project";

export const link = new RPCLink({
  url: "/api/rpc",
  headers: {
    "X-Trace-ID": "123123123123",
  },
  interceptors: [
    async ({ next, input }) => {
      console.log("1 进：input 还是 JS 对象", input);
      const output = await next();
      console.log("1️⃣ 出:output 已还原成 JS 对象", output);
      return output;
    },
  ],
  transportInterceptors: [
    async (options) => {
      console.log("2️⃣ 进:input 已编码成协议请求", options.request);
      const response = await options.next(options);
      console.log("2️⃣ 出:拿到协议响应,还没解码");
      return response;
    },
  ],
  fetchInterceptors: [
    async (options) => {
      console.log("3️⃣ 进:最终 url + RequestInit", options.init);
      const response = await options.next(options);
      console.log("3️⃣ 出:原始 Response 对象,status =", response.status);
      return response;
    },
  ],
});

export const client: RouterClient<typeof router> = createORPCClient(link);
