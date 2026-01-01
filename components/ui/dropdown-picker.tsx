import { Fonts } from "@/constants/theme";
import React, { useEffect } from "react";
import {
    Text,
    FlatList,
    StyleSheet,
    ViewStyle,
    TextStyle,
    ListRenderItem,
    View,
    Pressable,
} from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
    interpolate,
} from "react-native-reanimated";

export type DropdownItem = {
    id: string | number;
    label: string;
    value: any;
    [key: string]: any;
};

type DropdownProps<T extends DropdownItem> = {
    isOpen: boolean;
    setIsOpen: (v: boolean) => void;
    data: T[];
    selected?: T | null;
    placeholder?: string;
    renderItem: ListRenderItem<T>;
    containerStyle?: ViewStyle;
    triggerStyle?: ViewStyle;
    triggerTextStyle?: TextStyle;
    dropdownStyle?: ViewStyle;
    icon?: React.ReactNode;
    maxHeight?: number;
    animationDuration?: number;
};

const DropdownPicker = <T extends DropdownItem>({
    isOpen,
    setIsOpen,
    data,
    selected,
    placeholder = "Select...",
    renderItem,
    containerStyle,
    triggerStyle,
    triggerTextStyle,
    dropdownStyle,
    icon,
    maxHeight = 250,
    animationDuration = 250,
}: DropdownProps<T>) => {
    const progress = useSharedValue(0);

    useEffect(() => {
        progress.value = withTiming(isOpen ? 1 : 0, {
            duration: animationDuration,
            easing: Easing.out(Easing.cubic),
        });
    }, [isOpen]);

    const dropdownAnimated = useAnimatedStyle(() => {
        const opacity = interpolate(progress.value, [0, 1], [0, 1]);
        const translateY = interpolate(progress.value, [0, 1], [-10, 0]);
        return { opacity, transform: [{ translateY }] };
    });

    const rotateIcon = useAnimatedStyle(() => ({
        transform: [
            {
                rotate: `${interpolate(progress.value, [0, 1], [0, 180])}deg`,
            },
        ],
    }));

    return (
        <View style={[styles.wrapper, containerStyle]}>
            <Pressable
                style={[styles.trigger, triggerStyle]}
                onPress={() => setIsOpen(!isOpen)}
            >
                <Text style={[styles.triggerText, triggerTextStyle]} numberOfLines={1}>
                    {selected ? selected.label : placeholder}
                </Text>
                <Animated.View style={rotateIcon}>{icon}</Animated.View>
            </Pressable>

            {isOpen && (
                <Animated.View
                    style={[
                        styles.dropdown,
                        { maxHeight },
                        dropdownStyle,
                        dropdownAnimated,
                    ]}
                >
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item) => String(item.id)}
                        showsVerticalScrollIndicator={true}
                        keyboardShouldPersistTaps="handled"
                        scrollEnabled={false}
                        ListEmptyComponent={
                            <Text style={styles.empty}>No items available</Text>
                        }
                    />
                </Animated.View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: "relative",
        zIndex: 10,
    },

    trigger: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 12,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#D1D1D1",

        borderRadius: 8,

    },

    triggerText: {
        fontSize: 12,
        fontFamily: Fonts.serif,
        color: "#313144",
        lineHeight: 18,
    },

    dropdown: {
        position: "absolute",
        top: 46,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        zIndex: 20,

        borderWidth: 1,
        borderColor: "#D1D1D1",

        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },

    empty: {
        textAlign: "center",
        color: "#aaa",
        paddingVertical: 15,
    },
});

export default DropdownPicker;
