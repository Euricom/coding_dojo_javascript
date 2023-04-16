import { signIn, signOut, useSession } from "next-auth/react";
import { Form } from "~/components/Form";
import { GuestbookEntries } from "~/components/GuestbookEntries";

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
            <>
              <div className="mb-4">
                <Form />
              </div>
              <GuestbookEntries user={session.user} />
            </>
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
