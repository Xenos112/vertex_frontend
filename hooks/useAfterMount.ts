import { useEffect, useRef } from "react";

export default function useAfterMount(callback: () => void, deps: any[] = []) {
  const hasMounted = useRef(false);

  useEffect(() => {
    if (hasMounted.current) {
      callback();
    } else {
      hasMounted.current = true;
    }
  }, deps);
}
