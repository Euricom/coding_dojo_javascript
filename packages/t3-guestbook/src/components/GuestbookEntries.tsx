import { api } from "~/utils/api";

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
              <p className="mb-1">{entry.message}</p>
              <span className="text-sm font-light italic">- {entry.name}</span>
            </div>
          );
        })}
    </div>
  );
};
