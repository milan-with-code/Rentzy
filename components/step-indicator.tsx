import { View, Text, StyleSheet, Animated } from "react-native";
import { Fonts } from "@/constants/theme";
import { useEffect, useRef } from "react";

type StepIndicatorProps = {
    totalSteps: number;
    currentStep: number;
    labels: string[]; // 👈 LABELS ADDED
};

export default function StepIndicator({ totalSteps, currentStep, labels }: StepIndicatorProps) {
    const animatedValues = useRef([...Array(totalSteps - 1)].map(() => new Animated.Value(0))).current;

    useEffect(() => {
        animatedValues.forEach((val, idx) => {
            Animated.timing(val, {
                toValue: idx < currentStep - 1 ? 1 : 0,
                duration: 300,
                useNativeDriver: false,
            }).start();
        });
    }, [currentStep]);

    return (
        <View style={styles.container}>
            {Array.from({ length: totalSteps }, (_, index) => {
                const stepNum = index + 1;
                const isActive = stepNum <= currentStep;

                return (
                    <View key={index} style={styles.stepItem}>
                        <View style={[styles.circle, isActive && styles.activeCircle]}>
                            <Text style={[styles.circleText, isActive && styles.activeText]}>
                                {stepNum}
                            </Text>
                        </View>

                        <Text style={[styles.label, isActive && styles.activeLabel]}>
                            {labels[index]}
                        </Text>

                        {stepNum < totalSteps && (
                            <Animated.View
                                style={[
                                    styles.line,
                                    {
                                        backgroundColor: animatedValues[index].interpolate({
                                            inputRange: [0, 1],
                                            outputRange: ["#ccc", "#1D61E7"],
                                        }),
                                    },
                                ]}
                            />
                        )}
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    stepItem: {
        flex: 1,
        alignItems: "center",
    },

    circle: {
        width: 26,
        height: 26,
        borderRadius: 13,
        borderWidth: 2,
        borderColor: "#ccc",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    activeCircle: {
        borderColor: "#1D61E7",
        backgroundColor: "#1D61E7",
    },

    circleText: {
        fontSize: 12,
        color: "#ccc",
        fontFamily: Fonts.serif,
        lineHeight: 16,
    },
    activeText: {
        color: "#fff",
    },

    label: {
        marginTop: 6,
        fontSize: 11,
        color: "#94A3B8",
        fontFamily: Fonts.serif,
        textAlign: "center",
        width: 80,
        lineHeight: 14,
    },
    activeLabel: {
        color: "#1D61E7",
        fontWeight: "600",
    },

    line: {
        position: "absolute",
        top: 13,
        right: -50,
        width: 80,
        height: 2,
    },
});
