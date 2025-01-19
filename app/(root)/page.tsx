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
import { usePathname } from "next/navigation";
import Link from "next/link";
import { User } from "lucide-react";

export default function page() {
  const user = useUserStore((state) => state.user);
  const pathName = usePathname()


  return (
    <main className="w-full border-x border-grayish">
      {/* TODO: make the selected tab active and more emphesised */}
      <div className="w-full flex gap-4 p-4 py-[21px] items-center justify-center unerline">
        <Link href={`${pathName}?t=feed`}>
          For You
        </Link>
        <Link href={`${pathName}?t=communities`}>Communities</Link>
      </div>
      <Modal>
        <ToggleButton className="w-full">
          <div className="flex items-center justify-between border-y border-grayish px-6 py-[15px]">
            <div className="flex gap-4 items-center">
              {user ? (
                <Avatar className="w-10 h-10">
                  <AvatarImage src={user?.image_url!} alt={user?.user_name} />
                  <AvatarFallback>{user?.user_name}</AvatarFallback>
                </Avatar>
              ) : <User size={30} />
              }
              <Input placeholder="What's on your mind?" className="w-full bg-transparent" />
            </div>
            <Button variant="outline" size={"sm"}>
              Post
            </Button>
          </div>
        </ToggleButton>
        <ModalContent className='min-w-[550px]'>
          <CreatePostModal />
        </ModalContent>
      </Modal>
    </main>
  );
}
