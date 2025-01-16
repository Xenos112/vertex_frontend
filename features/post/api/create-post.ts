import { Post } from "@/types";
import vertex from "@/api";
type DataResponse = {
  data: Post;
};

export default async function createPost({
  content,
  medias,
}: {
  content: string;
  medias?: string[];
}) {
  const res = await vertex.post<DataResponse>("http://localhost:4000/post", {
    credentials: "include",
    body: JSON.stringify({
      content,
      medias,
    }),
  });

  if (res.status !== 200) {
    throw new Error("Failed to create post");
  }

  const data = await res.json();
  return data;
}
