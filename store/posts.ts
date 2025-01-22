import vertex from "@/api"
import { type FeedResponse } from "@/api/posts/fetch-feed"
import getPost from "@/features/post/api/get-post"
import { type Post } from "@/types"
import { create } from "zustand"

export type PostsStore = {
  posts: Post[]
  loading: boolean
  error: string
  appendPost: (post: Post) => void
  fetchFeed: () => Promise<Post[] | { message: string }>
}

// HACK: add more things to the store
export const usePostsStore = create<PostsStore>()((set, _get) => ({
  posts: [],
  loading: false,
  error: "",
  appendPost: (post: Post) => {
    set((state) => ({
      ...state,
      posts: [post, ...state.posts],
      loading: false,
    }))
  },
  fetchFeed: async () => {
    const res = await vertex.get<FeedResponse>("http://localhost:4000/feed");

    if (res.status !== 200) {
      return { message: "something went wrong" }
    }

    const posts = (await res.json()).data

    const postsData = posts.map(async (id: string) => {
      const data = await getPost(id)
      return data
    })

    const postsArray = Promise.all(postsData) as Promise<Post[]>

    postsArray.then((posts) => {
      set((state) => ({
        ...state,
        posts: [...state.posts, ...posts],
      }))
    })
    return postsArray
  }
}))
