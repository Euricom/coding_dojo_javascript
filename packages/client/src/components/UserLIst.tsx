import tRPC from '@/trpc';
import React from 'react';

const UserList = () => {
  const { data: user } = tRPC.getById.useQuery({ id: '1' });
  return (
    <div>
      <h1>UserList</h1>
      {user?.id} - {user?.name}: born on {user?.born?.toDateString()}
    </div>
  );
};

export default UserList;
