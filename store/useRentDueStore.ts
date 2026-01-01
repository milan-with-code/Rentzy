import { residentService } from "@/api/resident.service";
import { RentDueResident } from "@/types/rent";
import { create } from "zustand";

interface RentDueState {
    loading: boolean;
    month: string;
    totalDue: number;
    rentDueList: RentDueResident[];
    error: string | null;

    getRentDue: () => Promise<void>;
    clearRentDue: () => void;
}

export const useRentDueStore = create<RentDueState>((set) => ({
    loading: false,
    month: "",
    totalDue: 0,
    rentDueList: [],
    error: null,

    getRentDue: async () => {
        try {
            set({ loading: true, error: null });

            const res = await residentService.getRentDueResidents();
            const data = res.data?.data || [];

            set({
                rentDueList: data,
                totalDue: res.data?.totalDue || 0,
                month: res.data?.month || "",
                loading: false,
                error: null,
            })

        } catch (error: any) {
            set({
                loading: false,
                error: error?.response?.data?.message || "Failed to fetch rent due",
            });
        }
    },

    clearRentDue: () => {
        set({
            rentDueList: [],
            totalDue: 0,
            month: "",
        });
    },
}));
