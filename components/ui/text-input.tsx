import React, { useState } from 'react';
import {
    View,
    TextInput,
    Text,
    Pressable,
    StyleSheet,
    ViewStyle,
    TextStyle,
    TextInputProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts } from '@/constants/theme';
import { ThemedText } from '../themed-text';

type Props = TextInputProps & {
    label?: string;
    iconLeft?: keyof typeof Ionicons.glyphMap;
    iconRight?: keyof typeof Ionicons.glyphMap;
    secure?: boolean;
    error?: string;
    helperText?: string;
    containerStyle?: ViewStyle;
    inputStyle?: TextStyle;
    onRightIconPress?: () => void;
};

export default function Input({
    label,
    iconLeft,
    iconRight,
    secure = false,
    error,
    helperText,
    containerStyle,
    inputStyle,
    onRightIconPress,
    ...props
}: Props) {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(!secure);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const toggleSecure = () => setShowPassword(prev => !prev);

    return (
        <View style={[styles.container, containerStyle]}>
            {label && <ThemedText style={styles.label}>{label}</ThemedText>}

            <View
                style={[
                    styles.inputWrapper,
                    {

                        borderColor: error
                            ? '#ef4444'
                            : isFocused
                                ? '#1D61E7'
                                : Colors.athensGrayLight,
                    },
                ]}
            >
                {iconLeft && (
                    <Ionicons
                        name={iconLeft}
                        size={20}
                        color={isFocused ? '#1D61E7' : '#9ca3af'}
                        style={styles.iconLeft}
                    />
                )}

                <TextInput
                    {...props}
                    style={[
                        styles.input,
                        inputStyle,
                        { paddingLeft: iconLeft ? 36 : 14, paddingRight: secure || iconRight ? 36 : 14 },
                    ]}
                    placeholderTextColor={Colors.nevada}
                    secureTextEntry={!showPassword && secure}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />

                {secure && (
                    <Pressable onPress={toggleSecure} style={styles.iconRight}>
                        <Ionicons
                            name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                            size={20}
                            color="#9ca3af"
                        />
                    </Pressable>
                )}

                {!secure && iconRight && (
                    <Pressable onPress={onRightIconPress} style={styles.iconRight}>
                        <Ionicons name={iconRight} size={20} color={isFocused ? '#1D61E7' : '#9ca3af'} />
                    </Pressable>
                )}
            </View>

            {error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : helperText ? (
                <Text style={styles.helperText}>{helperText}</Text>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 16,
    },
    label: {
        fontFamily: Fonts.serif,
        color: Colors.nevada,
        marginBottom: 3,
        fontSize: 12,
        lineHeight: 19,
        letterSpacing: -0.24,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.2,
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        fontSize: 14,
        letterSpacing: -0.01 * 14,
        color: Colors.shark,
        height: 46,
        fontFamily: Fonts.sans,
    },
    iconLeft: {
        position: 'absolute',
        left: 10,
    },
    iconRight: {
        position: 'absolute',
        right: 10,
    },
    errorText: {
        color: '#ef4444',
        fontSize: 12,
        marginTop: 4,
    },
    helperText: {
        color: '#6b7280',
        fontSize: 12,
        marginTop: 4,
    },
});
