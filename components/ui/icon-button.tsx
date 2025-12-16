import { Pressable, StyleSheet, ViewStyle } from "react-native";
import * as LucideIcons from "lucide-react-native";

type IconName = keyof typeof LucideIcons;

interface IconButtonProps {
    icon: IconName;
    size?: number;
    color?: string;
    onPress?: () => void;
    style?: ViewStyle;
}

export default function IconButton({
    icon,
    size = 22,
    color = "black",
    onPress,
    style,
}: IconButtonProps) {
    const IconComponent = LucideIcons[icon as keyof typeof LucideIcons] as React.ComponentType<any>;

    return (
        <Pressable style={[styles.container, style]} onPress={onPress}>
            {IconComponent && <IconComponent size={size} color={color} strokeWidth={2} />}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
    },
});
