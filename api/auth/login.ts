import vertex from "..";

export type APIResponse = {
  user: {
    id: string;
    created_at: Date | null;
    user_name: string;
    email: string | null;
    github_id: string | null;
    discord_id: string | null;
    password: string | null;
    bio: string | null;
    image_id: string | null;
    banner_id: string | null;
  };
  token: string;
};

export async function login(email: string, password: string) {
  try {
    const res = await vertex.post<APIResponse>("http://localhost:4000/auth/login", {
      json: { email, password },
      credentials: "include",
      retry: 4,
    });
    if (!res.ok) {
      throw new Error("Failed to login");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    // todo: handle errors
    console.log(error);
  }
}
