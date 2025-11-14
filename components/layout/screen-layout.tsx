import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";

interface ScreenLayoutProps {
    title: string;
    children: React.ReactNode;
    showBack?: boolean;
    backgroundColor?: string;
}

export default function ScreenLayout({
    title,
    children,
    showBack = true,
    backgroundColor = "#1D61E7",
}: ScreenLayoutProps) {
    const router = useRouter();

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <View style={styles.headerRow}>
                {showBack && (
                    <TouchableOpacity onPress={() => router.back()} accessibilityRole="button">
                        <IconSymbol name="arrow.back" color="white" size={24} />
                    </TouchableOpacity>
                )}

                <Text style={styles.headerText}>{title}</Text>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.contentContainer}>{children}</View>
            </ScrollView>
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
        marginLeft: 16,
    },
    headerText: {
        fontFamily: Fonts.serif,
        color: "white",
        fontSize: 16,
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
