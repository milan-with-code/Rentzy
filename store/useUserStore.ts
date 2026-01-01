import { create } from "zustand";
import { userService } from "@/api/user.service";
import { UpdateUserPayload, User } from "@/types/user";

type UserState = {
    user: User | null;
    loading: boolean;

    fetchMyProfile: () => Promise<void>;
    updateMyProfile: (payload: Partial<UpdateUserPayload>) => Promise<boolean>;
    reset: () => void;
};

export const useUserStore = create<UserState>((set) => ({
    user: null,
    loading: false,

    fetchMyProfile: async () => {
        set({ loading: true });
        try {
            const res = await userService.getMyProfile();

            set({
                user: res.data?.user ?? null,
            });
        } finally {
            set({ loading: false });
        }
    },

    updateMyProfile: async (payload) => {
        set({ loading: true });
        try {
            await userService.updateMyProfile(payload);
            return true;
        } catch {
            return false;
        } finally {
            set({ loading: false });
        }
    },

    reset: () => set({ user: null }),
}));
