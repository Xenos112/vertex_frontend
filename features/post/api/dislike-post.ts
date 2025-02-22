import vertex from "../../../api";

type Response = {
  unliked: boolean;
};

export default async function dislikePost(id: string) {
  const data = await vertex.delete<Response>(`http://localhost:4000/post/${id}/likes`, {
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

  const isLiked = (await data.json()).unliked;
  return isLiked;
}
