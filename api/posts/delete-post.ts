import vertex from "..";

type Response = { message: string } | { deleted: boolean };

export default async function deletePost(postId: string) {
  const res = await vertex.delete<Response>(`http://localhost:4000/post/${postId}`, {
    credentials: "include",
    throwHttpErrors: false,
  });

  if (res.status !== 200) {
    return "Error Deleting Post";
  }

  const result = await res.json();

  return result;
}
