"use server";

import { auth } from "@/lib/auth";
import { isAPIError } from "better-auth/api";
import { revalidatePath } from "next/cache";
import { refresh } from "next/cache";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

type Post = { id: number; title: string };

// In-memory store standing in for a database, just to demo mutation + refresh.
let posts: Post[] | null = null;

export const getPosts = async () => {
  if (!posts) {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=5",
    );
    posts = await res.json();
  }

  const cookieStore = await cookies();
  console.log(cookieStore);
  return posts;
};

export const addPost = async () => {
  const list = await getPosts();
  posts = [{ id: Date.now(), title: `New Post ${list.length + 1}` }, ...list];
  // refresh();
  revalidatePath("/blog");
  redirect("/a");
};

export type VerifyPasswordResult =
  | { ok: true }
  | { ok: false; message: string };

// 把 better-auth 的错误码映射成对用户友好的中文提示。
const friendlyMessage = (code: string | undefined): string => {
  switch (code) {
    case "INVALID_PASSWORD":
      return "密码不正确，请重新输入。";
    case "USER_NOT_FOUND":
    case "CREDENTIAL_ACCOUNT_NOT_FOUND":
      return "当前账号未设置密码，无法通过密码验证。";
    default:
      return "验证失败，请稍后重试。";
  }
};

export const verifyPassword = async (
  password: string,
): Promise<VerifyPasswordResult> => {
  try {
    await auth.api.verifyPassword({
      body: { password },
      headers: await headers(),
    });
    return { ok: true };
  } catch (error) {
    if (isAPIError(error)) {
      // 没有有效会话时中间件会抛 401，单独给一个提示。
      if (error.statusCode === 401) {
        return { ok: false, message: "登录已失效，请重新登录后再试。" };
      }
      return { ok: false, message: friendlyMessage(error.body?.code) };
    }
    // 非预期错误：不要把内部细节暴露给用户。
    console.error("verifyPassword unexpected error", error);
    return { ok: false, message: "服务异常，请稍后重试。" };
  }
};
