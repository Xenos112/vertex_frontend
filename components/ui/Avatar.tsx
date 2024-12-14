"use client";
import vertex from "@/api";
import cn from "@/utils/cn";
import React, {
  useEffect,
  createContext,
  use,
  useState,
  SetStateAction,
  Dispatch,
  ComponentProps,
  ReactNode,
} from "react";

type AvatarProps = ComponentProps<"div">;

type ImageLoadingContextType = [boolean, Dispatch<SetStateAction<boolean>>];

const ImageLoadingContext = createContext<ImageLoadingContextType>([false, () => {}]);
function Avatar({ ...props }: AvatarProps) {
  const [loading, setLoading] = useState(true);

  return (
    <ImageLoadingContext value={[loading, setLoading]}>
      <div {...props} className={cn("rounded-full", props.className)} />
    </ImageLoadingContext>
  );
}

function AvatarFallback({ children, className }: { children: ReactNode; className?: string }) {
  const [loading] = use(ImageLoadingContext);

  return loading ? (
    <h1
      className={cn(
        "flex size-[40px] items-center justify-center rounded-full bg-primary text-xl font-semibold",
        className,
      )}
    >
      {children?.toString().slice(0, 2).toUpperCase()}
    </h1>
  ) : null;
}

type AvatarImageProps = Omit<ComponentProps<"img">, "src"> & { src: string | null };

function AvatarImage({ ...props }: AvatarImageProps) {
  const [loading, setLoading] = use(ImageLoadingContext);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        setLoading(true);

        const res = await vertex.get<Blob>(props.src as string);
        if (!res.ok) {
          // todo: handle error case
        }

        const imageBlob = await res.blob();

        const imageUrl = URL.createObjectURL(imageBlob);
        setImageSrc(imageUrl);
      } catch (error) {
        // todo: handle Errors
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [props.src]);

  return !loading ? (
    <img
      className={cn("size-[40px] rounded-full", props.className)}
      src={imageSrc}
      alt={props.alt}
    />
  ) : null;
}

export { Avatar, AvatarFallback, AvatarImage };
