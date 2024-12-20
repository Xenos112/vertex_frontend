import vertex from "..";

export type APIResponse =
  | {
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
    }
  | string[];

export async function login(email: string, password: string) {
  const res = await vertex.post<APIResponse>("http://localhost:4000/auth/login", {
    json: { email, password },
    credentials: "include",
    throwHttpErrors: false,
  });
  const data = await res.json();
  return data;
}
