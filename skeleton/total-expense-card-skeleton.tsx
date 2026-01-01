import { View, StyleSheet, Animated } from "react-native";
import { useEffect, useRef } from "react";

export default function TotalExpenseCardSkeleton() {
    const shimmer = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(shimmer, {
                    toValue: 1,
                    duration: 900,
                    useNativeDriver: false,
                }),
                Animated.timing(shimmer, {
                    toValue: 0,
                    duration: 900,
                    useNativeDriver: false,
                }),
            ])
        ).start();
    }, []);

    const backgroundColor = shimmer.interpolate({
        inputRange: [0, 1],
        outputRange: ["#E5E7EB", "#F3F4F6"],
    });

    return (
        <View style={styles.card}>
            <Animated.View
                style={[styles.iconBox, { backgroundColor }]}
            />

            <View style={styles.content}>
                <Animated.View
                    style={[styles.lineSmall, { backgroundColor }]}
                />
                <Animated.View
                    style={[styles.lineLarge, { backgroundColor }]}
                />
            </View>

            <Animated.View
                style={[styles.rightIcon, { backgroundColor }]}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 14,
        elevation: 2,
    },
    iconBox: {
        width: 42,
        height: 42,
        borderRadius: 12,
        marginRight: 12,
    },
    content: {
        flex: 1,
    },
    lineSmall: {
        width: 90,
        height: 10,
        borderRadius: 6,
        marginBottom: 8,
    },
    lineLarge: {
        width: 140,
        height: 18,
        borderRadius: 8,
    },
    rightIcon: {
        width: 20,
        height: 20,
        borderRadius: 10,
    },
});
