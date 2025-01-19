import { Post } from "@/types"
import { create } from "zustand"

export type PostsStore = {
  posts: Record<string, Post>
  addPost: (post: Post) => void
}
// TODO: make use of the store
// HACK: add more things to the store
export const usePostsStore = create<PostsStore>()((set, _get) => ({
  posts: {},
  addPost: (post: Post) => {
    set((state) => ({
      posts: { ...state.posts, [post.id]: post },
    }))
  },
}))
