"use client";
import { useEffect, useRef } from "react";

const useOnClickOutside = <T extends HTMLElement>(handler: () => void) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handler]);

  return ref;
};

export default useOnClickOutside;
