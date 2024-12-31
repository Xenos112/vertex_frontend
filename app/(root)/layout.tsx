import LeftNavBar from "@/layouts/LeftNavBar";
import RightNacBar from "@/layouts/RightNavBar";
import { type ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto grid min-h-screen grid-cols-[25%_1fr_30%] max-lg:grid-cols-[auto_1fr] max-sm:grid-cols-1 max-sm:grid-rows-[auto_1fr] max-sm:flex-col">
      <LeftNavBar />
      {children}
      <RightNacBar />
    </div>
  );
}
