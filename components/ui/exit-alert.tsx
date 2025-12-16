import { View, Text, Modal, StyleSheet, Pressable } from "react-native";
import { Fonts } from "@/constants/theme";

type ExitAlertProps = {
    visible: boolean;
    onCancel: () => void;
    onConfirm: () => void;
};

export default function ExitAlert({ visible, onCancel, onConfirm }: ExitAlertProps) {
    return (
        <Modal transparent visible={visible} animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.box}>
                    <Text style={styles.title}>Do you want to exit?</Text>

                    <View style={styles.row}>
                        <Pressable style={[styles.btn, styles.no]} onPress={onCancel}>
                            <Text style={styles.noText}>No</Text>
                        </Pressable>

                        <Pressable style={[styles.btn, styles.yes]} onPress={onConfirm}>
                            <Text style={styles.yesText}>Yes</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    box: {
        width: "80%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 12,
        elevation: 10,
    },
    title: {
        fontFamily: Fonts.sans,
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    btn: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
        marginHorizontal: 5,
    },
    no: {
        backgroundColor: "#ddd",
    },
    yes: {
        backgroundColor: "#1D61E7",
    },
    noText: {
        fontFamily: Fonts.sans,
        fontSize: 14,
        color: "#333",
    },
    yesText: {
        fontFamily: Fonts.sans,
        fontSize: 14,
        color: "#fff",
    },
});
