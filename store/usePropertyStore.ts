import { Alert } from "react-native";
import { AxiosError } from "axios";
import { create } from "zustand";
import { propertyService } from "@/api/property.service";
import { PropertyData } from "@/types/property";

interface PropertyStore {
    property: PropertyData | null;
    loading: boolean;
    error: string | null;
    fetchProperty: () => Promise<void>;
}

export const usePropertyStore = create<PropertyStore>((set, get) => ({
    property: null,
    loading: false,
    error: null,

    async fetchProperty() {
        if (get().property) return;

        set({ loading: true, error: null });

        try {
            const res = await propertyService.getProperty();

            set({
                property: res.data.property,
                error: null,
            });

        } catch (error) {
            const err = error as AxiosError<{ message?: string }>;
            const msg = err.response?.data?.message || "Something went wrong";

            set({ error: msg });
            Alert.alert("Error", msg);
        } finally {
            set({ loading: false });
        }
    },
}));
