import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors, Fonts } from "@/constants/theme";

type Props = {
    visible: boolean;
    onCancel: () => void;
    onConfirm: () => void;
};

export default function DeleteExpenseModal({
    visible,
    onCancel,
    onConfirm,
}: Props) {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Delete Expense</Text>
                    <Text style={styles.message}>
                        Are you sure you want to delete this expense?
                        This action cannot be undone.
                    </Text>

                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.deleteBtn} onPress={onConfirm}>
                            <Text style={styles.deleteText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.35)",
        justifyContent: "center",
        alignItems: "center",
    },

    container: {
        width: "86%",
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: Colors.athensGrayLight,
    },

    title: {
        fontFamily: Fonts.rounded,
        fontSize: 16,
        color: Colors.portGore,
        marginBottom: 6,
    },

    message: {
        fontFamily: Fonts.sans,
        fontSize: 13,
        color: Colors.nevada,
        lineHeight: 18,
    },

    actions: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 22,
        gap: 12,
    },

    cancelBtn: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
        backgroundColor: Colors.athensGrayLight,
        borderWidth: 1,
        borderColor: Colors.athensGrayLight,
    },

    cancelText: {
        fontFamily: Fonts.serif,
        fontSize: 13,
        color: Colors.portGore,
    },

    deleteBtn: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
        backgroundColor: "#E5484D",
    },

    deleteText: {
        fontFamily: Fonts.serif,
        fontSize: 13,
        color: "#fff",
    },
});
