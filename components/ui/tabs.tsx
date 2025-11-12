import { Colors, Fonts } from '@/constants/theme';
import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    Animated,
    LayoutChangeEvent,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { ThemedText } from '../themed-text';

type Tab = { key: string; title: string };


type Props = {
    tabs: Tab[];
    activeIndex?: number;
    onChange?: (index: number) => void;
    containerStyle?: ViewStyle;
    tabTextStyle?: TextStyle;
    activeTextStyle?: TextStyle;
};



export default function Tabs({
    tabs,
    activeIndex: activeIndexProp = 0,
    onChange,
    containerStyle,
    tabTextStyle,
    activeTextStyle,
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
                bounciness: 8,
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
        <View
            style={[styles.container, containerStyle]}
            onLayout={onContainerLayout}
        >
            <Animated.View
                pointerEvents="none"
                style={[
                    styles.indicator,
                    {
                        backgroundColor: "white",
                        width: layoutWidths.length === tabs.length ? indicatorWidth : defaultWidth,
                        transform: [
                            {
                                translateX: indicatorX,
                            },
                        ],
                        borderRadius: 6,
                        margin: 2
                    },
                ]}
            />

            <View style={styles.row}>
                {tabs.map((tab, i) => {
                    const isActive = i === activeIndex;
                    return (
                        <Pressable
                            key={tab.key}
                            style={({ pressed }) => [
                                styles.tab,
                                { opacity: pressed ? 0.7 : 1 },
                            ]}
                            onPress={() => handlePress(i)}
                            onLayout={e => onTabLayout(i, e)}
                            accessibilityRole="tab"
                            accessibilityState={{ selected: isActive }}
                            accessibilityLabel={tab.title}
                        >

                            <ThemedText
                                style={[
                                    styles.tabText,
                                    tabTextStyle,
                                    { color: isActive ? Colors.portGore : Colors.waterloo },
                                    isActive ? activeTextStyle : undefined,
                                ]}>
                                {tab.title}
                            </ThemedText>
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
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabText: {
        fontSize: 14,
        fontFamily: Fonts.serif,
    },
});
