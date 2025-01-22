'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { type Post } from "@/types";
import { useState, createContext, use } from "react";
import { BookMarked, Heart, MessageCircle, Share2 } from "lucide-react";
import likePost from "@/features/post/api/like-post";
import dislikePost from "@/features/post/api/dislike-post";
import savePost from "@/features/post/api/save-post";
import unsavePost from "@/features/post/api/unsave-post";
import useToaster from "@/hooks/useToaster";
import copyPostUrl from "@/utils/generate-post-url";
import { useUserStore } from "@/store/user";
import { redirect } from "next/navigation";
import Typography from "../ui/Typography";
import Link from "next/link";

const PostContext = createContext<Post | null>(null);

export function Post({ post, children }: { post: Post; children: React.ReactNode }) {
  return (
    <PostContext value={post!}>
      <div className="p-[25px] border-b border-grayish">{children}</div>
    </PostContext>
  );
}

export function Content({ children }: { children: React.ReactNode }) {
  const post = use(PostContext) as Post;
  const picturesLength = post.pictures?.length;
  const className =
    picturesLength === 1
      ? "grid-cols-1"
      : picturesLength === 2
        ? "grid-cols-2"
        : picturesLength === 3
          ? "grid-cols-3"
          : picturesLength === 4
            ? "grid-cols-2 grid-rows-2"
            : `grid`;

  // TODO: make the pictures have links
  return (
    <div className="mt-3 flex flex-col gap-4 pl-[48px]">
      <div className="flex flex-col gap-3">
        <p>{post?.content}</p>
        {post?.pictures?.length > 0 && (
          <div className={`${className} grid h-[400px] gap-2 overflow-hidden rounded-md`}>
            {post.pictures?.length > 0 &&
              post?.pictures?.map((picture) =>
                picture.type === "image" ? (
                  <img className="h-full w-full object-cover" src={picture.url} />
                ) : (
                  <video className="h-full w-full object-cover" src={picture.url} />
                ),
              )}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

export function Save() {
  const post = use(PostContext) as Post;
  const [isSaved, setIsSaved] = useState(post.isSaved);
  const toaster = useToaster();
  const [savesCount, setSavesCount] = useState(post.saves_count);
  const user = useUserStore((state) => state.user);

  const handleLikeButton = async () => {
    if (!user) {
      toaster.error("You must be logged in to like a post");
      redirect("/register");
    }

    if (!isSaved) {
      setIsSaved(true);
      setSavesCount(savesCount! + 1);
      const res = await savePost(post.id);
      if (typeof res === "object" && "error" in res) {
        setIsSaved(false);
        setSavesCount(savesCount! - 1);
        toaster.error(res.error);
      } else {
        toaster.success("Post saved");
      }
    } else if (isSaved) {
      setIsSaved(false);
      setSavesCount(savesCount! - 1);
      const res = await unsavePost(post.id);
      if (typeof res === "object" && "error" in res) {
        setIsSaved(true);
        setSavesCount(savesCount! + 1);
        toaster.error(res.error);
      } else {
        toaster.success("Post unsaved");
      }
    }
  };
  return (
    <button onClick={handleLikeButton} className={`flex gap-2 ${isSaved ? "text-yellow-500" : ""}`}>
      <BookMarked size="20" />
      {savesCount}
    </button>
  );
}

export function Like() {
  const post = use(PostContext) as Post;
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const toaster = useToaster();
  const [likesCount, setLikesCount] = useState(post.likes_count);
  const user = useUserStore((state) => state.user);

  const handleLikeButton = async () => {
    if (!user) {
      toaster.error("You must be logged in to like a post");
      redirect("/register");
    }
    if (!isLiked) {
      setIsLiked(true);
      setLikesCount(likesCount! + 1);
      const res = await likePost(post.id);
      if (typeof res === "object" && "error" in res) {
        setIsLiked(false);
        setLikesCount(likesCount! - 1);
        toaster.error(res.error);
      } else {
        toaster.success("Post Liked");
      }
    } else if (isLiked) {
      setIsLiked(false);
      setLikesCount(likesCount! - 1);
      const res = await dislikePost(post.id);
      if (typeof res === "object" && "error" in res) {
        setIsLiked(true);
        setLikesCount(likesCount! + 1);
        toaster.error(res.error);
      } else {
        toaster.success("Post Unliked");
      }
    }
  };
  return (
    <button onClick={handleLikeButton} className={`flex gap-2 ${isLiked ? "text-red-500" : ""}`}>
      <Heart />
      {likesCount}
    </button>
  );
}

export function Comments() {
  const post = use(PostContext) as Post;

  return (
    <div className="flex gap-2">
      <MessageCircle />
      {post.comments_count}
    </div>
  );
}

export function Author() {
  const post = use(PostContext) as Post;

  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src={post.author?.avatar?.url} />
        <AvatarFallback>{post.author?.user_name}</AvatarFallback>
      </Avatar>
      <div>
        <p>{post.author?.user_name}</p>
        <div className="flex gap-2">
          <Typography className="text-grayish" variant="tag" as="span">
          </Typography>
          <span className="text-grayish">●</span>
          <span className="text-grayish">{new Date(post.created_at as Date).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

export function Share() {
  const post = use(PostContext) as Post;
  const toaster = useToaster();

  async function copyUrl() {
    const res = await copyPostUrl(post.id);
    if (res) {
      toaster.success("Copied to clipboard");
      return;
    }

    toaster.error("Failed to copy to clipboard");
  }

  return (
    <button onClick={copyUrl}>
      <Share2 />
    </button>
  );
}

export function PostNotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6 h-full">
      <h1 className="text-3xl font-bold">404</h1>
      <p className='font-medium'>Post not found or No Longer Available</p>
      <Link className='underline' href="/">Go to home</Link>
    </div>
  );

}
// TODO: fetch the tag from the backend and display it
