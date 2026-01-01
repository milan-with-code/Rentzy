export interface MenuItemProps {
    label: string;
    onPress: () => void;
}

export type UploadFile = {
    uri: string;
    name?: string;
    type?: string;
};

export interface ExpenseResponse {
    amount: number;
    description: string;
    date: string;
}

export interface ExpenseFormData {
    categoryName: string;
    name: string;
    amount: string;
    description?: string;
    date: string;
    invoiceNumber?: string;
    invoiceFile?: UploadFile;
}

export type Expense = {
    _id: string;
    category: string;
    name: string;
    amount: number;
    expenseDate: string;
    description?: string;
    invoiceNumber?: string;
    invoiceFile?: string | null;
};

export type GetExpensesResponse = {
    success: boolean;
    message: string;
    expenses: Expense[];
};

export type ExpenseNewData = {
    category: string;
    name: string;
    amount: string;
    description?: string;
    expenseDate: string;
    invoiceNumber?: string;
    invoiceFile?: string | null;
}

export type CategoryOption = {
    id: number;
    label: string;
    value: string;
}
