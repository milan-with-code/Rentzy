import { Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { IconSymbol } from "./icon-symbol";

export default function BackButton({ onPress }: { onPress?: () => void }) {
    const router = useRouter();

    const handlePress = () => {
        if (onPress) return onPress();
        router.back();
    };

    return (
        <Pressable style={styles.backBtn} onPress={handlePress}>
            <IconSymbol name="arrow.back.icon" size={24} color="black" />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
    },
});
