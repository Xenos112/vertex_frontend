import cn from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import React, { ComponentProps, JSX } from "react";

const typographyVariants = cva(["dark:text-white leading-0"], {
  variants: {
    variant: {
      body: ["leading-none text-base"],
      title: ["text-[3.125rem] font-bold max-md:text-[3rem] max-sm:text-[2rem]"],
      "sub-title": ["text-grayish text-[1.5rem] max-md:text-[1.25rem] max-sm:text-base"],
      url: ["underline text-base"],
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
    <Component {...props} className={cn(typographyVariants({ variant, className }))} />
  );
}

// TODO: open for some work (nothing yet)
