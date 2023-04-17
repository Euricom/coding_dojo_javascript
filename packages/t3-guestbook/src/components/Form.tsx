import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "~/utils/api";

export const Form = () => {
  const [message, setMessage] = useState("");
  const { data: session } = useSession();

  // useContext is a hook that gives access to helpers that let you manage the cached data of the queries
  // read more: https://trpc.io/docs/reactjs/usecontext#:~:text=useContext%20is%20a%20hook%20that,%2Dquery%20's%20queryClient%20methods.
  const trpcContext = api.useContext();

  // prepare the mutation
  const { mutate: createEntry } = api.guestbook.createEntry.useMutation({
    onSuccess: async () => {
      // invalidate all guestbooks, so a refresh is triggered
      await trpcContext.guestbook.getAll.invalidate();
    },
  });

  return (
    <form
      className="flex justify-between gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        createEntry({ name: session?.user.name!, message });
        setMessage(""); // reset input box
      }}
    >
      <input
        type="text"
        className="w-2/3 rounded-md border-2 border-zinc-800 bg-neutral-900 px-4 py-2 focus:outline-none"
        placeholder="Your message..."
        minLength={2}
        maxLength={100}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <button
        type="submit"
        className="w-1/3 rounded-md border-2 border-zinc-800 p-2 focus:outline-none"
      >
        Submit
      </button>
    </form>
  );
};
