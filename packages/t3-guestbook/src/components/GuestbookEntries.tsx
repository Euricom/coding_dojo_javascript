import { FaHeart, FaRegHeart, FaTrash } from "react-icons/fa";
import { api } from "~/utils/api";

import { useSession } from "next-auth/react";

export const GuestbookEntries = () => {
  const { data: session } = useSession();
  const trpcContext = api.useContext();

  const { data: guestbookEntries = [] } = api.guestbook.getAll.useQuery();

  const { mutate: like } = api.guestbook.likeMessage.useMutation({
    // optimistic update
    onMutate: async (newEntry) => {
      trpcContext.guestbook.getAll.setData(undefined, (prevEntries) => {
        const entry = prevEntries?.find(
          (entry) => entry.id === newEntry.guestbookId
        );
        if (entry) {
          entry.likes.push({
            id: "000000", // dummy
            userId: session?.user.id!,
            guestbookId: newEntry.guestbookId,
          });
        }
        return prevEntries;
      });
    },
    // in case of an error, we rollback our optimistic update
    onError: async () => {
      await trpcContext.guestbook.getAll.invalidate();
    },
  });

  const { mutate: unlike } = api.guestbook.unlikeMessage.useMutation({
    // pessimistic update, just refresh the data
    onSuccess: async () => {
      await trpcContext.guestbook.getAll.invalidate();
    },
  });

  const { mutate: remove } = api.guestbook.remove.useMutation({
    onSuccess: async () => {
      await trpcContext.guestbook.getAll.invalidate();
    },
  });

  const sortedEntries = guestbookEntries.sort(
    (a, b) => Number(b.createdAt) - Number(a.createdAt)
  );

  if (sortedEntries.length === 0) {
    return <p className="text-center">No entries yet</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {sortedEntries.map((entry, index) => {
        const hasUserLikedMessage = entry.likes.some(
          (like) => like.userId === session?.user.id
        );
        return (
          <div key={index} className="w-full rounded-md bg-neutral-700 p-2">
            <div className="flex justify-between">
              <p className="mb-1">{entry.message}</p>
              <div className="flex flex-row items-center gap-2">
                {hasUserLikedMessage ? (
                  <FaHeart
                    className="cursor-pointer"
                    onClick={() => void unlike({ guestbookId: entry.id })}
                  />
                ) : (
                  <FaRegHeart
                    className="cursor-pointer"
                    onClick={() => void like({ guestbookId: entry.id })}
                  />
                )}
                <p>{entry.likes.length || 0}</p>
                <FaTrash
                  className="cursor-pointer"
                  onClick={() => void remove({ id: entry.id })}
                />
              </div>
            </div>
            <span className="text-sm font-light italic">- {entry.name}</span>
          </div>
        );
      })}
    </div>
  );
};
