import { View, Text, StyleSheet } from "react-native";
import UserAvatar from "@/components/user-avatar";
import { Fonts } from "@/constants/theme";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { ProfileHeaderProps } from "@/types/common";
import { Link } from "expo-router";

export default function ProfileHeader({ name, email, phone, avatarName }: ProfileHeaderProps) {
    return (
        <View style={styles.wrapper}>
            <View style={styles.row}>
                <UserAvatar name={avatarName} size={60} />

                <View style={styles.infoBox}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.email}>{email}</Text>
                    <Text style={styles.phone}>{phone}</Text>
                </View>
            </View>

            <Link href="/(main)/profile/edit">
                <View style={styles.editButton}>
                    <IconSymbol name="edit.icon" size={20} color="#1D61E7" />
                </View>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    infoBox: {
        gap: 4,
    },

    name: {
        fontSize: 18,
        fontFamily: Fonts.serif,
        color: "#1A1A1A",
        lineHeight: 22,
    },

    email: {
        fontSize: 14,
        fontFamily: Fonts.sans,
        color: "#555",
        lineHeight: 18,
    },

    phone: {
        fontSize: 14,
        fontFamily: Fonts.sans,
        color: "#555",
        lineHeight: 18,
    },

    editButton: {
        width: 36,
        height: 36,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#E6F0FF",
    },
});
