import vertex from ".";

type Image = {
  id: string;
  url: string;
  type: "image" | "video";
  target_type: "user:image" | "user:banner" | "post";
  target_id: string;
  created_at: Date | null;
} | null

export type UserSuggestion = {
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
  image: Image
}

export default async function whoToFollow() {
  try {
    const res = await vertex.get<{ data: UserSuggestion[] }>(
      "http://localhost:4000/who-to-follow",
      { credentials: "include" },
    );
    if (!res.ok) {
      throw new Error("Failed to fetch who to follow");
    }

    const usersToFollow = (await res.json()).data;
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return usersToFollow;
  } catch (error) {
    // TODO: handle Errors
  }
}
