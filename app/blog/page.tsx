import { getPosts } from "../actions";
import AddPostButton from "./add-post-button";

export default async function Blog() {
  const posts = await getPosts();

  return (
    <div>
      {posts.map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}
      <AddPostButton />
    </div>
  );
}
