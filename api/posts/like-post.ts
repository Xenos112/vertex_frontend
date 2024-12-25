import vertex from "..";

type Response = { liked: boolean }

export default async function likePost(id: string) {
  const data = await vertex<Response>(`http://localhost:4000/post/${id}/likes`, {
    credentials: 'include',
    throwHttpErrors: false,
    method: "put"
  });

  if (data.status === 404) {
    return { error: "Post not found" }
  }
  if (data.status === 401) {
    return { error: 'you must be logged it to like a post' }
  }

  if (data.status === 400) {
    return { error: "please enter a valid id for the post" }
  }

  if (data.status === 500 || data.status !== 200) {
    return { error: "something went wrong" }
  }

  const isLiked = (await data.json()).liked
  return isLiked
}
