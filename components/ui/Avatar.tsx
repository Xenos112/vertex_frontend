import cn from "@/utils/cn";
import Image, { type ImageProps } from "next/image";
import React from "react";
export type AvatarProps = React.ComponentProps<"img"> & {
  name: string;
};

export default function Avatar({ className, src, ...props }: AvatarProps) {
  const displayedName = props.name.slice(0, 2).toUpperCase();

  if (!src) {
    return (
      <span className={cn("size-[40px]", className)}>{displayedName}</span>
    );
  }
  return (
    <img
      {...props}
      width={"40"}
      height={"40"}
      src={src}
      alt={props.alt || "avatar"}
      className={cn("rounded-full", className)}
    />
  );
}

// fix: img => Image
// todo: open for extra work if needed
