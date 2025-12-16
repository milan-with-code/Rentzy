import { create } from "zustand";
import { bedService } from "@/api/bed.service";
import { Bed } from "@/types/bed";

type BedState = {
    beds: Bed[];
    total: number;
    loading: boolean;
    fetchVacantBeds: () => Promise<void>;
    reset: () => void;
};

export const useBedStore = create<BedState>((set) => ({
    beds: [],
    total: 0,
    loading: false,

    fetchVacantBeds: async () => {
        set({ loading: true });
        try {
            const res = await bedService.getAllVacantBeds();
            set({
                beds: res.data?.beds ?? [],
                total: res.data?.total ?? 0,
            });
        } finally {
            set({ loading: false });
        }
    },

    reset: () => set({ beds: [], total: 0 }),
}));
