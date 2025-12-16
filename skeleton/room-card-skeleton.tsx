import { View, StyleSheet } from "react-native";

export default function RoomCardSkeleton() {
    return (
        <View style={styles.card}>
            {/* Header */}
            <View style={styles.headerRow}>
                <View style={styles.titleSkeleton} />
                <View style={styles.iconSkeleton} />
            </View>

            {/* Rows */}
            <View style={styles.row}>
                <View style={styles.iconSmall} />
                <View style={styles.textSkeleton} />
            </View>

            <View style={styles.row}>
                <View style={styles.iconSmall} />
                <View style={styles.textSkeleton} />
            </View>

            <View style={styles.row}>
                <View style={styles.iconSmall} />
                <View style={styles.textSkeleton} />
            </View>

            {/* Amenities */}
            <View style={styles.amenityBox}>
                <View style={styles.amenityTitle} />

                <View style={styles.amenityList}>
                    {[1, 2, 3, 4].map((_, index) => (
                        <View key={index} style={styles.amenityBadge} />
                    ))}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        padding: 14,
        borderRadius: 16,
        marginBottom: 14,
    },

    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },

    titleSkeleton: {
        width: "55%",
        height: 18,
        backgroundColor: "#E0E0E0",
        borderRadius: 6,
    },

    iconSkeleton: {
        width: 18,
        height: 18,
        backgroundColor: "#E0E0E0",
        borderRadius: 9,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginBottom: 8,
    },

    iconSmall: {
        width: 16,
        height: 16,
        backgroundColor: "#E0E0E0",
        borderRadius: 8,
    },

    textSkeleton: {
        width: "45%",
        height: 14,
        backgroundColor: "#E0E0E0",
        borderRadius: 6,
    },

    amenityBox: {
        marginTop: 10,
    },

    amenityTitle: {
        width: 80,
        height: 14,
        backgroundColor: "#E0E0E0",
        borderRadius: 6,
        marginBottom: 8,
    },

    amenityList: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 6,
    },

    amenityBadge: {
        width: 60,
        height: 22,
        backgroundColor: "#E0E0E0",
        borderRadius: 8,
    },
});
