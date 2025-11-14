import { StyleSheet, Text, View } from "react-native";
import { Ionicons, Feather } from '@expo/vector-icons';
import { Fonts } from "@/constants/theme";

export default function Header() {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Patel PG</Text>
            <View style={styles.iconRow}>
                <Ionicons name="notifications-outline" size={22} color="white" />
                <Feather name="user" size={22} color="white" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#1D61E7",
        paddingTop: 40,
        paddingHorizontal: 16,
        marginBottom: 10,
    },

    headerTitle: {
        fontFamily: Fonts.sans,
        fontSize: 15,
        color: "white",
        lineHeight: 18,
    },

    iconRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },

    item: {
        paddingVertical: 12,
        paddingHorizontal: 15,
    },

    itemText: {
        fontSize: 12,
        fontFamily: Fonts.serif,
        color: "#313144",
    },
});
