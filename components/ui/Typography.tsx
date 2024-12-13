import cn from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import React, { ComponentProps, JSX } from "react";

const typographyVariants = cva(["text-black dark:text-white leading-0"], {
  variants: {
    variant: {
      body: ["leading-0 text-base font-regular"],
      title: ["text-[4rem] font-bold max-md:text-[3rem] max-sm:[2rem]"],
      "sub-title": ["text-grayish text-[1.5rem] max-md:text-[4.5rem] max-sm:text-base"],
      url: ["underline font-regular text-base"],
      tag: [
        "underline font-light text-primary dark:text-primary duration-300 hover:text-primary-hover",
      ],
      emphasis: ["font-medium text-base"],
      logo: ["text-[1.25rem] font-medium"],
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

export type TypographyProps<T extends keyof JSX.IntrinsicElements> = {
  as: T;
  className?: string;
} & ComponentProps<T> &
  VariantProps<typeof typographyVariants>;

export default function Typography<T extends keyof JSX.IntrinsicElements>({
  as: Component = "p" as unknown as T,
  variant,
  className,
  ...props
}: TypographyProps<T>) {
  return (
    // @ts-ignore
    <Component className={cn(typographyVariants({ variant, className }))} {...props} />
  );
}

// todo: open for some work (nothing yet)
