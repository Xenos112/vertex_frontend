import cn from "@/utils/cn";
import { ComponentProps } from "react";

type InputProps = ComponentProps<"input">;

export default function Input({ ...props }: InputProps) {
  return (
    <input
      {...props}
      className={cn(
        "bg-input-background w-full rounded-xl px-4 py-2 outline-none",
        props.className,
      )}
    />
  );
}

// todo: add more styles and focus styles
