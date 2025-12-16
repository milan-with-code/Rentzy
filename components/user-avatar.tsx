import { View, Text, StyleSheet } from "react-native";
import { Fonts } from "@/constants/theme";
import { getUserAvatar } from "@/utils/getUserAvatar";
import { UserAvatarProps } from "@/types/common";

export default function UserAvatar({ name, size = 32 }: UserAvatarProps) {
    const { char, color } = getUserAvatar(name);

    return (
        <View style={[
            styles.avatarContainer,
            { backgroundColor: color, width: size, height: size, borderRadius: size / 2 }
        ]}>
            <Text style={[styles.avatarText, { fontSize: size / 2 }]}>
                {char}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    avatarContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    avatarText: {
        color: "white",
        fontFamily: Fonts.sans,
        lineHeight: 32,
    }
});
