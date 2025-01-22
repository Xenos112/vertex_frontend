"use client";
import { useUserStore } from "@/store/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import {
  Modal,
  ModalContent,
  ToggleButton,
} from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import CreatePostModal from "@/features/post/components/CreatePostModal";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import fetchFeed from "@/api/posts/fetch-feed";
import { Post as PostType } from "@/types";
import useToaster from "@/hooks/useToaster";
import { Post, Author, Comments, Content, Like, Save, Share, PostNotFound } from "@/components/shared/Post";
import { usePostsStore } from "@/store/posts";

export default function page() {
  const user = useUserStore((state) => state.user);
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const postFetcher = usePostsStore((state) => state.fetchFeed)
  const posts = usePostsStore((state) => state.posts)

  // TODO: make use of the search params
  const isFeed = searchParams.get("t") === "communities";
  const modalButtonRef = useRef<HTMLButtonElement>(null);
  const toaster = useToaster()

  const onInputFocus = () => {
    modalButtonRef.current?.click();
  };

  useEffect(() => {
    postFetcher()
  }, []);

  return (
    <main className="w-full border-x border-grayish">
      <div className="w-full flex gap-4 p-4 py-[21px] items-center justify-center unerline">
        <Link href={`${pathName}?t=feed`} className={!isFeed ? "underline" : ""}>
          For You
        </Link>
        <Link href={`${pathName}?t=communities`} className={isFeed ? "underline" : ""}>
          Communities
        </Link>
      </div>
      <Modal>
        <ToggleButton ref={modalButtonRef} className="w-full">
          <div className="flex items-center justify-between border-y border-grayish px-6 py-[15px]">
            <div className="flex gap-4 items-center">
              {user ? (
                <Avatar className="w-10 h-10">
                  <AvatarImage src={user?.image_url!} alt={user?.user_name} />
                  <AvatarFallback>{user?.user_name}</AvatarFallback>
                </Avatar>
              ) : <User size={30} />
              }
              <Input onFocus={onInputFocus} placeholder="What's on your mind?" className='focus:outline-0 focus:ring-0 bg-transparent w-full' />
            </div>
            <Button variant="outline" size={"sm"}>
              Post
            </Button>
          </div>
        </ToggleButton>
        <ModalContent>
          <CreatePostModal />
        </ModalContent>
      </Modal>
      <div>
        {posts.length > 0 ? posts.map(post => (
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
        )) : <PostNotFound />}
      </div>
    </main>
  );
}
