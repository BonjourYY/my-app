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

export const signIn = async () => {
  await auth.api.signInEmail({
    body: { email: "fqymtu@gmail.com", password: "fqy1028511" },
    headers: await headers(),
  });
};

export const createUser = async () => {
  await auth.api.createUser({
    body: {
      name: "范庆云",
      email: "1685360590@qq.com",
      password: "fqy1028511",
      role: "user",
    },
    headers: await headers(),
  });
};

export const listUsers = async () => {
  const result = await auth.api.listUsers({
    query: {
      limit: 1,
      offset: 1,
    },
    headers: await headers(),
  });
  console.log(result);
};

export const getUser = async () => {
  try {
    await auth.api.getUser({
      // 用一个不存在的 id 来模拟 404 失败；换成真实 id 即成功
      query: { id: "00000000-0000-0000-0000-000000000000" },
      headers: await headers(),
    });
  } catch (error) {
    if (isAPIError(error)) {
      console.log(error);
    }
  }
};

export const setRole = async (role: "admin" | "admin"[], userId: string) => {
  await auth.api.setRole({
    body: { role, userId },
    headers: await headers(),
  });
};

export const setUserPassword = async (newPassword: string, userId: string) => {
  await auth.api.setUserPassword({
    body: { newPassword, userId },
    headers: await headers(),
  });
};

export const updateUser = async (name: string, userId: string) => {
  await auth.api.adminUpdateUser({
    body: {
      userId,
      data: { name },
    },
    headers: await headers(),
  });
};

export const banUser = async (userId: string) => {
  await auth.api.banUser({
    body: {
      userId,
      banReason: "看你不爽",
      banExpiresIn: 60,
    },
    headers: await headers(),
  });
};

export const unbanUser = async (userId: string) => {
  await auth.api.unbanUser({
    body: { userId },
    headers: await headers(),
  });
};

export const listUserSessions = async (userId: string) => {
  const result = await auth.api.listUserSessions({
    body: { userId },
    headers: await headers(),
  });
  console.log(result);
};

export const revokeUserSession = async (sessionToken: string) => {
  await auth.api.revokeUserSession({
    body: { sessionToken },
    headers: await headers(),
  });
};

export const revokeUserSessions = async (userId: string) => {
  await auth.api.revokeUserSessions({
    body: { userId },
    headers: await headers(),
  });
};

export const impersonateUser = async (userId: string) => {
  await auth.api.impersonateUser({
    body: { userId },
    headers: await headers(),
  });
};

export const stopImpersonation = async () => {
  await auth.api.stopImpersonating({
    headers: await headers(),
  });
};

export const removeUser = async (userId: string) => {
  await auth.api.removeUser({
    body: { userId },
    headers: await headers(),
  });
};

export const userHasPermission = async (
  userId: string,
  permissions: Record<string, string[]>,
) => {
  const result = await auth.api.userHasPermission({
    body: { userId, permissions },
    // headers: await headers(),
  });
  // result.success 就是权限判断结果：true = 有权限，false = 没权限
  // return result.success;
  console.log(result);
};
