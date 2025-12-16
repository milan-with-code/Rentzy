import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { Ionicons, Feather } from '@expo/vector-icons';
import { Fonts } from "@/constants/theme";
import { useEffect } from "react";
import { usePropertyStore } from "@/store/usePropertyStore";

const NOTIFICATION_COUNT = 3;

export default function Header() {
    const { property, loading, fetchProperty } = usePropertyStore();
    useEffect(() => { fetchProperty() }, [])

    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>{property?.propertyName}</Text>

            <View style={styles.iconRow}>

                <View style={{ position: "relative" }}>
                    <Ionicons name="notifications-outline" size={22} color="white" />

                    {NOTIFICATION_COUNT > 0 && (
                        <View style={styles.badgeContainer}>
                            <Text style={styles.badgeText}>
                                {NOTIFICATION_COUNT}
                            </Text>
                        </View>
                    )}
                </View>
                <Link href="/(main)/profile">
                    <Feather name="user" size={22} color="white" />
                </Link>
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

    badgeContainer: {
        position: "absolute",
        top: -4,
        right: -6,
        backgroundColor: "red",
        minWidth: 16,
        height: 16,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 3,
    },

    badgeText: {
        color: "white",
        fontSize: 10,
        fontFamily: Fonts.sans,
        lineHeight: 12
    },
});
