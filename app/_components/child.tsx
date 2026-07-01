"use client";

import { use } from "react";

export default function Child({ postPromise }: { postPromise: Promise<any> }) {
  const post = use(postPromise);
  console.log(post);
  return <div>{post.title}</div>;
}
