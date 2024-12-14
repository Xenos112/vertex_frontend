import vertex from ".";

export type UserSuggestion = {
  ID: string;
  UserName: string;
  ProfileImage: string;
};

export default async function whoToFollow() {
  try {
    const res = await vertex.get<{ data: UserSuggestion[] }>(
      "http://localhost:8080/authenticated/who-to-follow",
      { credentials: "include" },
    );
    if (!res.ok) {
      throw new Error("Failed to fetch who to follow");
    }

    const usersToFollow = (await res.json()).data;
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return usersToFollow;
  } catch (error) {
    // todo: handle Errors
  }
}
