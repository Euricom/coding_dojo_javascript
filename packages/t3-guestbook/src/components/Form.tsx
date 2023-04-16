import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "~/utils/api";

export const Form = () => {
  const [message, setMessage] = useState("");
  const { data: session } = useSession();

  // useContext is a hook that gives access to helpers that let you manage the cached data of the queries
  // read more: https://trpc.io/docs/reactjs/usecontext#:~:text=useContext%20is%20a%20hook%20that,%2Dquery%20's%20queryClient%20methods.
  const utils = api.useContext();

  const postMessage = api.guestbook.postMessage.useMutation({
    onMutate: async (newEntry) => {
      await utils.guestbook.getAll.cancel();
      utils.guestbook.getAll.setData(undefined, (prevEntries) => {
        if (prevEntries) {
          return [newEntry, ...prevEntries];
        } else {
          return [newEntry];
        }
      });
    },
    // refetch after each error or success
    onSettled: async () => {
      await utils.guestbook.getAll.invalidate();
    },
  });

  return (
    <form
      className="flex gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        postMessage.mutate({
          name: session?.user?.name as string,
          message,
        });
        setMessage("");
      }}
    >
      <input
        type="text"
        className="rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 focus:outline-none"
        placeholder="Your message..."
        minLength={2}
        maxLength={100}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <button
        type="submit"
        className="rounded-md border-2 border-zinc-800 p-2 focus:outline-none"
      >
        Submit
      </button>
    </form>
  );
};
