import { Modal, View, Text, StyleSheet } from "react-native";
import { Fonts } from "@/constants/theme";
import Button from "./button"; // Your theme button

type ConfirmModalProps = {
    visible: boolean;
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
};

export default function ConfirmModal({
    visible,
    title = "Confirm",
    message = "Are you sure?",
    confirmText = "Yes",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
}: ConfirmModalProps) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
        >
            <View style={styles.overlay}>
                <View style={styles.modalBox}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>

                    <View style={styles.row}>
                        <Button
                            title={cancelText}
                            variant="secondary"
                            onPress={onCancel}
                            style={{ flex: 1 }}
                        />
                        <Button
                            title={confirmText}
                            variant="primary"
                            onPress={onConfirm}
                            style={{ flex: 1 }}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.35)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalBox: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
        elevation: 5,
    },
    title: {
        fontFamily: Fonts.serif,
        fontSize: 18,
        color: "#222",
    },
    message: {
        fontFamily: Fonts.sans,
        fontSize: 14,
        color: "#555",
        marginTop: 8,
        marginBottom: 18,
    },
    row: {
        flexDirection: "row",
        gap: 12,
    },
});
