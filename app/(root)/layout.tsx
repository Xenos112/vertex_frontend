import LeftNavBar from "@/layouts/LeftNavBar";
import { type ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto flex min-h-screen max-sm:flex-col">
      <LeftNavBar />
      {children}
    </div>
  );
}
