import { useEffect, useState } from 'react';
import axiosInstance from './axios';
import useInstallPrompt from './hooks/useInstallPrompt';

function App() {
  const [users, setUsers] = useState<Record<string, string>>({ name: '' });
  const { showInstallButton, handleInstallClick } = useInstallPrompt();

  useEffect(() => {
    async function getUsers() {
      const u = await axiosInstance.get(
        'https://jsonplaceholder.typicode.com/users/5'
      );
      setUsers(u.data);
    }
    getUsers();
  }, []);

  return (
    <div className="App">
      {showInstallButton && (
        <button onClick={handleInstallClick}>Install App</button>
      )}
      <h1>hello</h1>
      <p key={users.name}>{users.name}</p>
    </div>
  );
}

export default App;
