import { View, Text, StyleSheet } from "react-native";
import NoFound from "@svg/noFound.svg"
import { Fonts } from "@/constants/theme";

export default function NoFoundFile({ title }: { title: string }) {
    return (
        <View style={styles.container}>
            <NoFound width={220} height={182} />
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },
    title: {
        fontSize: 20,
        fontFamily: Fonts.rounded,
        color: "#667085",
        textAlign: "center",
    },

});
