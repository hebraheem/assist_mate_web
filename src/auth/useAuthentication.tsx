import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { IAuthData } from '../@types/context';
import { auth } from '../services/firebase';
import { User, onAuthStateChanged } from 'firebase/auth';

const useAuthentication = (): IAuthData => {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const idToken = await currentUser.getIdToken();
          setToken(idToken);

          const decodedToken: { exp: number } = jwtDecode(idToken);
          const { exp } = decodedToken;
          const currentTime = Date.now() / 1000;

          if (exp < currentTime) {
            setIsAuthenticated(false);
          } else {
            setUser(currentUser);
            setIsAuthenticated(true);
          }
        } catch (error: any) {
          console.error('Error fetching ID token:', error);
          setError(error.message);
          setIsAuthenticated(false);
        } finally {
          setIsLoading(false);
        }
      } else {
        // No user is signed in, or user has logged out
        setIsAuthenticated(false);
        setUser(null);
        setIsLoading(false);
      }
    });

    // Cleanup the subscription to the auth state listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return { token, isAuthenticated, user, error, isLoading };
};

export default useAuthentication;
