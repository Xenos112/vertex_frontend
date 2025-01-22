import getPost from "@/features/post/api/get-post";
import vertex from "..";

// the posts are just ids, why will be fetched later
export type FeedResponse = {
  data: string[]
};

export default async function fetchFeed() {
  const res = await vertex.get<FeedResponse>("http://localhost:4000/feed");

  if (res.status !== 200) {
    return { message: "something went wrong" }
  }

  const posts = (await res.json()).data

  const postsData = posts.map(async (id) => {
    const data = await getPost(id)
    return data
  })

  return Promise.all(postsData)
}
