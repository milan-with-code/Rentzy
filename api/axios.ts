import axios, { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";
import { API_URL } from "./config";


const API = axios.create({
    baseURL: API_URL,
    timeout: 10000,
});

API.interceptors.request.use(async (config) => {
    const token = await SecureStore.getItemAsync("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

API.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
        if (error.response?.status === 401) {
            await SecureStore.deleteItemAsync("token");
        }

        return Promise.reject(error);
    }
);

export default API;
