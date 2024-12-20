"use client";
import { useEffect, useRef } from "react";

/**
 * Hook to track clicks outside of the component
 * @param {() => void} handler - Handler to run when click outside is detected
 * @returns {React.MutableRefObject<T | null>} - Ref to attach to the component
 *
 * @example
 * const ref = useOnClickOutside(() => {
 *   console.log('Clicked outside');
 * });
 *
 * return (
 *   <div ref={ref}>
 *     <p>Click outside this container</p>
 *   </div>
 * );
 */
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
