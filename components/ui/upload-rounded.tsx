import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    GestureResponderEvent,
    ViewStyle,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { Fonts } from "@/constants/theme";

type UploadRoundedProps = {
    value?: string | null;
    onChange: (uri: string | null) => void;
    size?: number;
    name?: string;
    allowCamera?: boolean;
    borderColor?: string;
    backgroundColor?: string;
    placeholderColor?: string;
    containerStyle?: ViewStyle;
};

export default function UploadRounded({
    value,
    onChange,
    size = 72,
    name = "",
    allowCamera = false,
    borderColor = "#E6E6E6",
    backgroundColor = "#F3F6FB",
    placeholderColor = "#64748B",
    containerStyle,
}: UploadRoundedProps) {
    const [loading, setLoading] = useState(false);

    const initials = (n: string) => {
        if (!n) return "?";
        const parts = n.trim().split(" ");
        if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
        return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    };

    const pickFromGallery = async () => {
        try {
            setLoading(true);
            const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permission.granted) {
                alert("Please allow gallery access to upload image.");
                setLoading(false);
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images', 'videos'],
                quality: 0.7,
                allowsEditing: true,
                aspect: [1, 1],
            });

            if (!result.canceled) {
                onChange(result.assets[0].uri);
            }
        } catch (err) {
            console.warn("pickFromGallery error", err);
        } finally {
            setLoading(false);
        }
    };

    const takePhoto = async () => {
        try {
            setLoading(true);

            const permission = await ImagePicker.requestCameraPermissionsAsync();
            if (!permission.granted) {
                alert("Please allow camera access.");
                setLoading(false);
                return;
            }

            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ['images', 'videos', 'livePhotos'],
                allowsEditing: true,
                quality: 0.8,
                aspect: [1, 1],
            });


            if (!result.canceled) {
                const uri = result.assets[0].uri;
                onChange(uri);
            }
        } catch (e) {
            console.log("Camera error", e);
        } finally {
            setLoading(false);
        }
    };

    const handlePress = (e: GestureResponderEvent) => {
        pickFromGallery();
    };

    const handleLongPress = () => {
        if (allowCamera) takePhoto();
    };

    return (
        <View style={[styles.wrapper, { width: size, height: size }, containerStyle]}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={handlePress}
                onLongPress={handleLongPress}
                style={[
                    styles.avatar,
                    {
                        width: size,
                        height: size,
                        borderRadius: size / 2,
                        backgroundColor,
                        borderColor,
                    },
                ]}
            >
                {loading ? (
                    <ActivityIndicator />
                ) : value ? (
                    <Image source={{ uri: value }} style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]} />
                ) : (
                    <View style={[styles.placeholder, { width: size, height: size }]}>
                        <Text style={[styles.initials, { color: placeholderColor, fontSize: Math.round(size / 2.8) }]}>
                            {initials(name)}
                        </Text>
                    </View>
                )}
                {
                    !value &&
                    <View style={[styles.editIcon, { right: Math.max(4, size * 0.06), bottom: Math.max(4, size * 0.06) }]}>
                        <Ionicons name="pencil" size={Math.round(size * 0.20)} color="#1D61E7" />
                    </View>
                }
            </TouchableOpacity>

            {value ? (
                <TouchableOpacity
                    onPress={() => onChange(null)}
                    style={[styles.removeBtn, { right: -6, top: -6, width: Math.round(size * 0.34), height: Math.round(size * 0.34), borderRadius: Math.round(size * 0.34 / 2) }]}
                >
                    <Ionicons name="close" size={Math.round(size * 0.18)} color="white" />
                </TouchableOpacity>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        position: "relative",
    },
    avatar: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
    },
    placeholder: {
        alignItems: "center",
        justifyContent: "center",
    },
    initials: {
        fontFamily: Fonts.serif,
        fontSize: 24,
        lineHeight: 28,
    },
    image: {
        resizeMode: "cover",
    },
    editIcon: {
        position: "absolute",
        backgroundColor: "rgba(255,255,255,0.9)",
        padding: 2,
        borderRadius: 10,
    },
    removeBtn: {
        position: "absolute",
        backgroundColor: "#EF4444",
        alignItems: "center",
        justifyContent: "center",
        elevation: 4,
        borderWidth: 2,
        borderColor: "white",
    },
});
