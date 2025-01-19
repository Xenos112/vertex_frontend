import vertex from "@/api";
import { create } from "zustand";

export type User = {
  id: string;
  user_name: string;
  email: string;
  tag: string;
  bio: string;
  image_url: string | null;
};

type UserStore = {
  user: User | null;
  error: string;
  loading: boolean;
  setUser: (user: any) => void;
  fetchUser: () => Promise<void>;
  followUser: (userId: string) => Promise<void>;
};

export const useUserStore = create<UserStore>()((set) => ({
  user: null,
  error: "",
  loading: true,
  setUser: (user: any) => set({ user }),
  fetchUser: async () => {
    try {
      const res = await vertex.get<{ data: User }>("http://localhost:4000/me", {
        retry: 1,
        timeout: 1000,
        credentials: "include",
      });
      if (!res.ok) {
        set({ loading: false, error: "Failed to fetch user" });
        throw new Error("Failed to fetch user");
      }

      const user = (await res.json()).data;
      set({ user, loading: false });
    } catch (error) {
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },
  followUser: async (_userId: string) => {
    // TODO: implement
    try { } catch (error) { }
  }
}));
