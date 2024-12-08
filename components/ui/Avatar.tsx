import cn from "@/utils/cn";
import React from "react";
export type AvatarProps = React.ComponentProps<"img"> & {
  name: string;
};

export default function Avatar({ className, src, ...props }: AvatarProps) {
  const displayedName = props.name.slice(0, 2).toUpperCase();

  if (!src) {
    return (
      <span
        className={cn(
          "size-[40px] rounded-full flex items-center justify-center bg-blue-950 text-white",
          className
        )}
      >
        {displayedName}
      </span>
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
