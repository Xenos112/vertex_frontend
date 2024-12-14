import cn from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const buttonVariants = cva(
  ["rounded-[7px] duration-300 flex items-center justify-center gap-[10px] leading-0"],
  {
    variants: {
      variant: {
        primary: [
          "bg-primary font-semibold text-base text-white hover:bg-primary-hover focus:bg-primary-hover focus-visible:bg-primary-hover disabled:bg-primary-disabled disabled:text-forground-disabled hover:ring-2 ring-offset-2 ring-primary-hover disabled:ring-primary-disabled",
        ],
        outline: [
          "border border-primary text-primary hover:border-primary-hover focus:border-primary-hover focus-visible:border-primary-hover disabled:border-primary-disabled disabled:text-primary-disabled",
        ],
        link: [
          "rounded-none border-b border-b-primary text-primary hover:text-primary-hover focus:text-primary-hover focus-visible:text-primary-hover disabled:border-b-primary-disabled disabled:text-primary-disabled",
        ],
      },
      size: {
        md: ["px-5 py-[10px] rounded-full"],
        sm: ["px-[10px] py-2 rounded-full"],
        "icon-md": ["p-3 rounded-full"],
        "icon-sm": ["p-2 rounded-full"],
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type Variants = VariantProps<typeof buttonVariants>;
export type ButtonProps = React.ComponentProps<"button"> & Variants;

export default function Button({ variant, size, className, ...props }: ButtonProps) {
  return <button {...props} className={cn(buttonVariants({ variant, size, className }))} />;
}
