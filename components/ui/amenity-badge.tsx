import React from "react";
import { Pressable, Text, StyleSheet, ViewStyle } from "react-native";
import { Colors, Fonts } from "@/constants/theme";

type AmenityBadgeProps = {
    label: string;
    selected: boolean;
    onToggle: () => void;
    style?: ViewStyle;
};

export default function AmenityBadge({
    label,
    selected,
    onToggle,
    style,
}: AmenityBadgeProps) {
    return (
        <Pressable
            onPress={onToggle}
            style={({ pressed }) => [
                styles.badge,
                selected && styles.active,
                pressed && styles.pressed,
                style,
            ]}
        >
            <Text
                style={[
                    styles.text,
                    selected && styles.activeText,
                ]}
            >
                {label}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    badge: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#d1d5db",
        backgroundColor: "#fff",
    },

    active: {
        backgroundColor: Colors.primary || "#2563EB",
        borderColor: Colors.primary || "#2563EB",
    },

    pressed: {
        opacity: 0.85,
    },

    text: {
        fontSize: 14,
        fontFamily: Fonts.serif,
        color: "#374151",
        lineHeight: 20,
    },

    activeText: {
        color: "#fff",
    },
});
