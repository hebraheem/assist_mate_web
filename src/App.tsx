import React, { useEffect, useState } from 'react';
import axiosInstance from './axios';

function App() {
  const [users, setUsers] = useState<Record<string, string>>({ name: '' });

  useEffect(() => {
    async function getUsers() {
      const u = await axiosInstance.get(
        'https://jsonplaceholder.typicode.com/users/10'
      );
      setUsers(u.data);
    }
    getUsers();
  }, []);

  return (
    <div className="App">
      <h1>hello</h1>
      <p key={users.name}>{users.name}</p>
    </div>
  );
}

export default App;
