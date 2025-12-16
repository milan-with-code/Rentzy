import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import { Link } from "expo-router";
import { AxiosError } from "axios";
import { ThemedText } from "@/components/themed-text";
import { authService } from "@/api/auth.service";
import { AuthContext } from "@/context/auth-context";
import { Colors, Fonts } from "@/constants/theme";
import Checkbox from "expo-checkbox";
import CommonScrollLayout from "@/components/common-scroll-layout";
import Button from "@/components/ui/button";
import Input from "@/components/ui/text-input";

export default function LoginScreen() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [checked, setChecked] = useState(false);
    const { setAuthToken } = useContext(AuthContext);

    const loginUser = async () => {
        setIsLoading(true);
        try {
            const res = await authService.login({
                identifier,
                password,
            });
            setAuthToken(res.data.token);
        } catch (e: unknown) {
            const err = e as AxiosError<{ message?: string }>;
            Alert.alert("Login Failed", err.response?.data?.message ?? err.message ?? "Something went wrong");
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <CommonScrollLayout>
            <View style={styles.header}>
                <ThemedText type="defaultTitle">Welcome!</ThemedText>
                <ThemedText type="subtitleText">
                    Create an account or log in to explore our app
                </ThemedText>
            </View>

            <View style={styles.form}>
                <Input
                    value={identifier}
                    placeholder="loisbecket@gmail.com"
                    label="Email"
                    keyboardType="email-address"
                    onChangeText={setIdentifier}
                />
                <Input
                    value={password}
                    placeholder="*******"
                    label="Password"
                    secure
                    onChangeText={setPassword}
                />

                <View style={styles.row}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
                        <Checkbox
                            style={styles.checkbox}
                            value={checked}
                            onValueChange={setChecked}
                        />
                        <Text style={styles.label}>Remember me</Text>
                    </View>
                    <Link
                        href="/forgot-password"
                        style={styles.forgotLink}
                    >
                        Forgot Password?
                    </Link>
                </View>
            </View>

            <Button
                loading={isLoading}
                disabled={!identifier || !password || !checked}
                title="Sign In"
                onPress={loginUser} />


            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8, marginTop: 24 }}>
                <Text style={styles.label}>Don't have an account?</Text>
                <Link href="/(auth)/register">
                    <Text style={[styles.label, { color: Colors.primary }]}>Register</Text>
                </Link>
            </View>
        </CommonScrollLayout>
    );
}

const styles = StyleSheet.create({
    header: {
        marginVertical: 24,
    },
    form: {
        marginBottom: 24,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    forgotLink: {
        color: "#4D81E7",
        fontFamily: Fonts.rounded,
        fontSize: 12,
    },
    checkbox: {
        width: 20,
        height: 20,
    },
    label: {
        fontSize: 12,
        fontFamily: Fonts.serif,
        color: Colors.nevada,
        lineHeight: 18,
    },
});
