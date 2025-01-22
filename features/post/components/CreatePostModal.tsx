import createPost from "@/features/post/api/create-post";
import uploadMedias from "@/api/posts/upload-medias";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { ModalCloseButton, ModalHeader } from "@/components/ui/Modal";
import useAfterMount from "@/hooks/useAfterMount";
import useToaster from "@/hooks/useToaster";
import { useUserStore } from "@/store/user";
import { User, X } from "lucide-react";
import { redirect } from "next/navigation";
import { type RefObject, useRef, useState } from "react";
import { usePostsStore } from "@/store/posts";

const IMAGE_REGEX = /\.(png|jpg|jpeg|gif|svg)$/i;

export default function CreatePostModal() {
  const [files, setFiles] = useState<FileList | null>(null);
  const user = useUserStore((state) => state.user);
  const [postContent, setPostContent] = useState<string>("");
  const fileInput = useRef<HTMLInputElement>(null);
  const [urls, setUrls] = useState<string[] | null>();
  const toast = useToaster();
  const appendPost = usePostsStore((state) => state.appendPost);
  const closeModalRef = useRef<HTMLButtonElement>(null);

  const createNewPost = async () => {
    if (!user) {
      toast.error("You must be logged in to create a post");
      redirect("/login");
    }

    const res = await createPost({ content: postContent, medias: urls! });
    if (res.data.id) {
      appendPost(res.data.id)
      closeModalRef.current?.click()
      toast.success("Post created successfully");
    } else {
      toast.error("Failed to create a new post");
    }
  };

  const uploadFiles = async () => {
    if (files?.length === 0) return;

    const formData = new FormData();

    if (files) {
      for (const file of files) {
        formData.append("file", file);
      }
    }

    try {
      const res = await uploadMedias(formData);
      if (res.urls.length > 0) {
        setUrls(res.urls);
        toast.success("files uploaded successfully");
      }
    } catch (error) {
      toast.error("Failed to upload Media to the server");
    }
  };

  useAfterMount(() => {
    uploadFiles();
  }, [files?.[0]?.name]);

  return (
    <div className="flex gap-4 flex-col rounded-lg h-full w-full">
      <ModalHeader className='self-start'>Create Post</ModalHeader>
      <input
        type="file"
        name="file"
        multiple
        accept="image/*, video/*"
        ref={fileInput}
        className="hidden"
        onChange={(e) => setFiles(e.target.files)}
      />
      <ModalCloseButton ref={closeModalRef as RefObject<HTMLButtonElement>}>
        <X size={20} className="mb-[24px] ml-auto cursor-pointer text-[#919191]" />
      </ModalCloseButton>
      <div className="flex items-center justify-between gap-3">
        {user ? (
          <Avatar>
            <AvatarImage className="size-[50px]" src={user.image_url} />
            <AvatarFallback>{user?.user_name}</AvatarFallback>
          </Avatar>
        ) : (
          <User className="size-[40] text-black dark:text-white" />
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
      <div className="mt-auto flex justify-between gap-1 text-white">
        {urls ? urls
          ?.filter((url) => IMAGE_REGEX.test(url))
          .slice(0, 3)
          .map((url) => (
            <div key={url}>
              <img src={url} width={200} className="contain" />
            </div>
          )) :
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              className="w-full h-full bg-red-400 opacity-0 cursor-pointer"
            />
            <span className="absolute left-0 top-0 text-grayish text-center w-full">
              Drag and drop your files to upload
            </span>
            <img
              id="image-preview"
              style={{ display: 'none', marginTop: '10px', maxWidth: '100%' }}
              alt="Preview"
            />
          </div>
        }
        <div className="ml-auto mt-auto">
          <Button type="button" onClick={createNewPost}>
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}
