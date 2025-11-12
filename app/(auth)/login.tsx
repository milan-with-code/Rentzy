import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Link } from "expo-router";

import CommonScrollLayout from "@/components/common-scroll-layout";
import { ThemedText } from "@/components/themed-text";
import Input from "@/components/ui/text-input";
import Checkbox from "@/components/ui/checkbox";
import { Fonts } from "@/constants/theme";
import Button from "@/components/ui/button";

export default function LoginPage() {
    const [checked, setChecked] = useState(false);

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
                    placeholder="loisbecket@gmail.com"
                    label="Email"
                    keyboardType="email-address"
                />
                <Input
                    placeholder="*******"
                    label="Password"
                    secure
                />

                <View style={styles.row}>
                    <Checkbox
                        checked={checked}
                        onChange={setChecked}
                        label="Remember me"
                    />
                    <Link
                        href="/forgot-password"
                        style={styles.forgotLink}
                    >
                        Forgot Password?
                    </Link>
                </View>
            </View>

            <Button title="Log In" onPress={() => console.log("Login")} />

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
});
