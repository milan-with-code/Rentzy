import React, { useState } from 'react';
import {
    View,
    Pressable,
    Text,
    StyleSheet,
    Animated,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts } from '@/constants/theme';

type Props = {
    label?: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    size?: number;
    color?: string;
    containerStyle?: ViewStyle;
    labelStyle?: TextStyle;
    rounded?: boolean | number;
    disabled?: boolean;
};

export default function Checkbox({
    label,
    checked: checkedProp = false,
    onChange,
    size = 22,
    color = '#1D61E7',
    containerStyle,
    labelStyle,
    rounded = 6,
    disabled = false,
}: Props) {
    const [checked, setChecked] = useState(checkedProp);

    const handlePress = () => {
        if (disabled) return;
        const newVal = !checked;
        setChecked(newVal);
        onChange && onChange(newVal);
    };

    return (
        <Pressable
            onPress={handlePress}
            style={[styles.wrapper, containerStyle]}
            disabled={disabled}
        >
            <Animated.View
                style={[
                    styles.box,
                    {
                        width: size,
                        height: size,
                        borderRadius: typeof rounded === 'boolean' ? (rounded ? 999 : 4) : rounded,
                        borderColor: checked ? color : '#cbd5e1',
                        backgroundColor: checked ? color : '#fff',
                        opacity: disabled ? 0.6 : 1,
                    },
                ]}
            >
                {checked && (
                    <Ionicons name="checkmark" size={size * 0.7} color="#fff" />
                )}
            </Animated.View>

            {label ? (
                <Text style={[styles.label, labelStyle]}>
                    {label}
                </Text>
            ) : null}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    box: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.8,
    },
    label: {
        fontSize: 12,
        fontFamily: Fonts.serif,
        color: Colors.nevada,
        lineHeight: 18,
    },
});
