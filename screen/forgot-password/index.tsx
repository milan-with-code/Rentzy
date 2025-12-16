import { useState } from "react";
import { router } from "expo-router";
import { Pressable, Text, View, StyleSheet, Alert } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors, Fonts } from "@/constants/theme";
import Input from "@/components/ui/text-input";
import Button from "@/components/ui/button";
import { authService } from "@/api/auth.service";
import { AxiosError } from "axios";
import BackButton from "@/components/ui/back-button";

export default function ForgotPasswordScreen() {
    const [mobile, setMobile] = useState("");

    async function handleSendOTP() {
        try {
            const res = await authService.sendForgotOTP(mobile);
        } catch (e: unknown) {
            const err = e as AxiosError<{ message?: string }>;
            Alert.alert("Login Failed", err.response?.data?.message ?? err.message ?? "Something went wrong");
        }
    }

    return (
        <View style={styles.container}>

            <BackButton />

            <View style={styles.header}>
                <Text style={styles.title}>Forgot Password</Text>
                <Text style={styles.subtitle}>
                    Enter your registered mobile number to receive an OTP
                </Text>
            </View>

            <View style={styles.form}>
                <Input
                    placeholder="Enter Mobile Number"
                    label="Mobile Number"
                    value={mobile}
                    keyboardType="phone-pad"
                    onChangeText={setMobile}
                />
            </View>

            <View style={styles.footer}>
                <Button
                    title="Send OTP"
                    disabled={!mobile}
                    onPress={handleSendOTP}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 16,
        paddingTop: 45,
    },

    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
    },

    header: {
        marginTop: 24,
        gap: 6,
    },

    title: {
        fontSize: 22,
        fontFamily: Fonts.rounded,
        color: "#000",
    },

    subtitle: {
        fontSize: 14,
        fontFamily: Fonts.serif,
        color: Colors.nevada || "#707070",
        lineHeight: 20,
        marginTop: 2,
    },

    form: {
        marginTop: 32,
    },

    footer: {
        position: "absolute",
        bottom: 16,
        left: 16,
        right: 16,
    },
});
