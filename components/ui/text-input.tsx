import React, { useState } from "react";
import {
    View,
    TextInput,
    Text,
    Pressable,
    StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Fonts } from "@/constants/theme";
import { ThemedText } from "../themed-text";
import { InputProps } from "@/types/tag";

export default function Input({
    label,
    iconLeft,
    iconRight,
    secure = false,
    error,
    helperText,
    containerStyle,
    inputStyle,
    onRightIconPress,
    variant = "default",
    value,
    onChangeText,
    ...props
}: InputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(!secure);

    const showClear = variant === "search" && !!value;

    return (
        <View style={[styles.container, containerStyle]}>
            {label && <ThemedText style={styles.label}>{label}</ThemedText>}

            <View
                style={[
                    styles.inputWrapper,
                    {
                        borderColor: error
                            ? "#ef4444"
                            : isFocused
                                ? "#1D61E7"
                                : Colors.athensGrayLight,
                    },
                ]}
            >
                {(iconLeft || variant === "search") && (
                    <Ionicons
                        name={iconLeft ?? "search-outline"}
                        size={20}
                        color={isFocused ? "#1D61E7" : "#9ca3af"}
                        style={styles.iconLeft}
                    />
                )}

                <TextInput
                    {...props}
                    value={value}
                    onChangeText={onChangeText}
                    style={[
                        styles.input,
                        inputStyle,
                        {
                            paddingLeft: iconLeft || variant === "search" ? 36 : 14,
                            paddingRight: secure || iconRight || showClear ? 36 : 14,
                        },
                    ]}
                    placeholderTextColor={Colors.nevada}
                    secureTextEntry={!showPassword && secure}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />

                {secure && (
                    <Pressable
                        onPress={() => setShowPassword(prev => !prev)}
                        style={styles.iconRight}
                    >
                        <Ionicons
                            name={showPassword ? "eye-outline" : "eye-off-outline"}
                            size={20}
                            color="#9ca3af"
                        />
                    </Pressable>
                )}

                {showClear && (
                    <Pressable
                        onPress={() => onChangeText?.("")}
                        style={styles.iconRight}
                    >
                        <Ionicons name="close-circle" size={18} color="#9ca3af" />
                    </Pressable>
                )}

                {!secure && !showClear && iconRight && (
                    <Pressable onPress={onRightIconPress} style={styles.iconRight}>
                        <Ionicons
                            name={iconRight}
                            size={20}
                            color={isFocused ? "#1D61E7" : "#9ca3af"}
                        />
                    </Pressable>
                )}
            </View>

            {error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : helperText ? (
                <Text style={styles.helperText}>{helperText}</Text>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginBottom: 16,
    },
    label: {
        fontFamily: Fonts.serif,
        color: Colors.nevada,
        marginBottom: 3,
        fontSize: 12,
        lineHeight: 19,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1.2,
        borderRadius: 10,
        backgroundColor: "#fff",
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: Colors.shark,
        height: 46,
        fontFamily: Fonts.sans,
    },
    iconLeft: {
        position: "absolute",
        left: 10,
    },
    iconRight: {
        position: "absolute",
        right: 10,
    },
    errorText: {
        color: "#ef4444",
        fontSize: 12,
        marginTop: 4,
    },
    helperText: {
        color: "#6b7280",
        fontSize: 12,
        marginTop: 4,
    },
});
