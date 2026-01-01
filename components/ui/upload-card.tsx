import { useMemo } from "react";
import { View, Text, StyleSheet, Image, Pressable, ViewStyle } from "react-native";
import { Fonts } from "@/constants/theme";
import * as ImagePicker from "expo-image-picker";
import { getValidImagePath } from "@/utils/convert";
import { UploadFile } from "@/types/expenses";

type UploadCardProps = {
    label: string;
    value?: string | null;
    onChange: (value: UploadFile) => void;
    containerStyle?: ViewStyle;
};

export default function UploadCard({ label, value, onChange, containerStyle }: UploadCardProps) {

    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            alert("Please allow gallery access to upload images.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets?.length) {
            const asset = result.assets[0];

            onChange({
                uri: asset.uri ?? "",
                name: asset.fileName ?? "upload",
                type: asset.mimeType ?? "image",
            });
        }
    };

    const imgValue = useMemo(() => {
        return getValidImagePath(value);
    }, [value])

    return (
        <View style={[styles.wrapper, containerStyle]}>
            <Text style={styles.label}>{label}</Text>

            <Pressable style={styles.uploadBox} onPress={pickImage}>
                {value ? (
                    <Image source={{ uri: imgValue ?? "" }} style={styles.preview} />
                ) : (
                    <Text style={styles.placeholder}>Tap to upload</Text>
                )}
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: { marginBottom: 16 },
    label: {
        fontSize: 14,
        fontFamily: Fonts.sans,
        color: "#333",
        marginBottom: 6,
    },
    uploadBox: {
        height: 120,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 12,
        backgroundColor: "#FAFAFA",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    placeholder: {
        fontFamily: Fonts.sans,
        fontSize: 14,
        color: "#999",
    },
    preview: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
});
