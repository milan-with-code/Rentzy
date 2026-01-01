import { create } from "zustand";
import { AxiosError } from "axios";
import { Alert } from "react-native";
import { expenseService } from "@/api/expense.service";

export type Expense = {
    _id: string;
    name: string;
    category: string;
    amount: number;
    expenseDate: string;
    invoiceNumber?: string;
};

type FetchExpensesParams = {
    fromDate?: Date | string;
    toDate?: Date | string;
    search?: string
};

type ExpenseState = {
    expenses: Expense[];
    loading: boolean;
    error: string | null;

    fetchExpenses: (params?: FetchExpensesParams) => Promise<void>;
    deleteExpense: (id: string) => Promise<void>;
    updateExpense: (id: string, data: any) => Promise<void>;
    clearExpenses: () => void;
};

export const useExpenseStore = create<ExpenseState>((set, get) => ({
    expenses: [],
    loading: false,
    error: null,

    fetchExpenses: async (params) => {
        set({ loading: true });

        try {
            const res = await expenseService.getExpenses(params);
            const data = res.data.expenses

            set({
                expenses: data,
                loading: false,
            });
        } catch (error) {
            set({ loading: false });
        }
    },

    deleteExpense: async (id: string) => {
        const prevExpenses = get().expenses;

        set({
            expenses: prevExpenses.filter((e) => e._id !== id),
        });

        try {
            await expenseService.deleteExpense(id);
        } catch (e) {
            set({ expenses: prevExpenses });
            handleError(e, set);
        }
    },

    updateExpense: async (id: string, data: any) => {
        const prevExpenses = get().expenses;

        set({
            expenses: prevExpenses.map((e) =>
                e._id === id ? { ...e, ...data } : e
            ),
        });

        try {
            const res = await expenseService.updateExpense(id, data);

            set({
                expenses: get().expenses.map((e) =>
                    e._id === id ? res.data.expense : e
                ),
            });
        } catch (e) {
            set({ expenses: prevExpenses });
            handleError(e, set);
        }
    },

    clearExpenses: () => set({ expenses: [] }),
}));

function handleError(
    e: unknown,
    set: (state: Partial<ExpenseState>) => void
) {
    const err = e as AxiosError<{ message?: string }>;

    const message =
        err.response?.data?.message ??
        err.message ??
        "Something went wrong";

    set({ loading: false, error: message });
    Alert.alert("Expense Error", message);
}
