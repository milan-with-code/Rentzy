import { View, Text, StyleSheet } from "react-native";
import { Colors, Fonts } from "@/constants/theme";

export interface StatsItem {
    label: string;
    value: string | number;
}

interface StatsBarProps {
    stats: StatsItem[];
    containerStyle?: any;
}

export default function StatsBar({
    stats,
    containerStyle,
}: StatsBarProps) {
    return (
        <View style={[styles.container, containerStyle]}>
            {stats.map((item, index) => (
                <View key={index} style={styles.item}>
                    <Text style={styles.value}>{item.value}</Text>
                    <Text style={styles.label}>{item.label}</Text>
                </View>
            ))}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        padding: 10,
        borderRadius: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 14,
    },
    item: {
        alignItems: "center",
    },
    value: {
        color: "#fff",
        fontSize: 16,
        fontFamily: Fonts.mono,
        lineHeight: 26,
    },
    label: {
        color: "#fff",
        fontSize: 12,
        fontFamily: Fonts.serif,
        lineHeight: 16,
    },
});
