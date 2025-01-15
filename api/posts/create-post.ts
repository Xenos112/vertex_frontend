// TODO: implement (finish)

import vertex from "..";


export default async function createPost({ content, medias }: { content: string, medias: string[] }) {
  // TEST: see if the its working (if not fix it)
  const res = await vertex.post("http://localhost:4000/posts", {
    body: JSON.stringify({
      content,
      medias
    })
  })

  if (res.status !== 200) {
    throw new Error("Failed to create post");
  }

  const data = await res.json()
  return data;
}
