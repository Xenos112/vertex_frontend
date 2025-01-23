"use client";
import { useUserStore } from "@/store/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import CreatePostModal from "@/features/post/components/CreatePostModal";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { User } from "lucide-react";
import { useEffect, useRef } from "react";
import useToaster from "@/hooks/useToaster";
import {
  Post,
  Author,
  Comments,
  Content,
  Like,
  Save,
  Share,
  PostNotFound,
} from "@/components/shared/Post";
import { usePostsStore } from "@/store/posts";

export default function page() {
  const user = useUserStore((state) => state.user);
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const postFetcher = usePostsStore((state) => state.fetchFeed);
  const posts = usePostsStore((state) => state.posts);
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const toaster = useToaster();

  // TODO: make use of the search params
  const isFeed = searchParams.get("t") === "communities";
  const modalButtonRef = useRef<HTMLButtonElement>(null);

  const onInputFocus = () => {
    modalButtonRef.current?.click();
  };

  const openModal = () => {
    if (!user?.id) {
      toaster.error("You must be logged in to create a new post");
      redirect("/login");
    }
    modalRef.current?.showModal();
  };

  useEffect(() => {
    postFetcher();
  }, []);

  return (
    <main className="w-full border-x border-grayish">
      <div className="unerline flex w-full items-center justify-center gap-4 p-4 py-[21px]">
        <Link href={`${pathName}?t=feed`} className={!isFeed ? "underline" : ""}>
          For You
        </Link>
        <Link href={`${pathName}?t=communities`} className={isFeed ? "underline" : ""}>
          Communities
        </Link>
      </div>
      <div onClick={openModal} className="w-full">
        <div className="flex items-center justify-between border-y border-grayish px-6 py-[15px]">
          <div className="flex items-center gap-4">
            {user ? (
              <Avatar className="size-[50px]">
                <AvatarImage src={user?.image_url!} alt={user?.user_name} />
                <AvatarFallback>{user?.user_name}</AvatarFallback>
              </Avatar>
            ) : (
              <User size={30} />
            )}
            <input
              onFocus={onInputFocus}
              placeholder="What's on your mind?"
              className="input w-full bg-transparent"
            />
          </div>
          <button className="btn btn-primary" onClick={openModal}>
            Post
          </button>
        </div>
      </div>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">✕</button>
          </form>
          <CreatePostModal />
        </div>
      </dialog>
      <div>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Post key={post.id} post={post}>
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
          ))
        ) : (
          <PostNotFound />
        )}
      </div>
    </main>
  );
}
