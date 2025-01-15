"use client";
import Button from "@/components/ui/Button";
import cn from "@/utils/cn";
import { Hash, Worm, Bell, Bookmark, User, Users, Search, Sun, Moon, X } from "lucide-react";
import Link, { type LinkProps } from "next/link";
import { ReactNode, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { useUserStore } from "@/store/user";
import Typography from "@/components/ui/Typography";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { useTheme } from "next-themes";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ToggleButton,
} from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import uploadMedias from "@/api/posts/upload-medias";
import createPost from "@/api/posts/create-post";
import useToaster from "@/hooks/useToaster";
import { redirect } from "next/navigation";
import useAfterMount from "@/hooks/useAfterMount";

function NavItem({
  href,
  children,
  ...props
}: LinkProps & { children: ReactNode; className?: string }) {
  return (
    <Link
      {...props}
      href={href}
      className={cn(
        "m-1 flex gap-2 text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-primary",
        props.className,
      )}
    >
      {children}
    </Link>
  );
}

export default function LeftNavBar() {
  const user = useUserStore((state) => state.user);
  const [isMobileSideBarOpen, setIsMobileSideBarOpen] = useState(false);
  const ref = useOnClickOutside(() => setIsMobileSideBarOpen(false));
  const { theme, setTheme } = useTheme();
  const fileInput = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileList | null>(null);
  const [urls, setUrls] = useState<string[] | null>();
  const [postContent, setPostContent] = useState<string>("");
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
    <>
      <div
        ref={ref as any}
        className={`sticky top-0 flex h-screen flex-col items-stretch justify-between overflow-hidden px-10 py-5 max-xl:w-fit max-lg:px-4 max-sm:fixed max-sm:w-[70vw] max-sm:bg-gray-200/80 max-sm:backdrop-blur max-sm:duration-500 max-sm:dark:bg-black/80 ${isMobileSideBarOpen ? "max-sm:translate-x-0" : "max-sm:-translate-x-full"}`}
      >
        <div className="flex flex-col gap-8">
          <div>
            <Link href={"/"} className="max-sm:hidden">
              <Worm className="size-[40]" />
            </Link>
            <Link href={"/"} className="max-sm:block sm:hidden">
              {user ? (
                <Avatar>
                  <AvatarImage className="size-[50px]" src={user.image_url} />
                  <AvatarFallback>{user?.user_name}</AvatarFallback>
                </Avatar>
              ) : (
                <User className="size-[40]" />
              )}
            </Link>
          </div>
          <div className="flex flex-col gap-5">
            <NavItem href="/">
              <Hash className="size-[24] max-lg:size-[30] max-sm:size-[24]" />
              <span className="max-lg:hidden max-sm:block">Feed</span>
            </NavItem>
            <NavItem href="/notifications">
              <Bell className="size-[24] max-lg:size-[30] max-sm:size-[24]" />
              <span className="max-lg:hidden max-sm:block">Notifications</span>
            </NavItem>
            <NavItem href="/communities">
              <Users className="size-[24] max-lg:size-[30] max-sm:size-[24]" />
              <span className="max-lg:hidden max-sm:block">Communities</span>
            </NavItem>
            <NavItem href="/bookmarks">
              <Bookmark className="size-[24] max-lg:size-[30] max-sm:size-[24]" />
              <span className="max-lg:hidden max-sm:block">Saved Posts</span>
            </NavItem>
            <NavItem href="/search">
              <Search className="size-[24] max-lg:size-[30] max-sm:size-[24]" />
              <span className="max-lg:hidden max-sm:block">Search</span>
            </NavItem>
            <NavItem href="/premium">
              <Worm className="size-[24] max-lg:size-[30] max-sm:size-[24]" />
              <span className="max-lg:hidden max-sm:block">Premium</span>
            </NavItem>
            {user && (
              <NavItem href={`/user/${user.tag}`}>
                <User className="size-[24] max-lg:size-[30] max-sm:size-[24]" />
                <span className="max-lg:hidden max-sm:block">Profile</span>
              </NavItem>
            )}
            <Modal>
              <ToggleButton>
                <Button className="w-full rounded-full">Post</Button>
              </ToggleButton>
              <ModalContent className="bg-blue-300">
                <ModalBody className="min-w-[600px]">
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
                </ModalBody>
              </ModalContent>
            </Modal>
          </div>
        </div>

        <div className="self-start max-sm:hidden">
          {user?.id ? (
            <div className="flex items-center justify-center gap-3">
              <Avatar>
                <AvatarImage src={user.image_url} />
                <AvatarFallback>{user?.user_name}</AvatarFallback>
              </Avatar>

              <div className="flex cursor-pointer flex-col gap-1 max-lg:hidden max-sm:flex">
                <span className="text-[15px] font-bold leading-none">{user.user_name}</span>
                <Typography
                  as="span"
                  variant="tag"
                  className="leading-none"
                  style={{ color: "var(--grayish)" }}
                >
                  {user.tag}
                </Typography>
              </div>
            </div>
          ) : (
            <Link href="/login">
              <User className="size-[32]" />
            </Link>
          )}
        </div>
        <div className="sm:hidden">
          {theme === "dark" ? (
            <Sun className="size-[32]" onClick={() => setTheme(() => "light")} />
          ) : (
            <Moon className="size-[32]" onClick={() => setTheme(() => "dark")} />
          )}
        </div>
      </div>

      <div className="flex w-full items-center justify-between border-b border-b-grayish p-4 sm:hidden">
        <Button
          variant={"outline"}
          className="size-[40px] border-none p-0 text-white"
          onClick={() => setIsMobileSideBarOpen(!isMobileSideBarOpen)}
        >
          {user ? (
            <Avatar>
              <AvatarImage src={user.image_url} />
              <AvatarFallback>{user?.user_name}</AvatarFallback>
            </Avatar>
          ) : (
            <Link href="/login">
              <User className="size-[32]" />
            </Link>
          )}
        </Button>
        <Worm className="size-[32]" />
      </div>
    </>
  );
}

// TODO: add a link to go to the profile page
// FIX: theme is not switching
