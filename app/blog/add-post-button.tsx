"use client";

import { addPost } from "../actions";

export default function AddPostButton() {
  return <button onClick={() => addPost()}>Add Post</button>;
}
