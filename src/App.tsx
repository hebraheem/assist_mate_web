import React, { useEffect, useState } from 'react';
import axiosInstance from './axios';

function App() {
  const [users, setUsers] = useState<Record<string, string>>({ name: '' });

  useEffect(() => {
    async function getUsers() {
      const u = await axiosInstance.get(
        'https://jsonplaceholder.typicode.com/users/5'
      );
      setUsers(u.data);
    }
    getUsers();
  }, []);

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e:Event) => {
      // Prevent the mini-info bar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Update UI to notify the user they can add to home screen
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult:any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      // Clear the deferredPrompt
      setDeferredPrompt(null);
      setShowInstallButton(false);
    });
  };


  return (
    <div className="App">
        {showInstallButton && (
        <button onClick={handleInstallClick}>
          Install App
        </button>
        )}
      <h1>hello</h1>
      <p key={users.name}>{users.name}</p>
    </div>
  );
}

export default App;
