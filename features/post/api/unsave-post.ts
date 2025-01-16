import vertex from "../../../api";

type Response = { unsaved: boolean };

export default async function unsavePost(id: string) {
  const data = await vertex.delete<Response>(`http://localhost:4000/post/${id}/saves`, {
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

  const isLiked = (await data.json()).unsaved;
  return isLiked;
}
