import { api } from "~/utils/api";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { type User } from "@prisma/client";

export const GuestbookEntries = ({ user }: { user: User }) => {
  const { data: guestbookEntries } = api.guestbook.getAll.useQuery();

  const likeMessage = api.guestbook.likeMessage.useMutation().mutateAsync;
  const unlikeMessage = api.guestbook.unlikeMessage.useMutation().mutateAsync;

  return (
    <div className="flex flex-col gap-4">
      {guestbookEntries
        ?.sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
        .map((entry, index) => {
          const hasUserLikedMessage =
            entry.likes?.filter((like) => like.userId === user.id).length > 0;

          return (
            <div key={index} className="w-full rounded-md bg-neutral-700 p-2">
              <div className="flex justify-between">
                <p className="mb-1">{entry.message}</p>
                <div className="flex flex-row items-center gap-2">
                  {hasUserLikedMessage ? (
                    <FaHeart
                      onClick={() =>
                        void unlikeMessage({
                          guestbookId: entry.id,
                        })
                      }
                    />
                  ) : (
                    <FaRegHeart
                      onClick={() =>
                        void likeMessage({
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
