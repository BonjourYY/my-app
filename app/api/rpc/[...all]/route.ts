import { handler } from "@/rpc/orpc-handler";
import { NextResponse } from "next/server";

const handleRequest = async (req: Request) => {
  const { response } = await handler.handle(req, {
    prefix: "/api/rpc",
    context: {
      a: 1,
    },
  });
  return (
    response ?? NextResponse.json({ error: "Not found123" }, { status: 404 })
  );
};

export { handleRequest as GET, handleRequest as POST };
