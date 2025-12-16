import { Ionicons } from "@expo/vector-icons";

export type InputVariant = "default" | "search";

export type InputProps = TextInputProps & {
    label?: string;
    iconLeft?: keyof typeof Ionicons.glyphMap;
    iconRight?: keyof typeof Ionicons.glyphMap;
    secure?: boolean;
    error?: string;
    helperText?: string;
    containerStyle?: ViewStyle;
    inputStyle?: TextStyle;
    onRightIconPress?: () => void;

    variant?: "default" | "search";
};
