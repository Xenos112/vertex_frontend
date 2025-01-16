import { type Post } from "@/types";
import vertex from "../../../api";

type Response = Post | { error: string };

export default async function getPost(id: string): Promise<Response> {
  const data = await vertex.get<{ data: Post }>(`http://localhost:4000/post/${id}`, {
    credentials: "include",
    throwHttpErrors: false,
  });
  if (data.status === 404) {
    return { error: "Post not found" };
  }

  if (data.status === 400) {
    return { error: "please enter a valid id for the post" };
  }

  if (data.status === 500 || data.status !== 200) {
    return { error: "something went wrong" };
  }

  const post = (await data.json()).data;
  return post;
}
