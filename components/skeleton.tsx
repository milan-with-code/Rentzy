import { View, StyleSheet, type ViewStyle } from "react-native";

export function Skeleton({ width = 100, height = 16, radius = 6 }: {
    width?: number | string;
    height?: number;
    radius?: number;
}) {
    const dynamicStyle: ViewStyle = { width: width as ViewStyle['width'], height, borderRadius: radius };
    return <View style={[styles.skeleton, dynamicStyle]} />;
}

const styles = StyleSheet.create({
    skeleton: {
        backgroundColor: "#E1E9EE",
        overflow: "hidden"
    }
});
