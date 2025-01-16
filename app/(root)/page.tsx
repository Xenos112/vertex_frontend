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

export default function page() {
  const user = useUserStore((state) => state.user);

  return (
    <main className="w-full">
      <div></div>
      <Modal>
        <ToggleButton className="w-full">
          <div className="flex items-center justify-between border-y border-grayish px-6 py-[15px]">
            <div className="flex gap-4">
              <Avatar>
                <AvatarImage src={user?.image_url!} alt={user?.user_name} />
                <AvatarFallback>{user?.user_name}</AvatarFallback>
              </Avatar>
              <Input placeholder="What's on your mind?" className="w-full bg-transparent" />
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
    </main>
  );
}
