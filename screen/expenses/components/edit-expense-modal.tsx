import { Modal, View, Text, StyleSheet, ScrollView } from "react-native";
import { Colors, Fonts } from "@/constants/theme";
import ExpenseForm from "./expense-form";
import { ExpenseFormData, Expense } from "@/types/expenses";
import { useEffect, useState } from "react";

type Props = {
    visible: boolean;
    expense: Expense | null;
    onClose: () => void;
    onSubmit: (data: ExpenseFormData) => void;
};

export default function EditExpenseModal({
    visible,
    expense,
    onClose,
    onSubmit,
}: Props) {

    const [form, setForm] = useState<ExpenseFormData>({
        categoryName: "",
        name: "",
        amount: "",
        description: "",
        date: "",
        invoiceNumber: "",
        invoiceFile: undefined,
    });

    useEffect(() => {
        if (!expense) return;

        setForm({
            categoryName: expense.name,
            name: expense.name,
            amount: String(expense.amount),
            description: expense.description ?? "",
            date: expense.expenseDate,
            invoiceNumber: expense.invoiceNumber ?? "",
            invoiceFile: expense.invoiceFile ? { uri: expense.invoiceFile } : undefined,
        });
    }, [expense]);

    const handleChange = (key: keyof ExpenseFormData, value: any) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    if (!expense) return null;

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Edit Expense</Text>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={styles.scrollContent}
                    >
                        <ExpenseForm
                            value={form}
                            onChange={handleChange}
                            onSubmit={() => onSubmit(form)}
                            submitLabel="Update"
                            showCancel
                            onCancel={onClose}
                        />
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}


export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.35)",
        justifyContent: "center",
        alignItems: "center",
    },

    container: {
        width: "92%",
        maxHeight: "90%",
        backgroundColor: "#fff",
        borderRadius: 18,
        padding: 16,
        borderWidth: 1,
        borderColor: Colors.athensGrayLight,
    },

    scrollContent: {
        paddingBottom: 24,
    },

    title: {
        fontFamily: Fonts.rounded,
        fontSize: 17,
        color: Colors.portGore,
        marginBottom: 10,
    },
});
