import { Suspense } from "react";
import Child from "./child";

const getPost = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  return res.json();
};

export default function Parent() {
  const postPromise = getPost();

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Child postPromise={postPromise} />
      </Suspense>
    </div>
  );
}
