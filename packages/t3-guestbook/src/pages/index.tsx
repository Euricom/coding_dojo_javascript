import { type NextPage } from "next";

import { signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session } = useSession();

  const handleClick = () => {
    if (!session) {
      return void signIn();
    }
    return void signOut();
  };

  return (
    <main className="p-4">
      <div className="mb-6 flex items-center">
        <h1 className="mr-8 text-3xl font-bold">Guestbook</h1>
        <button className="rounded-md bg-gray-800 p-2" onClick={handleClick}>
          {session ? "Log out" : "Log in"}
        </button>
      </div>
      <div>
        {session && <p className="font-bold">Hi {session.user.name}</p>}
      </div>
    </main>
  );
};

export default Home;
