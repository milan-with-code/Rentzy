import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { router } from "expo-router";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";
import { ReactNode } from "react";

interface ScreenLayoutProps {
    title: string;
    children: React.ReactNode;
    showBack?: boolean;
    backgroundColor?: string;
    containerStyle?: ViewStyle;
    rightIcon?: {
        name: string;
        onPress: () => void;
        color?: string;
        size?: number;
    };
    headerBottom?: ReactNode;
}

export default function ScreenLayout({
    title,
    children,
    showBack = true,
    backgroundColor = "#1D61E7",
    containerStyle,
    rightIcon,
    headerBottom,
}: ScreenLayoutProps) {

    return (
        <View style={[styles.container, { backgroundColor }, containerStyle]}>
            <View style={styles.headerRow}>
                {showBack && (
                    <TouchableOpacity onPress={() => router.back()} accessibilityRole="button">
                        <IconSymbol name="arrow.back" color="white" size={24} />
                    </TouchableOpacity>
                )}

                <Text style={styles.headerText}>{title}</Text>

                {rightIcon && (
                    <TouchableOpacity onPress={rightIcon.onPress} style={styles.rightIcon} activeOpacity={0.9}>
                        <IconSymbol
                            name={rightIcon.name}
                            size={rightIcon.size || 24}
                            color={rightIcon.color || "white"}
                        />
                    </TouchableOpacity>
                )}
            </View>

            {headerBottom && <View style={styles.headerBottom}>{headerBottom}</View>}

            <View style={styles.contentContainer}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
        marginTop: 50,
        marginHorizontal: 16,
    },
    headerText: {
        fontFamily: Fonts.serif,
        color: "white",
        fontSize: 16,
        flex: 1,
    },
    rightIcon: {
        marginLeft: "auto",
    },
    headerBottom: {
        marginTop: 10,
        marginHorizontal: 16,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: "white",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        padding: 16,
        marginTop: 10,
    },
});
