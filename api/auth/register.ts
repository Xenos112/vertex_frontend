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

export default async function register(userName: string, email: string, password: string) {
  const res = await vertex.post<APIResponse>("http://localhost:4000/auth/register", {
    json: { email, password, user_name: userName },
    credentials: "include",
    throwHttpErrors: false,
  });
  const data = await res.json();
  return data;
}
