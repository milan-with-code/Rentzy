import { View, Text, StyleSheet } from "react-native";
import { IndianRupee, TrendingUp } from "lucide-react-native";
import { Fonts } from "@/constants/theme";

type Props = { total: number };

export default function TotalExpenseCard({ total }: Props) {
    return (
        <View style={styles.card}>
            <View style={styles.iconBox}>
                <IndianRupee size={22} color="#fff" />
            </View>

            <View style={styles.content}>
                <Text style={styles.label}>Total Expenses</Text>
                <Text style={styles.amount}>₹ {total.toLocaleString()}</Text>
            </View>

            <TrendingUp size={20} color="#22C55E" />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 14,
        elevation: 2,
    },
    iconBox: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: "#4F46E5",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    content: { flex: 1 },
    label: {
        fontSize: 12,
        color: "#6B7280",
        fontFamily: Fonts.serif,
        marginBottom: 2,
    },
    amount: {
        fontSize: 18,
        color: "#111827",
        fontFamily: Fonts.serif,
    },
});
