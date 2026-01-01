import { View, StyleSheet, Animated } from "react-native";
import { useEffect, useRef } from "react";
import { Colors } from "@/constants/theme";

export default function ExpenseCardSkeleton() {
    const shimmer = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(shimmer, {
                    toValue: 1,
                    duration: 900,
                    useNativeDriver: true,
                }),
                Animated.timing(shimmer, {
                    toValue: 0,
                    duration: 900,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    const opacity = shimmer.interpolate({
        inputRange: [0, 1],
        outputRange: [0.4, 1],
    });

    return (
        <View style={styles.card}>
            {/* Left Icon */}
            <Animated.View
                style={[
                    styles.iconWrapper,
                    styles.skeleton,
                    { opacity },
                ]}
            />

            {/* Content */}
            <View style={styles.content}>
                <Animated.View
                    style={[styles.title, styles.skeleton, { opacity }]}
                />

                <View style={styles.metaRow}>
                    <Animated.View
                        style={[styles.metaSmall, styles.skeleton, { opacity }]}
                    />
                    <Animated.View
                        style={[styles.metaTiny, styles.skeleton, { opacity }]}
                    />
                </View>

                <Animated.View
                    style={[styles.invoice, styles.skeleton, { opacity }]}
                />
            </View>

            {/* Right Section */}
            <View style={styles.rightSection}>
                <Animated.View
                    style={[styles.amount, styles.skeleton, { opacity }]}
                />

                <View style={styles.actions}>
                    <Animated.View
                        style={[styles.actionIcon, styles.skeleton, { opacity }]}
                    />
                    <Animated.View
                        style={[styles.actionIcon, styles.skeleton, { opacity }]}
                    />
                    <Animated.View
                        style={[styles.actionIcon, styles.skeleton, { opacity }]}
                    />
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.athensGray,
        borderRadius: 14,
        padding: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: Colors.athensGrayLight,
    },

    iconWrapper: {
        width: 44,
        height: 44,
        borderRadius: 12,
        marginRight: 12,
    },

    content: {
        flex: 1,
    },

    title: {
        height: 14,
        width: "65%",
        borderRadius: 6,
        marginBottom: 8,
    },

    metaRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    metaSmall: {
        height: 10,
        width: 60,
        borderRadius: 4,
    },

    metaTiny: {
        height: 10,
        width: 80,
        borderRadius: 4,
    },

    invoice: {
        height: 10,
        width: 120,
        borderRadius: 4,
        marginTop: 6,
    },

    rightSection: {
        alignItems: "flex-end",
        marginLeft: 10,
    },

    amount: {
        height: 16,
        width: 70,
        borderRadius: 6,
        marginBottom: 8,
    },

    actions: {
        flexDirection: "row",
        gap: 10,
    },

    actionIcon: {
        width: 18,
        height: 18,
        borderRadius: 4,
    },

    skeleton: {
        backgroundColor: Colors.athensGrayLight,
    },
});
