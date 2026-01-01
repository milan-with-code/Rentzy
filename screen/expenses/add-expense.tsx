import ScreenLayout from "@/components/layout/screen-layout";
import { View, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { ExpenseFormData } from "@/types/expenses";
import { router } from "expo-router";
import { expenseService } from "@/api/expense.service";
import { AxiosError } from "axios";
import ExpenseForm from "./components/expense-form";

export default function AddExpensesScreen() {
    const [form, setForm] = useState<ExpenseFormData>({
        categoryName: "",
        name: "",
        amount: "",
        description: "",
        date: "",
        invoiceNumber: "",
        invoiceFile: undefined,
    });


    const handleChange = (key: keyof ExpenseFormData, value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleCreateExpense = async () => {
        console.log('form :>> ', form);
        try {
            const response = await expenseService.addExpense({
                categoryName: form.categoryName,
                name: form.name,
                amount: form.amount,
                description: form.description,
                date: form.date,
                invoiceNumber: form.invoiceNumber,
                invoiceFile: form.invoiceFile,
            })
            if (response.status === 201) {
                Alert.alert("Success", "Expense created successfully");
                setForm({
                    categoryName: "",
                    name: "",
                    amount: "",
                    description: "",
                    date: "",
                    invoiceNumber: "",
                    invoiceFile: undefined,
                })
                router.back();
            }
        } catch (e) {
            const err = e as AxiosError<{ message?: string }>;
            Alert.alert("Expense Failed", err.response?.data?.message ?? err.message ?? "Something went wrong");
        }

    }

    return (
        <ScreenLayout title="Add Expenses">
            <View style={styles.wrapper}>
                <ExpenseForm
                    value={form}
                    onChange={handleChange}
                    onSubmit={handleCreateExpense}
                    submitLabel="Create"
                    showCancel
                    onCancel={() => router.back()}
                />
            </View>
        </ScreenLayout>
    );
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },

    container: {
        flexGrow: 1,
        paddingBottom: 48,
    },

    bottomRow: {
        flexDirection: "row",
        gap: 12,
        position: "absolute",
        bottom: 0,
        backgroundColor: "white"
    },


    flex: {
        flex: 1,
    },
});
