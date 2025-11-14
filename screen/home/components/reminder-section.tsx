import { FlatList, Text, View, StyleSheet } from "react-native";
import { Fonts } from "@/constants/theme";
import { reminderSectionData } from "@/mock";
import { ReminderSectionDataProps } from "@/types/common";

export default function ReminderSection() {
    const renderItem = ({ item }: { item: ReminderSectionDataProps }) => (
        <View style={styles.card}>
            <View style={styles.iconContainer}>
                <Text style={styles.iconText}>Icon</Text>
            </View>
            <Text style={styles.amountText}>₹ {item.amount}</Text>
            <Text style={styles.iconText}>{item.title}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={reminderSectionData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        marginBottom: 14,
    },
    card: {
        padding: 10,
        backgroundColor: "#144BB8",
        borderRadius: 12,
        gap: 10,
        width: 155,
    },
    iconContainer: {
        padding: 10,
        backgroundColor: "#1D61E7",
        width: 45,
        height: 45,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    iconText: {
        color: "white",
        fontFamily: Fonts.sans,
        fontSize: 12,
    },
    amountText: {
        color: "white",
        fontSize: 14,
        fontFamily: Fonts.sans,
    },

    separator: {
        width: 6,
    },
});
