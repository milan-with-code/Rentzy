import { User } from "@/types/user";
import API from "./axios";

export const userService = {
    getMyProfile: () => API.get("/auth/me"),
    updateMyProfile: (payload: Partial<User>) => API.put("/auth/me", payload),
};
