import { Colors, Fonts } from '@/constants/theme';
import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Pressable,
    StyleSheet,
    Animated,
    LayoutChangeEvent,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { ThemedText } from '../themed-text';

type Props = {
    tabs: any[];
    activeIndex?: number;
    onChange?: (index: number) => void;
    containerStyle?: ViewStyle;
    tabTextStyle?: TextStyle;
    activeTextStyle?: TextStyle;

    showCount?: boolean;
    counts?: number[];
};

export default function Tabs({
    tabs,
    activeIndex: activeIndexProp = 0,
    onChange,
    containerStyle,
    tabTextStyle,
    activeTextStyle,
    showCount = false,
    counts = [],
}: Props) {
    const [layoutWidths, setLayoutWidths] = useState<number[]>([]);
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const [activeIndex, setActiveIndex] = useState<number>(activeIndexProp);

    const indicatorX = useRef(new Animated.Value(0)).current;
    const indicatorWidth = useRef(new Animated.Value(0)).current;



    useEffect(() => {
        moveIndicator(activeIndex);
    }, [layoutWidths, containerWidth, activeIndex]);

    useEffect(() => {
        setActiveIndex(activeIndexProp);
    }, [activeIndexProp]);

    function onTabLayout(index: number, e: LayoutChangeEvent) {
        const w = e.nativeEvent.layout.width;
        setLayoutWidths(prev => {
            const next = [...prev];
            next[index] = w;
            return next;
        });
    }

    function onContainerLayout(e: LayoutChangeEvent) {
        setContainerWidth(e.nativeEvent.layout.width);
    }

    function moveIndicator(index: number) {
        if (!layoutWidths || layoutWidths.length !== tabs.length) return;

        let offset = 0;
        for (let i = 0; i < index; i++) offset += layoutWidths[i] || 0;
        const w = layoutWidths[index] || 0;

        Animated.parallel([
            Animated.spring(indicatorX, {
                toValue: offset,
                useNativeDriver: false,
            }),
            Animated.timing(indicatorWidth, {
                toValue: w,
                duration: 160,
                useNativeDriver: false,
            }),
        ]).start();
    }

    function handlePress(index: number) {
        setActiveIndex(index);
        onChange && onChange(index);
    }

    const defaultWidth = containerWidth && tabs.length ? containerWidth / tabs.length : 0;


    return (
        <View style={[styles.container, containerStyle]} onLayout={onContainerLayout}>
            <Animated.View
                pointerEvents="none"
                style={[
                    styles.indicator,
                    {
                        backgroundColor: 'white',
                        width: defaultWidth,
                        transform: [{ translateX: indicatorX }],
                        borderRadius: 6,
                        marginVertical: 2,
                        marginLeft: activeIndex === tabs.length - 1 ? 0 : 2,
                        marginRight: activeIndex === 0 ? 0 : 2,
                    },
                ]}
            />

            <View style={styles.row}>
                {tabs.map((tab, i) => {
                    const isActive = i === activeIndex;
                    const countValue = counts[i] ?? 0;

                    return (
                        <Pressable
                            key={i}
                            style={({ pressed }) => [
                                styles.tab,
                                { opacity: pressed ? 0.7 : 1 },
                            ]}
                            onPress={() => handlePress(i)}
                            onLayout={e => onTabLayout(i, e)}
                        >
                            <View style={styles.tabInnerRow}>
                                <ThemedText
                                    style={[
                                        styles.tabText,
                                        tabTextStyle,
                                        {
                                            color: isActive ? Colors.portGore : Colors.waterloo,
                                        },
                                        isActive ? activeTextStyle : undefined,
                                    ]}
                                >
                                    {tab}
                                </ThemedText>

                                {showCount && (
                                    <View
                                        style={[
                                            styles.countBadge,
                                            {
                                                backgroundColor: isActive
                                                    ? Colors.athensGray
                                                    : Colors.portGore,
                                            },
                                        ]}
                                    >
                                        <ThemedText style={styles.countText}>
                                            {countValue}
                                        </ThemedText>
                                    </View>
                                )}
                            </View>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        borderRadius: 8,
        backgroundColor: Colors.athensGray,
    },
    indicator: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabInnerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    tabText: {
        fontSize: 14,
        fontFamily: Fonts.serif,
        lineHeight: 20
    },

    countBadge: {
        minWidth: 20,
        height: 20,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    countText: {
        fontSize: 12,
        color: 'white',
        fontFamily: Fonts.serif,
        lineHeight: 16,
    },
});
