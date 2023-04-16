import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";

const GuestbookEntries = () => {
  const { data: guestbookEntries, isLoading } = api.guestbook.getAll.useQuery();

  if (isLoading) return <div>Fetching messages...</div>;

  return (
    <div className="flex flex-col gap-4">
      {guestbookEntries?.map((entry, index) => {
        return (
          <div key={index} className="w-full rounded-md bg-neutral-700 p-2">
            <p className="mb-1">{entry.message}</p>
            <span className="text-sm font-light italic">- {entry.name}</span>
          </div>
        );
      })}
    </div>
  );
};

const Home = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <main className="flex flex-col items-center pt-4">Loading...</main>;
  }

  return (
    <main className="flex flex-col items-center">
      <h1 className="pt-4 text-3xl font-bold">Guestbook</h1>
      <div className="w-[20vw] pt-10">
        <div>
          {session ? (
            <>
              <button
                type="button"
                className="mx-auto block rounded-md bg-neutral-800 px-6 py-3 text-center hover:bg-neutral-700"
                onClick={() => {
                  signOut().catch(console.log);
                }}
              >
                Logout
              </button>
              <p className="mt-4 text-center font-bold">
                Hi {session.user?.name}
              </p>
            </>
          ) : (
            <button
              type="button"
              className="mx-auto block rounded-md bg-neutral-800 px-6 py-3 text-center hover:bg-neutral-700"
              onClick={() => {
                signIn("discord").catch(console.log);
              }}
            >
              Login with Google
            </button>
          )}
        </div>
        <div className="pt-10">
          {session ? (
            <GuestbookEntries />
          ) : (
            <p className="text-md font-light">
              You need to be logged in to view your guestbook!
            </p>
          )}
        </div>
      </div>
    </main>
  );
};
export default Home;
