import { api } from "~/utils/api";
import { FaRegHeart, FaHeart } from "react-icons/fa";

import { useSession } from "next-auth/react";

export const GuestbookEntries = () => {
  const { data: session } = useSession();
  const { data: guestbookEntries } = api.guestbook.getAll.useQuery();

  const utils = api.useContext();

  const likeMessage = api.guestbook.likeMessage.useMutation({
    onSettled: async () => {
      await utils.guestbook.getAll.invalidate();
    },
  });

  const unlikeMessage = api.guestbook.unlikeMessage.useMutation({
    onSettled: async () => {
      await utils.guestbook.getAll.invalidate();
    },
  });

  return (
    <div className="flex flex-col gap-4">
      {guestbookEntries
        ?.sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
        .map((entry, index) => {
          const hasUserLikedMessage =
            entry.likes?.filter((like) => like.userId === session?.user.id)
              .length > 0;

          return (
            <div key={index} className="w-full rounded-md bg-neutral-700 p-2">
              <div className="flex justify-between">
                <p className="mb-1">{entry.message}</p>
                <div className="flex flex-row items-center gap-2">
                  {hasUserLikedMessage ? (
                    <FaHeart
                      onClick={() =>
                        void unlikeMessage.mutate({
                          guestbookId: entry.id,
                        })
                      }
                    />
                  ) : (
                    <FaRegHeart
                      onClick={() =>
                        void likeMessage.mutate({
                          guestbookId: entry.id,
                        })
                      }
                    />
                  )}
                  <p>{entry.likes?.length || 0}</p>
                </div>
              </div>
              <span className="text-sm font-light italic">- {entry.name}</span>
            </div>
          );
        })}
    </div>
  );
};
