import { View, StyleSheet } from "react-native";

export default function RentDueSkeleton() {
    return (
        <View style={styles.container}>
            <View style={styles.header} />

            {[1, 2, 3].map((i) => (
                <View key={i} style={styles.card}>
                    <View>
                        <View style={styles.lineLarge} />
                        <View style={styles.lineSmall} />
                    </View>
                    <View style={styles.rent} />
                </View>
            ))}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 8,
        overflow: "hidden",
        marginBottom: 16,
    },

    header: {
        height: 40,
        backgroundColor: "#EAEAEA",
    },

    card: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderColor: "#EAEAEA",
    },

    lineLarge: {
        width: 120,
        height: 14,
        backgroundColor: "#EAEAEA",
        borderRadius: 4,
        marginBottom: 6,
    },

    lineSmall: {
        width: 80,
        height: 12,
        backgroundColor: "#EAEAEA",
        borderRadius: 4,
    },

    rent: {
        width: 60,
        height: 16,
        backgroundColor: "#EAEAEA",
        borderRadius: 4,
    },
});
