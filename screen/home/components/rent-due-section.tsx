import { Fonts } from "@/constants/theme";
import { StyleSheet, Text, View } from "react-native";
import EmptyState from "@svg/emptyState.svg";

export default function RentDueSection() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Rent Due (0)</Text>
            </View>

            <View style={styles.emptyContainer}>
                <EmptyState width={120} height={120} />
                <Text style={styles.emptyText}>No Dues</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: "#BABABA",
        borderRadius: 8,
        overflow: "hidden",
    },

    header: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: "#B1C8F7",
    },

    headerText: {
        fontFamily: Fonts.serif,
        fontSize: 14,
        lineHeight: 20,
    },

    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 20,
    },

    emptyText: {
        fontFamily: Fonts.sans,
        fontSize: 14,
        lineHeight: 20,
        paddingTop: 10,
        color: "#939090",
    },
});
