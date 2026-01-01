import { View, ScrollView, StyleSheet, Pressable, Text } from "react-native";
import Input from "@/components/ui/text-input";
import Button from "@/components/ui/button";
import WheelDatePickerField from "@/components/date-picker/wheel-date-picker-Field";
import UploadCard from "@/components/ui/upload-card";
import { ExpenseFormData } from "@/types/expenses";
import { useState } from "react";
import { CATEGORY_OPTIONS } from "@/mock";
import DropdownPicker from "@/components/ui/dropdown-picker";
import { Colors, Fonts } from "@/constants/theme";

type Props = {
    value: ExpenseFormData;
    onChange: (key: keyof ExpenseFormData, value: any) => void;
    onSubmit: () => void;
    submitLabel: string;
    showCancel?: boolean;
    onCancel?: () => void;
};

export default function ExpenseForm({
    value,
    onChange,
    onSubmit,
    submitLabel,
    showCancel,
    onCancel,
}: Props) {

    const [categoryOpen, setCategoryOpen] = useState(false);

    const selectedCategory =
        CATEGORY_OPTIONS.find(
            (item) => item.value === value.categoryName
        ) || null;

    return (
        <>
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.label}>Category</Text>

                <DropdownPicker
                    isOpen={categoryOpen}
                    setIsOpen={setCategoryOpen}
                    data={CATEGORY_OPTIONS}
                    selected={selectedCategory}
                    placeholder="Select Category"
                    renderItem={({ item }) => (
                        <Pressable
                            style={styles.item}
                            onPress={() => {
                                onChange("categoryName", item.value);
                                setCategoryOpen(false);
                            }}
                        >
                            <Text style={styles.itemText}>
                                {item.label}
                            </Text>
                        </Pressable>
                    )}
                    containerStyle={{ marginBottom: 16 }}
                />

                <Input
                    label="Expense Name"
                    placeholder="Name*"
                    value={value.name}
                    onChangeText={(v: string) => onChange("name", v)}
                />

                <Input
                    label="Amount"
                    placeholder="Amount*"
                    keyboardType="numeric"
                    value={value.amount}
                    onChangeText={(v: string) => onChange("amount", v)}
                />

                <Input
                    label="Description"
                    multiline
                    numberOfLines={3}
                    value={value.description}
                    placeholder="Description*"
                    onChangeText={(v: string) => onChange("description", v)}
                />

                <WheelDatePickerField
                    label="Expense Date"
                    value={value.date ? new Date(value.date) : new Date()}
                    onConfirm={(d) =>
                        onChange("date", d.toISOString())
                    }
                    containerStyle={{ marginBottom: 16 }}
                />

                <Input
                    label="Invoice Number (Optional)"
                    value={value.invoiceNumber}
                    onChangeText={(v: string) => onChange("invoiceNumber", v)}
                />

                <UploadCard
                    label="Upload Invoice"
                    value={value.invoiceFile?.uri}
                    onChange={(file) =>
                        onChange("invoiceFile", file)
                    }
                />
            </ScrollView>

            <View style={{ flexDirection: "row", gap: 12 }}>
                {showCancel && (
                    <View style={styles.flex}>
                        <Button
                            title="Cancel"
                            variant="secondary"
                            fullWidth
                            onPress={onCancel}
                        />
                    </View>
                )}
                <View style={styles.flex}>
                    <Button
                        title={submitLabel}
                        fullWidth
                        onPress={onSubmit}

                    />
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    item: {
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    itemText: {
        fontSize: 13,
        fontFamily: Fonts.sans,
        color: "#313144",
    },
    label: {
        fontFamily: Fonts.serif,
        color: Colors.nevada,
        marginBottom: 3,
        fontSize: 12,
        lineHeight: 19,
    },

})


