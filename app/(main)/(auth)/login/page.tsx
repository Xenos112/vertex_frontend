"use client";
import { login } from "@/api/auth/login";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { type FormEvent, useState } from "react";
import { useUserStore } from "@/store/user";
import { redirect } from "next/navigation";
import useToaster from "@/hooks/useToaster";
import useAction from "@/hooks/useAction";

export default function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const fetchUser = useUserStore((state) => state.fetchUser);
  const toaster = useToaster();
  const [run, loading] = useAction(submit);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !password) {
      toaster.error("please enter email and password");
      return;
    }

    const data = await login(email, password);
    console.log(data);
    if ("error" in data) {
      toaster.error(data.error as string);
      return;
    }

    if ("token" in data) {
      localStorage.setItem("auth_token", data.token);
      await fetchUser();
      toaster.success("Login Successfull");
      redirect("/");
    }

    if ((data as string[]).at(0)) {
      (data as string[]).forEach((error) => {
        toaster.error(error as string);
      });
      return;
    }
  }

  return (
    <div className="flex h-[calc(100dvh-80px)] items-center justify-center">
      <div className="flex w-full max-w-[800px] flex-col items-center justify-center gap-[90px]">
        <h1 className="max-w-[500px] text-center text-[28px] font-semibold max-md:mx-[50px] max-md:text-[20px]">
        Login Into Your Social media Account and Make new followers 
        </h1>

        <div className="flex w-full items-center justify-between max-md:flex-col max-md:gap-[30px]">
          <form onSubmit={run} className="flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[10px]">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="input input-bordered input-primary w-full max-w-xs bg-transparent"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                className="input input-bordered input-primary w-full max-w-xs bg-transparent"
              />
            </div>
            <button className="btn btn-primary">
              {loading ? <Loader2 size={20} className="animate-spin" /> : "Login"}
            </button>
          </form>

          <span className="text-[36px] font-bold max-md:hidden">/</span>

          <div className="flex flex-col gap-[20px] font-semibold max-md:flex-row">
            <button className="btn btn-outline btn-primary w-full max-md:p-4">
              <img src="/google.svg" width={24} />
              <span className="max-md:hidden">Sign In Using Google</span>
            </button>
            <Link href="http://localhost:4000/auth/discord">
              <button className="btn btn-outline btn-primary w-full max-md:p-4">
                <img src="/discord.svg" width={24} />
                <span className="max-md:hidden">Sign In Using Discord</span>
              </button>
            </Link>
            <Link href="http://localhost:4000/auth/github">
              <button className="btn btn-outline btn-primary w-full max-md:p-4">
                <img src="/github.svg" width={24} />
                <span className="max-md:hidden">Sign In Using Github</span>
              </button>
            </Link>
          </div>
        </div>
        <div className="flex gap-[32px] max-md:flex-col max-md:items-center max-md:gap-4">
          <Link href="/register" className="link link-primary">
            Forget Your Password?
          </Link>
          <span className="max-md:hidden">/</span>
          <Link href="/register" className="link link-primary">
            Do Not Have Account Yet?
          </Link>
        </div>
      </div>
    </div>
  );
}

// TODO: add links to other auth pages
// TODO: handle errors
// TODO: add google oauth
