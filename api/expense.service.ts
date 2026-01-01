import { ExpenseFormData, ExpenseResponse, GetExpensesResponse } from "@/types/expenses";
import API from "./axios";


export type CreateExpensePayload = {
    categoryName: string;
    name: string;
    amount: string | number;
    description?: string;
    date: string;
    invoiceNumber?: string;
    invoiceFile?: any;
};

export type UpdateExpensePayload = Partial<CreateExpensePayload>;

type FetchExpensesParams = {
    fromDate?: Date | string;
    toDate?: Date | string;
    search?: string
};

export const expenseService = {
    getExpenses(params?: FetchExpensesParams) {
        return API.get<GetExpensesResponse>("/expenses", {
            params: {
                fromDate:
                    params?.fromDate instanceof Date
                        ? params.fromDate.toISOString()
                        : params?.fromDate,

                toDate:
                    params?.toDate instanceof Date
                        ? params.toDate.toISOString()
                        : params?.toDate,
                search: params?.search

            },
        });
    },

    addExpense: (data: ExpenseFormData & { invoiceFile?: any }) => {
        const formData = new FormData();

        formData.append("categoryName", data.categoryName);
        formData.append("name", data.name);
        formData.append("amount", String(data.amount));
        formData.append("description", data.description || "");
        formData.append("date", data.date || "");
        formData.append("invoiceNumber", data.invoiceNumber || "");

        if (data.invoiceFile?.uri) {
            formData.append("invoiceFile", {
                uri: data.invoiceFile.uri,
                name:
                    data.invoiceFile.name ||
                    data.invoiceFile.fileName ||
                    "invoice.jpg",
                type: data.invoiceFile.type || data.invoiceFile.mimeType || "image/jpeg",
            } as any);
        }

        return API.post<ExpenseResponse>("/expenses", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },

    getExpenseById: (id: string) =>
        API.get(`/expenses/${id}`),

    updateExpense(id: string, payload: UpdateExpensePayload) {
        const formData = new FormData();

        Object.entries(payload).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formData.append(key, value as any);
            }
        });

        return API.put(`/expenses/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },

    deleteExpense(id: string) {
        return API.delete(`/expenses/${id}`);
    },
};
