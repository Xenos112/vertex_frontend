"use client";
import { login } from "@/api/auth/login";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { type FormEvent, useState } from "react";
import { useUserStore } from "@/store/user";
import { redirect } from "next/navigation";
import useToaster from "@/hooks/useToaster";

export default function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const fetchUser = useUserStore((state) => state.fetchUser);
  const toaster = useToaster();

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
      setLoading(false);
      toaster.error({ text: "please enter email and password" });
      return;
    }

    const data = await login(email, password);
    if ("error" in data) {
      toaster.error({ text: data.error as string });
      setLoading(false);
      return;
    }
    if ((data as string[]).at(0)) {
      (data as string[]).forEach((error) => {
        toaster.error({ text: error });
      });
      setLoading(false);
      return;
    }

    if ("token" in data) {
      localStorage.setItem("auth_token", data.token);
      await fetchUser();
      toaster.success({ text: "Login Successfull" });
      redirect("/");
    }

    setLoading(false);
  };

  return (
    <div className="flex h-[calc(100dvh-80px)] items-center justify-center">
      <div className="flex w-full max-w-[800px] flex-col items-center justify-center gap-[90px]">
        <h1 className="max-w-[500px] text-center text-[28px] font-semibold max-md:mx-[50px] max-md:text-[20px]">
          Login Into Your Account and Make Progress and new Friends
        </h1>

        <div className="flex w-full items-center justify-between max-md:flex-col max-md:gap-[30px]">
          <form onSubmit={submit} className="flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[10px]">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="rounded-lg border border-primary"
              />
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="rounded-lg border border-primary"
              />
            </div>
            <Button>{loading ? <Loader2 size={20} className="animate-spin" /> : "Login"}</Button>
          </form>

          <span className="text-[36px] font-bold max-md:hidden">/</span>

          <div className="flex flex-col gap-[20px] font-semibold max-md:flex-row">
            <Button variant="outline" className="w-full max-md:p-4">
              <img src="/google.svg" width={24} />
              <span className="max-md:hidden">Sign In Using Google</span>
            </Button>
            <Link href="http://localhost:4000/auth/discord">
              <Button variant="outline" className="w-full max-md:p-4">
                <img src="/discord.svg" width={24} />
                <span className="max-md:hidden">Sign In Using Discord</span>
              </Button>
            </Link>
            <Link href="http://localhost:4000/auth/github">
              <Button variant="outline" className="w-full max-md:p-4">
                <img src="/github.svg" width={24} />
                <span className="max-md:hidden">Sign In Using Github</span>
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex gap-[32px] max-md:flex-col max-md:items-center max-md:gap-4">
          <Link href="#" className="text-primary underline">
            Forget Your Password?
          </Link>
          <span className="max-md:hidden">/</span>
          <Link href="/register" className="text-primary underline">
            Do Not Have Account Yet?
          </Link>
        </div>
      </div>
    </div>
  );
}

// todo: add links to other auth pages
// todo: handle errors
// todo: add google oauth
