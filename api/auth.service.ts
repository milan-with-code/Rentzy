
import * as SecureStore from "expo-secure-store";
import API from "./axios";

export const authService = {
    register: (data: any) => API.post("/auth/register", data),

    login: (data: any) => API.post("/auth/login", data),

    me: () => API.get("/auth/me"),

    profile: () => API.get("/auth/profile"),

    logout: async () => {
        await SecureStore.deleteItemAsync("token");
    },

    sendForgotOTP: (identifier: string) =>
        API.post("/auth/forgot/send-otp", { identifier }),

    verifyForgotOTP: (key: string, otp: string) =>
        API.post("/auth/forgot/verify-otp", { key, otp }),

    resetPassword: (key: string, newPassword: string, confirmPassword: string) =>
        API.post("/auth/forgot/reset", {
            key,
            newPassword,
            confirmPassword,
        }),
};
