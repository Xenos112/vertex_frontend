import cn from "@/utils/cn";
import { ComponentProps } from "react";

type InputProps = ComponentProps<"input">;

export default function Input({ ...props }: InputProps) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-xl bg-input-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary",
        props.className,
      )}
    />
  );
}

