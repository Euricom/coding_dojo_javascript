import React, { useState } from 'react';
import UserList from './components/UserLIst';

const App: React.FC = () => {
  return (
    <div className="container mx-auto mt-2">
      <h1 className="text-3xl font-bold underline">Hello tRPC</h1>
      <p>And tailwind, and React</p>
      <hr />
      <UserList />
    </div>
  );
};

export default App;
