"use client";
import { useParams } from "next/navigation";
import { Author, Share, Comments, Content, Like, Post, Save, PostNotFound } from "@/components/shared/Post";
import usePostFetcher from "@/features/post/hooks/usePostFetcher";


export default function PostPage() {
  const { id } = useParams() as { id: string };
  const [post, error] = usePostFetcher(id);

  return (
    <div className="w-full border-x border-grayish">
      {post && (
        <Post post={post}>
          <Author />
          <Content>
            <div className="flex items-center justify-between">
              <div className="flex gap-[25px]">
                <Like />
                <Save />
                <Comments />
              </div>
              <Share />
            </div>
          </Content>
        </Post>
      )}
      {error && <PostNotFound />}
    </div>
  );
}
