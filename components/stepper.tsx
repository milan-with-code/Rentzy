import { View, Text, StyleSheet } from "react-native";

type StepperProps = {
    total: number;
    current: number;
};

export default function Stepper({ total, current }: StepperProps) {
    return (
        <View style={styles.container}>
            {[...Array(total)].map((_, index) => {
                const active = index + 1 === current;
                return (
                    <View key={index} style={styles.stepWrapper}>
                        <View
                            style={[
                                styles.circle,
                                { backgroundColor: active ? "#4CAF50" : "#E0E0E0" },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.number,
                                    { color: active ? "white" : "#555" },
                                ]}
                            >
                                {index + 1}
                            </Text>
                        </View>

                        {index < total - 1 && <View style={styles.line} />}
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 20,
    },
    stepWrapper: {
        flexDirection: "row",
        alignItems: "center",
    },
    circle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    number: {
        fontWeight: "700",
    },
    line: {
        width: 40,
        height: 2,
        backgroundColor: "#CFCFCF",
        marginHorizontal: 5,
    },
});
