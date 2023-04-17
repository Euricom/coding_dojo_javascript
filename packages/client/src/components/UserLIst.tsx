import tRPC from '@/trpc';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

const UserList = () => {
  const trpcContext = tRPC.useContext();
  const { data: users } = tRPC.getAll.useQuery();
  const { mutate: createUser } = tRPC.createUser.useMutation({
    onSuccess: () => {
      trpcContext.getAll.invalidate();
    },
  });
  return (
    <div>
      <h1>UserList</h1>
      {users?.map((item) => {
        return (
          <div key={item.id}>
            {item.id} - {item.name}: born on {item.born?.toDateString()}
          </div>
        );
      })}
      <hr />
      <button onClick={() => void createUser({ name: 'peter', age: 12, born: new Date(1964, 9, 6) })}>
        Create User
      </button>
    </div>
  );
};

export default UserList;
