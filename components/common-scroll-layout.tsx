import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import type { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedRef } from 'react-native-reanimated';

type Props = PropsWithChildren<{}>;

export default function CommonScrollLayout({ children }: Props) {
    const backgroundColor = useThemeColor({}, 'background');
    const scrollRef = useAnimatedRef<Animated.ScrollView>();

    return (
        <Animated.ScrollView
            ref={scrollRef}
            style={[styles.container, { backgroundColor }]}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
        >
            <ThemedView style={styles.content}>{children}</ThemedView>
        </Animated.ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingVertical: 32,
        paddingHorizontal: 24,
        overflow: 'hidden',
    },
});
