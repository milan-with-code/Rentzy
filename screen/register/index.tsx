import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Fonts } from '@/constants/theme';
import StepOne from './steps/step-one';
import StepTwo from './steps/step-two';
import StepThree from './steps/step-three';

const STEP_HEIGHT = 110;

export const steps = [
    { id: 1, title: "Personal info" },
    { id: 2, title: "Social accounts" },
    { id: 3, title: "Payment info" }
];

export default function AnimatedStepWizard() {
    const [current, setCurrent] = useState(0);
    const progress = useRef(new Animated.Value(0)).current;
    const contentY = useRef(new Animated.Value(0)).current;
    const contentHeight = useRef(0);

    const onContentLayout = (e: { nativeEvent: { layout: { height: number } } }) => {
        contentHeight.current = e.nativeEvent.layout.height;
        animateContent(current);
    };

    const animateContent = (stepIndex: number) => {
        const targetY =
            stepIndex * STEP_HEIGHT +
            STEP_HEIGHT / 2 -
            contentHeight.current / 2;

        Animated.timing(contentY, {
            toValue: targetY,
            duration: 350,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: false
        }).start();
    };

    useEffect(() => {
        animateContent(current);
    }, [current]);


    const handleNext = () => setCurrent((p) => Math.min(p + 1, steps.length - 1));
    const handlePrev = () => setCurrent((p) => Math.max(p - 1, 0));

    const filledHeight = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [12, (steps.length - 1) * STEP_HEIGHT + 12],
    });

    const renderContent = () => {
        switch (current) {
            case 0: return <StepOne />;
            case 1: return <StepTwo />;
            case 2: return <StepThree />;
        }
    };

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.container}>

                <View style={styles.leftColumn}>
                    <View style={styles.track} />
                    <Animated.View style={[styles.filledTrack, { height: filledHeight }]} />

                    {steps.map((step, i) => {
                        const stepPos = i / (steps.length - 1);
                        const isDone = i < current;

                        const scale = progress.interpolate({
                            inputRange: [stepPos - 0.2, stepPos, stepPos + 0.2],
                            outputRange: [1, 1.18, 1],
                            extrapolate: 'clamp',
                        });

                        const colorAnim = progress.interpolate({
                            inputRange: [stepPos - 0.2, stepPos, stepPos + 0.2],
                            outputRange: ['#d1d5db', Colors.primary, '#d1d5db'],
                            extrapolate: 'clamp',
                        });

                        const opacity = progress.interpolate({
                            inputRange: [stepPos - 0.25, stepPos, stepPos + 0.25],
                            outputRange: [0.4, 1, 0.4],
                            extrapolate: 'clamp',
                        });

                        const translate = progress.interpolate({
                            inputRange: [stepPos - 0.25, stepPos, stepPos + 0.25],
                            outputRange: [6, 0, -6],
                            extrapolate: 'clamp',
                        });

                        return (
                            <Animated.View
                                key={step.id}
                                style={[
                                    styles.stepWrapper,
                                    { top: i * STEP_HEIGHT },
                                ]}
                            >
                                <Animated.View style={[
                                    styles.circleContainer,
                                    { borderColor: colorAnim, transform: [{ scale }] }
                                ]}>
                                    <Animated.View style={[
                                        styles.circle,
                                        { backgroundColor: colorAnim }
                                    ]}>
                                        <Text style={styles.circleText}>
                                            {isDone ? "✓" : i + 1}
                                        </Text>
                                    </Animated.View>
                                </Animated.View>

                                <Animated.Text style={[
                                    styles.title,
                                    { opacity, transform: [{ translateX: translate }] }
                                ]}>
                                    {step.title}
                                </Animated.Text>
                            </Animated.View>
                        );
                    })}
                </View>

                <View style={{ flex: 1, position: 'relative' }}>
                    <Animated.View
                        onLayout={onContentLayout}
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            transform: [{ translateY: contentY }]
                        }}
                    >
                        {renderContent()}
                    </Animated.View>
                </View>
            </View>

            <View style={styles.controls}>
                <TouchableOpacity
                    onPress={handlePrev}
                    style={[styles.btn, current === 0 && styles.btnDisabled]}
                    disabled={current === 0}
                >
                    <Text style={styles.btnText}>Prev</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleNext}
                    style={[styles.btn, current === steps.length - 1 && styles.btnDisabled]}
                    disabled={current === steps.length - 1}
                >
                    <Text style={styles.btnText}>Next</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#fff' },

    container: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop: 20,
        flex: 1,
    },

    leftColumn: {
        width: 64,
        alignItems: 'center',
        position: 'relative',
    },

    track: {
        position: 'absolute',
        left: 18,
        top: 12,
        width: 2,
        height: '100%',
        backgroundColor: '#e6e7ee',
    },

    filledTrack: {
        position: 'absolute',
        left: 18,
        top: 12,
        width: 2,
        backgroundColor: Colors.primary,
    },

    stepWrapper: {
        position: 'absolute',
        left: 0,
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
    },

    circleContainer: {
        width: 38,
        height: 38,
        borderRadius: 19,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },

    circle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },

    circleText: {
        fontWeight: '700',
        color: '#fff',
    },

    title: {
        fontSize: 14,
        fontFamily: Fonts.sans,
        lineHeight: 20,
        color: '#0D0B26',
    },

    /** NEW: Content perfectly centered vertically */
    contentWrapper: {
        flex: 1,
        paddingLeft: 16,
        justifyContent: 'center',
    },

    controls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 28,
        marginBottom: 20,
    },

    btn: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        backgroundColor: Colors.primary,
    },

    btnDisabled: {
        opacity: 0.35,
    },

    btnText: {
        color: '#fff',
        fontWeight: '700',
    },
});
