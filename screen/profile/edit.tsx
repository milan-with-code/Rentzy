import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import ScreenLayout from "@/components/layout/screen-layout";
import Button from "@/components/ui/button";
import InputField from "@/components/ui/input-field";
import UploadCard from "@/components/ui/upload-card";
import { useUserStore } from "@/store/useUserStore";

export default function EditProfileScreen() {
    const { user, updateMyProfile } = useUserStore();
    const [pgName, setPgName] = useState("");
    const [contact1, setContact1] = useState("");
    const [address, setAddress] = useState("");
    const [gstin, setGstin] = useState("");
    const [expiry, setExpiry] = useState("");
    const [upiName, setUpiName] = useState("");
    const [upiId, setUpiId] = useState("");
    const [logoImage, setLogoImage] = useState<string | null>(null);
    const [qrCodeImage, setQrCodeImage] = useState<string | null>(null);
    const [signatureImage, setSignatureImage] = useState<string | null>(null);

    useEffect(() => {
        if (!user?.property) return;
        setPgName(user.property.propertyName ?? "");
        setContact1(user.phone ?? "");
        setAddress(user.property.address ?? "");
    }, [user]);

    const handleCancel = () => {
        setPgName("");
        setContact1("");
        setAddress("");
        setGstin("");
        setExpiry("");
        setUpiName("");
        setUpiId("");
        setLogoImage(null);
        router.back();
    };

    const handleUpdateProfile = async () => {
        const response = await updateMyProfile({
            phone: contact1,
            address,
            pgName,
            gstin,
            expiry,
            upiName,
            upiId, logoImage,
            qrCodeImage,
            signatureImage,
        });
        if (response) {
            Alert.alert("Success", "Profile updated successfully");
            router.back();
        } else {
            Alert.alert("Error", "Failed to update profile");
        }
    }

    return (
        <ScreenLayout title="Edit Profile">
            <ScrollView style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}>
                <View style={styles.formWrapper}>
                    <View style={styles.row}>
                        <InputField
                            label="PG Name"
                            value={pgName}
                            onChangeText={setPgName}
                            containerStyle={styles.col}
                        />
                        <InputField
                            label="Contact 1"
                            value={contact1}
                            onChangeText={setContact1}
                            keyboardType="phone-pad"
                            containerStyle={styles.col}
                        />
                    </View>

                    <InputField
                        label="Address"
                        value={address}
                        onChangeText={setAddress}
                        placeholder="Enter address"
                    />

                    <View style={styles.row}>
                        <InputField
                            label="GSTIN"
                            value={gstin}
                            onChangeText={setGstin}
                            containerStyle={styles.col}
                        />
                        <InputField
                            label="Expiry Time"
                            value={expiry}
                            onChangeText={setExpiry}
                            keyboardType="numeric"
                            containerStyle={styles.col}
                        />
                    </View>

                    <UploadCard
                        label="Upload Logo"
                        value={logoImage}
                        onChange={setLogoImage}
                    />

                    <View style={styles.row}>
                        <InputField
                            label="UPI Register Name"
                            value={upiName}
                            onChangeText={setUpiName}
                            placeholder="Enter UPI Holder Name"
                            containerStyle={styles.col}
                        />
                        <InputField
                            label="UPI ID"
                            value={upiId}
                            onChangeText={setUpiId}
                            placeholder="example@upi"
                            autoCapitalize="none"
                            containerStyle={styles.col}
                        />
                    </View>

                    <View style={styles.row}>
                        <UploadCard
                            label="Upload QR Code"
                            value={qrCodeImage}
                            onChange={setQrCodeImage}
                            containerStyle={styles.col}
                        />
                        <UploadCard
                            label="Upload Signature"
                            value={signatureImage}
                            onChange={setSignatureImage}
                            containerStyle={styles.col}
                        />
                    </View>

                </View>
            </ScrollView>
            <View style={styles.bottomActions}>
                <View style={styles.col}>
                    <Button title="Cancel" variant="secondary" onPress={handleCancel} />
                </View>
                <View style={styles.col}>
                    <Button title="Update" onPress={handleUpdateProfile} />
                </View>
            </View>
        </ScreenLayout>
    );
}

const styles = StyleSheet.create({
    formWrapper: {
        marginBottom: 82,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    row: {
        flexDirection: "row",
        gap: 12,
    },
    col: {
        flex: 1,
    },
    bottomActions: {
        position: "absolute",
        bottom: 20,
        left: 16,
        right: 16,
        backgroundColor: "white",
        flexDirection: "row",
        gap: 12,
        paddingTop: 20,
    },
});
