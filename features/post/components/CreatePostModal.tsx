import createPost from "@/features/post/api/create-post";
import uploadMedias from "@/api/posts/upload-medias";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { ModalCloseButton } from "@/components/ui/Modal";
import useAfterMount from "@/hooks/useAfterMount";
import useToaster from "@/hooks/useToaster";
import { useUserStore } from "@/store/user";
import { User, X } from "lucide-react";
import { redirect } from "next/navigation";
import { useRef, useState } from "react";

export default function CreatePostModal() {
  const [files, setFiles] = useState<FileList | null>(null);
  const user = useUserStore((state) => state.user);
  const [postContent, setPostContent] = useState<string>("");
  const fileInput = useRef<HTMLInputElement>(null);
  const [urls, setUrls] = useState<string[] | null>();
  const toast = useToaster();

  const createNewPost = async () => {
    if (!user) {
      toast.error("You must be logged in to create a post");
      redirect("/login");
    }
    toast.success("test");
    const res = await createPost({ content: postContent, medias: urls! });
    if (res.data.id) {
      toast.success("Post created successfully");
    }
  };

  const uploadFiles = async () => {
    const formData = new FormData();

    if (files) {
      for (const file of files) {
        formData.append("file", file);
      }
    }

    const res = await uploadMedias(formData);
    if (res.urls.length > 0) {
      setUrls(res.urls);
      toast.success("files uploaded successfully");
    }
  };

  useAfterMount(() => {
    uploadFiles();
  }, [files?.[0].name]);

  return (
    <div className="flex min-h-[300px] flex-col rounded-lg bg-black p-[24px]">
      <input
        type="file"
        name="file"
        multiple
        accept="image/*, video/*"
        ref={fileInput}
        className="hidden"
        onChange={(e) => setFiles(e.target.files)}
      />
      <ModalCloseButton className="ml-auto">
        <X size={24} color="white" className="mb-[24px] ml-auto cursor-pointer" />
      </ModalCloseButton>
      {/*  form  */}
      <div className="flex items-center justify-between gap-3">
        {user ? (
          <Avatar>
            <AvatarImage className="size-[50px]" src={user.image_url} />
            <AvatarFallback>{user?.user_name}</AvatarFallback>
          </Avatar>
        ) : (
          <User className="size-[40] text-white" />
        )}
        <Input
          placeholder="Share Your Thoughts..."
          type="text"
          name="content"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          className="mx-2 bg-transparent text-white"
        />
        <Button
          className="text-sm"
          variant={"outline"}
          size={"sm"}
          onClick={() => fileInput.current?.click()}
        >
          Upload
        </Button>
      </div>
      <Button className="ml-auto mt-auto" type="button" onClick={createNewPost}>
        Post
      </Button>
    </div>
  );
}
