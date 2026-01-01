import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import ScreenLayout from "@/components/layout/screen-layout";
import InputField from "@/components/ui/input-field";
import Button from "@/components/ui/button";
import Checkbox from "expo-checkbox";
import { Fonts } from "@/constants/theme";
import { router } from "expo-router";

export default function AddResidentScreen() {
    const [aadhaar, setAadhaar] = useState("");
    const [otp, setOtp] = useState("");
    const [verifyWithOtp, setVerifyWithOtp] = useState(false);
    const [withoutAadhaar, setWithoutAadhaar] = useState(false);

    const isSkipDisabled =
        (!withoutAadhaar && aadhaar.length !== 12) ||
        (verifyWithOtp && aadhaar.length === 12 && otp.length !== 6);

    return (
        <ScreenLayout title="Add Resident">
            <View style={styles.container}>
                <View>
                    <View style={styles.checkboxRow}>
                        <Checkbox
                            style={styles.checkbox}
                            value={verifyWithOtp}
                            onValueChange={setVerifyWithOtp}
                            color={verifyWithOtp ? "#1D61E7" : undefined}
                        />
                        <Text style={styles.checkboxText}>Aadhaar Verify With OTP</Text>
                    </View>

                    {verifyWithOtp && !withoutAadhaar && (
                        <InputField
                            value={aadhaar}
                            onChangeText={setAadhaar}
                            placeholder="Aadhaar Number"
                            keyboardType="number-pad"
                            maxLength={12}
                        />
                    )}

                    {verifyWithOtp && aadhaar.length === 12 && !withoutAadhaar && (
                        <InputField
                            value={otp}
                            onChangeText={setOtp}
                            placeholder="Enter OTP"
                            keyboardType="number-pad"
                            maxLength={6}
                        />
                    )}

                    <View style={styles.checkboxRow}>
                        <Checkbox
                            style={styles.checkbox}
                            value={withoutAadhaar}
                            onValueChange={setWithoutAadhaar}
                            color={withoutAadhaar ? "#1D61E7" : undefined}
                        />
                        <Text style={styles.checkboxText}>Without Aadhaar Verify</Text>
                    </View>
                </View>

                <View style={styles.bottomRow}>
                    <View style={styles.flex}>
                        <Button
                            title="Back"
                            variant="secondary"
                            onPress={() => router.back()}
                            fullWidth
                        />
                    </View>
                    <View style={styles.flex}>
                        <Button
                            title="Skip"
                            onPress={() => router.push("/(main)/new-registration")}
                            fullWidth
                            disabled={isSkipDisabled}
                        />
                    </View>
                </View>
            </View>
        </ScreenLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
    },
    checkboxRow: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 12,
        gap: 12,
    },
    checkbox: {
        width: 20,
        height: 20,
    },
    checkboxText: {
        fontSize: 14,
        color: "#333",
        fontFamily: Fonts.sans,
        lineHeight: 20,
    },
    bottomRow: {
        flexDirection: "row",
        gap: 12,
    },
    flex: {
        flex: 1,
    },
});
