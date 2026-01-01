import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors, Fonts } from "@/constants/theme";
import { formatDate } from "@/utils/date";

type Expense = {
    _id: string;
    name: string;
    category: string;
    amount: number;
    expenseDate: string;
    invoiceNumber?: string;
};

type Props = {
    item: Expense;
    onDelete?: (id: string) => void;
    onEdit?: (id: string) => void;
};

export default function ExpenseCard({ item, onDelete, onEdit }: Props) {
    const { _id, name, category, amount, expenseDate, invoiceNumber } = item;

    const handleViewReceipt = () => console.log("View receipt:", _id);

    return (
        <TouchableOpacity activeOpacity={0.85}>
            <View style={styles.card}>
                <View style={styles.iconWrapper}>
                    <Ionicons
                        name="receipt-outline"
                        size={22}
                        color={Colors.primary}
                    />
                </View>

                <View style={styles.content}>
                    <Text style={styles.title} numberOfLines={1}>
                        {name}
                    </Text>

                    <View style={styles.metaRow}>
                        <Text style={styles.category}>{category}</Text>
                        <Text style={styles.dot}>•</Text>
                        <Text style={styles.date}>
                            {formatDate(expenseDate)}
                        </Text>
                    </View>

                    {invoiceNumber && (
                        <Text style={styles.invoice}>
                            Invoice: {invoiceNumber}
                        </Text>
                    )}
                </View>

                <View style={styles.rightSection}>
                    <Text style={styles.amount}>₹ {amount}</Text>

                    <View style={styles.actions}>
                        <ActionIcon
                            icon="document-text-outline"
                            color={Colors.nevada}
                            onPress={handleViewReceipt}
                        />
                        <ActionIcon
                            icon="create-outline"
                            color={Colors.primary}
                            onPress={() => onEdit?.(_id)}
                        />
                        <ActionIcon
                            icon="trash-outline"
                            color="#E5484D"
                            onPress={() => onDelete?.(_id)}
                        />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

function ActionIcon({
    icon,
    color,
    onPress,
}: {
    icon: keyof typeof Ionicons.glyphMap;
    color: string;
    onPress: () => void;
}) {
    return (
        <TouchableOpacity onPress={onPress} hitSlop={8} activeOpacity={0.8}>
            <Ionicons name={icon} size={18} color={color} />
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.athensGray,
        borderRadius: 14,
        padding: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: Colors.athensGrayLight,
    },

    iconWrapper: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: Colors.athensGrayLight,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },

    content: {
        flex: 1,
    },

    title: {
        fontFamily: Fonts.rounded,
        fontSize: 15,
        color: Colors.portGore,
        marginBottom: 4,
    },

    metaRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    category: {
        fontFamily: Fonts.sans,
        fontSize: 12,
        color: Colors.nevada,
    },

    dot: {
        marginHorizontal: 6,
        color: Colors.nevada,
    },

    date: {
        fontFamily: Fonts.sans,
        fontSize: 12,
        color: Colors.nevada,
    },

    invoice: {
        marginTop: 4,
        fontFamily: Fonts.sans,
        fontSize: 11,
        color: Colors.waterloo,
    },

    rightSection: {
        alignItems: "flex-end",
        marginLeft: 10,
    },

    amount: {
        fontFamily: Fonts.mono,
        fontSize: 16,
        color: Colors.primary,
        marginBottom: 6,
    },

    actions: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
});
