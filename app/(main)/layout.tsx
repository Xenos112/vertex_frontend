import Header from "@/layouts/Header";
import { type ReactNode } from "react";

export default function layout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="container max-w-[1300px] mx-auto px-4">
      <Header />
      <main>{children}</main>
    </div>
  )
}
