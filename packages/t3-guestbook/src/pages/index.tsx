import { type NextPage } from "next";

import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";

const GuestbookEntries = () => {
  const { data: guestbookEntries, isLoading } = api.guestbook.getAll.useQuery();

  if (isLoading) return <div>Fetching messages...</div>;

  return (
    <div className="flex flex-col gap-4">
      {guestbookEntries?.map((entry, index) => {
        return (
          <div key={index}>
            <p>{entry.message}</p>
            <span>- {entry.name}</span>
          </div>
        );
      })}
    </div>
  );
};

const Home: NextPage = () => {
  const { data: session } = useSession();

  const handleClick = () => {
    if (!session) {
      return void signIn();
    }
    return void signOut();
  };

  return (
    <main className="flex flex-col items-center p-4">
      <div className="mb-6 flex items-center">
        <h1 className="mr-8 text-3xl font-bold">Guestbook</h1>
        <button className="rounded-md bg-gray-800 p-2" onClick={handleClick}>
          {session ? "Log out" : "Log in"}
        </button>
      </div>
      <div className="mb-8">
        {session && <p className="font-bold">Hi {session.user.name}</p>}
      </div>
      <GuestbookEntries />
    </main>
  );
};

export default Home;
