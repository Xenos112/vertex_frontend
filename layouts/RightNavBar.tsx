"use client";

import whoToFollow, { type UserSuggestion } from "@/api/whoToFollow";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useUserStore } from "@/store/user";
import { Loader2, Search } from "lucide-react";
import Link from "next/link";
import Form from "next/form";
import { useEffect, useState } from "react";

const useUserSuggestions = () => {
  const [usersToFollow, setUsersToFollow] = useState<UserSuggestion[] | undefined>();
  const [loading, setLoading] = useState(true);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const fetchUsersToFollow = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      const users = await whoToFollow();
      setUsersToFollow(users);
      setLoading(false);
    };

    fetchUsersToFollow();
  }, []);

  return { usersToFollow, loading };
};

const SearchField = () => {
  const [search, setSearch] = useState("");

  return (
    <Form
      action={`/search?q=${search.trim()}`}
      className="z-0 flex w-full items-center gap-2 rounded-xl bg-input-background px-4"
    >
      <button type="submit">
        <Search className="size-[24px]" />
      </button>
      <Input
        className="w-fit bg-transparent"
        value={search}
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />
    </Form>
  );
};

function WhoToFollowSection() {
  const { loading, usersToFollow } = useUserSuggestions();

  return (
    <div className="rounded-xl bg-white/[8%] p-4">
      <h1 className="text-xl font-medium">Who To Follow</h1>
      {loading ? (
        <div className="flex h-[200px] w-full items-center justify-center">
          <Loader2 size={40} className="animate-spin" />
        </div>
      ) : usersToFollow ? (
        <div className="mt-2 space-y-5">
          {usersToFollow.map((user) => (
            <div key={user.id} className="flex items-center gap-2 justify-between">
              <Avatar>
                <AvatarImage src={user.image?.url as (string | null)} alt={user.user_name} />
                <AvatarFallback>{user.user_name}</AvatarFallback>
              </Avatar>
              <Button size='sm'>Follow</Button>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-2 text-xl font-medium text-grayish">No Users To Follow</p>
      )}
    </div>
  );
}

export default function RightNavBar() {
  return (
    <aside className="sticky top-0 z-[-0] flex h-screen flex-1 flex-col gap-4 px-8 py-5 max-lg:hidden max-lg:px-5">
      <SearchField />
      <div className="rounded-xl bg-white/[8%] p-4">
        <div>
          <h1 className="text-xl font-medium">Get The Full Experience</h1>
          <p className="mt-1 text-grayish">Enjoy the full power with he Premium subscription</p>
        </div>
        <Link href="/premium">
          <Button className="mt-4">Subscribe</Button>
        </Link>
      </div>

      <WhoToFollowSection />
    </aside>
  );
}
