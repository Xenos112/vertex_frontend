"use client";
import Button from "@/components/ui/Button";
import cn from "@/utils/cn";
import { Hash, Worm, Bell, Bookmark, User, Users, Search, Sun, Moon } from "lucide-react";
import Link, { type LinkProps } from "next/link";
import { ReactNode, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { useUserStore } from "@/store/user";
import Typography from "@/components/ui/Typography";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { useTheme } from "next-themes";
import { Modal, ModalBody, ModalContent, ModalHeader, ToggleButton } from "@/components/ui/Modal";

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
                {/* Modal */}
                <ModalHeader>
                  <h3 className="text-lg font-bold">Navigate</h3>
                </ModalHeader>
                <ModalBody>
                  <div className="grid grid-cols-2 gap-6">
                    <Link href="/explore">
                      <Button variant={"link"} className="w-full">
                        Explore
                      </Button>
                    </Link>
                    <Link href="/settings">
                      <Button variant={"link"} className="w-full">
                        Settings
                      </Button>
                    </Link>
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
