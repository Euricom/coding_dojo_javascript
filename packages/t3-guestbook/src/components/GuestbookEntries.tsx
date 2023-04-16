import { api } from "~/utils/api";
import { FaRegHeart, FaHeart } from "react-icons/fa";

export const GuestbookEntries = () => {
  const { data: guestbookEntries, isLoading } = api.guestbook.getAll.useQuery();

  if (isLoading) return <div>Fetching messages...</div>;

  return (
    <div className="flex flex-col gap-4">
      {guestbookEntries
        ?.sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
        .map((entry, index) => {
          return (
            <div key={index} className="w-full rounded-md bg-neutral-700 p-2">
              <div className="flex justify-between">
                <p className="mb-1">{entry.message}</p>
                <div className="flex flex-row items-center gap-2">
                  <FaRegHeart />
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
