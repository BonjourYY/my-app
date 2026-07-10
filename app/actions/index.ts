"use server";

import { revalidatePath } from "next/cache";
import { refresh } from "next/cache";
import { cookies } from "next/headers";
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
