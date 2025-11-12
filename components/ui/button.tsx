import React from "react";
import {
    ActivityIndicator,
    GestureResponderEvent,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
    TextStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Fonts } from "@/constants/theme";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

interface Props {
    title: string;
    onPress?: (event: GestureResponderEvent) => void;
    icon?: keyof typeof Ionicons.glyphMap;
    iconPosition?: "left" | "right";
    loading?: boolean;
    disabled?: boolean;
    variant?: ButtonVariant;
    fullWidth?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    iconSize?: number;
    iconColor?: string;
}

export default function Button({
    title,
    onPress,
    icon,
    iconPosition = "left",
    loading = false,
    disabled = false,
    variant = "primary",
    fullWidth = false,
    style,
    textStyle,
    iconSize = 18,
    iconColor,
}: Props) {
    const isDisabled = disabled || loading;

    const getVariantStyles = () => {
        switch (variant) {
            case "secondary":
                return {
                    button: { backgroundColor: "#E5E7EB" },
                    text: { color: "#111827" },
                };
            case "outline":
                return {
                    button: {
                        backgroundColor: "transparent",
                        borderWidth: 1,
                        borderColor: "#4B5563",
                    },
                    text: { color: "#111827" },
                };
            case "ghost":
                return {
                    button: { backgroundColor: "transparent" },
                    text: { color: "#111827" },
                };
            default:
                return {
                    button: { backgroundColor: "#1D61E7" },
                    text: { color: "#FFFFFF" },
                };
        }
    };

    const { button: variantButton, text: variantText } = getVariantStyles();

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            disabled={isDisabled}
            onPress={onPress}
            style={[
                styles.button,
                variantButton,
                fullWidth && { width: "100%" },
                isDisabled && styles.disabled,
                style,
            ]}
        >
            {loading ? (
                <ActivityIndicator color={variantText.color} />
            ) : (
                <View style={styles.content}>
                    {icon && iconPosition === "left" && (
                        <Ionicons
                            name={icon}
                            size={iconSize}
                            color={iconColor || variantText.color}
                            style={styles.iconLeft}
                        />
                    )}

                    <Text style={[styles.text, variantText, textStyle]}>{title}</Text>

                    {icon && iconPosition === "right" && (
                        <Ionicons
                            name={icon}
                            size={iconSize}
                            color={iconColor || variantText.color}
                            style={styles.iconRight}
                        />
                    )}
                </View>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    disabled: {
        opacity: 0.6,
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    iconLeft: {
        marginRight: 8,
    },
    iconRight: {
        marginLeft: 8,
    },
    text: {
        fontSize: 14,
        fontFamily: Fonts.serif
    },
});
