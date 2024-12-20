import { useState } from "react";

/**
 * Creates a hook that wraps a function in a loading state.
 * @param fn The function to wrap.
 * @returns A tuple containing the wrapped function and a boolean indicating whether the function is currently loading.
 * @example
 * const [login, loading] = useAction(api.auth.login);
 * const handleLogin = async (email: string, password: string) => {
 *   if (loading) return;
 *   await login(email, password);
 * };
 */
export default function useAction<T extends (...args: any[]) => Promise<any>>(fn: T) {
  const [loading, setLoading] = useState(false);

  const execute = async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    setLoading(true);
    try {
      const result = await fn(...args);
      return result;
    } finally {
      setLoading(false);
    }
  };

  return [execute, loading] as const;
}
