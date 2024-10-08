import { useAuth } from '@clerk/clerk-react';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { publicUrls } from '../routes/urls';
import { IAuthData } from '../@types/context';

const useAuthentication = (): IAuthData => {
    const [token, setToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const user = useAuth();

    useEffect(() => {
        async function getToken() {
            setToken(await user.getToken());
        }
        getToken();

        if (token) {
            const decodedToken: { exp: number } = jwtDecode(token);
            const { exp } = decodedToken;
            const currentTime = Date.now() / 1000;

            if (exp < currentTime && user.isSignedIn) {
                user.signOut({ redirectUrl: publicUrls.SIGN_IN });
                setIsAuthenticated(false);
            }
            setIsAuthenticated(true);
        }
    }, [user, token]);

    return { token, isAuthenticated, user };
};

export default useAuthentication;
