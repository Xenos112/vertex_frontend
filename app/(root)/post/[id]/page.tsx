"use client";
import getPost from "@/api/posts/get-post";
import { Post as TPost } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Author,Share, Comments, Content, Like, Post, Save } from "@/components/shared/Post";

const usePostFetcher = (id: string): [TPost | null, string | null] => {
  const [postData, setPostData] = useState<TPost | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const post = await getPost(id);
      if ("error" in post) {
        setError(post.error);
        return;
      }

      setPostData(post);
    };

    fetchPost();
  }, []);

  return [postData, error];
};

export default function PostPage() {
  const { id } = useParams() as { id: string };
  const [post, error] = usePostFetcher(id);

  return (
    <div className="w-full">
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
    </div>
  );
}
