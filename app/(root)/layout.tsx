import LeftNavBar from "@/layouts/LeftNavBar";
import RightNacBar from "@/layouts/RightNavBar";
import { type ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto flex min-h-screen max-sm:flex-col">
      <div className='w-fit'>
        <LeftNavBar />
      </div>
      {children}
      <RightNacBar />
    </div>
  );
}
