import { View, StyleSheet } from "react-native";

export default function VacantBedCardSkeleton() {
    return (
        <View style={styles.card}>
            <View style={styles.left}>
                <View style={styles.iconSkeleton} />

                <View>
                    <View style={styles.titleSkeleton} />
                    <View style={styles.subTitleSkeleton} />
                </View>
            </View>

            <View style={styles.countSkeleton} />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FAFBFF",
        borderRadius: 14,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#E6ECF5",
    },

    left: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    iconSkeleton: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: "#E5E7EB",
    },

    titleSkeleton: {
        width: 110,
        height: 14,
        borderRadius: 6,
        backgroundColor: "#E5E7EB",
        marginBottom: 6,
    },

    subTitleSkeleton: {
        width: 150,
        height: 12,
        borderRadius: 6,
        backgroundColor: "#E5E7EB",
    },

    countSkeleton: {
        width: 40,
        height: 26,
        borderRadius: 20,
        backgroundColor: "#E5E7EB",
    },
});
