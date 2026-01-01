import { Fonts } from "@/constants/theme";
import { WheelColumnProps } from "@/types";
import { useEffect, useRef } from "react";
import { Animated, ScrollView, StyleSheet, Text, View } from "react-native";

export const ITEM_HEIGHT = 40;
export const VISIBLE_ITEMS = 5;

export function WheelColumn({
    data,
    selectedIndex,
    onChange,
}: WheelColumnProps) {
    const scrollRef = useRef<ScrollView | null>(null);

    useEffect(() => {
        scrollRef.current?.scrollTo({
            y: selectedIndex * ITEM_HEIGHT,
            animated: false,
        });
    }, [selectedIndex]);

    const handleScrollEnd = (y: number) => {
        const index = Math.round(y / ITEM_HEIGHT);
        onChange(index);
    };

    return (
        <View style={styles.wheel}>
            <Animated.ScrollView
                ref={scrollRef}
                showsVerticalScrollIndicator={false}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                scrollEventThrottle={16}
                contentContainerStyle={{
                    paddingVertical: ITEM_HEIGHT * 2,
                }}
                onMomentumScrollEnd={(e) =>
                    handleScrollEnd(e.nativeEvent.contentOffset.y)
                }
                onScrollEndDrag={(e) =>
                    handleScrollEnd(e.nativeEvent.contentOffset.y)
                }
            >
                {data.map((item, index) => (
                    <View key={index} style={styles.item}>
                        <Text
                            style={[
                                styles.text,
                                index === selectedIndex && styles.activeText,
                            ]}
                        >
                            {item}
                        </Text>
                    </View>
                ))}
            </Animated.ScrollView>

            <View style={styles.centerHighlight} />
        </View>
    );
}


const styles = StyleSheet.create({
    wheel: {
        height: ITEM_HEIGHT * VISIBLE_ITEMS,
        width: 100,
        alignItems: "center",
        overflow: "hidden",
    },

    item: {
        height: ITEM_HEIGHT,
        justifyContent: "center",
        alignItems: "center",
    },

    text: {
        fontSize: 14,
        fontFamily: Fonts.sans,
        color: "#B0B0B0",
    },

    activeText: {
        fontSize: 16,
        fontFamily: Fonts.sans,
        color: "#000",
        fontWeight: "600",
    },

    centerHighlight: {
        position: "absolute",
        top: ITEM_HEIGHT * 2,
        height: ITEM_HEIGHT,
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.03)",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#DADADA",
    },
})
