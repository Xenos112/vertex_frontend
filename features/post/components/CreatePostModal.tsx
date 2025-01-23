import createPost from "@/features/post/api/create-post";
import uploadMedias from "@/api/posts/upload-medias";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { ModalHeader } from "@/components/ui/Modal";
import useAfterMount from "@/hooks/useAfterMount";
import useToaster from "@/hooks/useToaster";
import { useUserStore } from "@/store/user";
import { User } from "lucide-react";
import { redirect } from "next/navigation";
import { useRef, useState } from "react";
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
      appendPost(res.data.id);
      closeModalRef.current?.click();
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
    <div className="flex h-full w-full flex-col gap-4 rounded-lg">
      <ModalHeader className="self-start">Create Post</ModalHeader>
      <input
        type="file"
        name="file"
        multiple
        accept="image/*, video/*"
        ref={fileInput}
        className="hidden"
        onChange={(e) => setFiles(e.target.files)}
      />
      <div className="flex items-start justify-between gap-3">
        {user ? (
          <Avatar className="size-[50px]">
            <AvatarImage src={user.image_url} />
            <AvatarFallback>{user?.user_name}</AvatarFallback>
          </Avatar>
        ) : (
          <User className="size-[40] text-black dark:text-white" />
        )}
        <textarea
          placeholder="Share Your Thoughts..."
          name="content"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          className="textarea w-full"
        />
        <button
          className="btn btn-outline btn-primary btn-sm text-sm"
          onClick={() => fileInput.current?.click()}
        >
          Upload
        </button>
      </div>
      <div className="mt-auto flex justify-between gap-1 text-white">
        {urls ? (
          urls
            ?.filter((url) => IMAGE_REGEX.test(url))
            .slice(0, 3)
            .map((url) => (
              <div key={url}>
                <img src={url} width={200} className="contain" />
              </div>
            ))
        ) : (
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              className="h-full w-full cursor-pointer bg-red-400 opacity-0"
            />
            <span className="absolute left-0 top-0 w-full text-center text-grayish">
              Drag and drop your files to upload
            </span>
            <img
              id="image-preview"
              style={{ display: "none", marginTop: "10px", maxWidth: "100%" }}
              alt="Preview"
            />
          </div>
        )}
        <div className="ml-auto mt-auto">
          <button className="btn btn-primary px-6" type="button" onClick={createNewPost}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
