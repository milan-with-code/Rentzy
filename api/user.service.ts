import API from "./axios";

export const userService = {
    getUsers: () => API.get("/auth/me"),
};
