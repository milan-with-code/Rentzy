import { authService } from "@/api/auth.service";
import { UserDataProps } from "@/types/user";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export default function useFetchUser() {
    const [userData, setUserData] = useState<UserDataProps | null>(null);
    const [userLoading, setUserLoading] = useState<boolean>(true);
    const [userError, setUserError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function getUserData() {
            try {

                const data = await authService.me();

                if (isMounted) {
                    setUserData(data.data?.user);
                    setUserError(null);
                }

            } catch (error) {
                const err = error as AxiosError<{ message?: string }>;
                const msg = err.response?.data?.message || err.message || "Something went wrong";

                if (isMounted) {
                    setUserError(msg);
                    Alert.alert("Error", msg);
                }

            } finally {
                if (isMounted) setUserLoading(false);
            }
        }

        getUserData();

        return () => {
            isMounted = false;
        };
    }, []);

    return {
        userData,
        userLoading,
        userError,
    };
}
