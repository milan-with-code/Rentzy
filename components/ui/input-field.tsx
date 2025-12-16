import { View, Text, TextInput, StyleSheet, ViewStyle } from "react-native";
import { Fonts } from "@/constants/theme";

type InputFieldProps = {
    label?: string;
    placeholder?: string;
    containerStyle?: ViewStyle | ViewStyle[];
} & React.ComponentProps<typeof TextInput>;

export default function InputField({
    label,
    containerStyle,
    ...rest
}: InputFieldProps) {
    return (
        <View style={[styles.wrapper, containerStyle]}>
            {label &&
                <Text style={styles.label}>{label}</Text>
            }

            <TextInput
                style={styles.input}
                placeholderTextColor="#A0A0A0"
                {...rest}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 16,
    },

    label: {
        fontSize: 14,
        fontFamily: Fonts.sans,
        color: "#333",
        marginBottom: 6,
    },

    input: {
        height: 48,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 10,
        paddingHorizontal: 12,
        backgroundColor: "#FAFAFA",
        fontFamily: Fonts.sans,
        color: "#1A1A1A",
        fontSize: 15,
    },
});
