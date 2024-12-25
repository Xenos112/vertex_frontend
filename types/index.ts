export type Post = {
  id: string;
  created_at: Date | null;
  content: string | null;
  author_id: string;
  community_id: string | null;
  likes_count: number | null;
  saves_count: number | null;
  comments_count: number | null;
  pictures: { type: string, url: string }[]
  isLiked: boolean
  isSaved: boolean
  author: {
    id: string,
    user_name: string,
    profile_id: string | null;
    profile_picture_url: string | null
  }
}
