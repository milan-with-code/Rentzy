import { createContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

export const AuthContext = createContext({
    isSignedIn: false,
    loading: true,
    setAuthToken: (token: string | null) => { },
});

export function AuthProvider({ children }: any) {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync("token");
            if (isMounted) {
                setIsSignedIn(!!token);
                setLoading(false);
            }
        };

        loadToken();

        return () => {
            isMounted = false;
        };
    }, []);

    const setAuthToken = async (token: string | null) => {
        if (token) {
            await SecureStore.setItemAsync("token", token);
            setIsSignedIn(true);
        } else {
            await SecureStore.deleteItemAsync("token");
            setIsSignedIn(false);
        }
    };

    return (
        <AuthContext.Provider value={{ isSignedIn, loading, setAuthToken }}>
            {children}
        </AuthContext.Provider>
    );
}
