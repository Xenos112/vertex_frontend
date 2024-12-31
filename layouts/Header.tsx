"use client";
import Button from "@/components/ui/Button";
import Typography from "@/components/ui/Typography";
import { useState } from "react";
import {  Menu, UserRound, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import ThemeToggle from "@/components/shared/ThemeToggle";
import Link from 'next/link'

export default function Header() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  const navigate = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  return (
    <div className="z-[1000] flex h-[80px] items-center justify-between">
      <Typography as="h1" variant="logo" className="cursor-pointer">
        Logo
      </Typography>
      <div
        className={`z-50 flex items-center gap-[30px] duration-300 max-md:fixed max-md:inset-0 max-md:h-dvh max-md:w-dvw max-md:flex-col max-md:items-center max-md:justify-center max-md:bg-white/40 max-md:backdrop-blur ${open ? "max-md:translate-x-0" : "max-md:translate-x-full"}`}
      >
        <ul className="flex gap-[27px] *:font-semibold max-md:flex-col max-md:gap-[50px] max-md:text-center max-md:*:text-[32px]">
          <Typography variant="body" as="li" className="cursor-pointer">
            <span onClick={() => navigate("/")}>Home</span>
          </Typography>
          <Typography variant="body" as="li" className="cursor-pointer">
            <span onClick={() => navigate("/about")}>About</span>
          </Typography>
          <Typography variant="body" as="li" className="cursor-pointer">
            <span onClick={() => navigate("/premium")}>Pricing</span>
          </Typography>
          <Typography variant="body" as="li" className="cursor-pointer">
            <span onClick={() => navigate("/faq")}>F&Q</span>
          </Typography>
          <span className="max-md:hidden">
            <ThemeToggle />
          </span>
          <button onClick={() => setOpen(false)} className="absolute right-4 top-4 md:hidden">
            <X size={30} />
          </button>
        </ul>
        <Button className="max-md:hidden">
          <Link href='/login'>Login</Link>
        </Button>
      </div>
      <div className="flex gap-4 md:hidden">
        <button onClick={() => setOpen(true)}>
          <Menu />
        </button>
        {user ? (
          <Avatar>
            <AvatarImage src={user?.image_url} />
            <AvatarFallback>{user?.user_name}</AvatarFallback>
          </Avatar>
        ) : (
          <Button variant="outline" size="icon-sm">
            <Link href="/login">
              <UserRound />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
