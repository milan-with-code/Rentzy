import { Modal, View, Text, StyleSheet } from "react-native";
import { Colors, Fonts } from "@/constants/theme";
import { AssignBedModalProps } from "@/types/modal";
import Button from "../ui/button";
import Input from "../ui/text-input";

export default function AssignBedModal({
    visible,
    loading,
    bedNumber,
    tariff,
    onChangeBed,
    onChangeTariff,
    onClose,
    onSubmit,
}: AssignBedModalProps) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            statusBarTranslucent
        >
            <View style={styles.overlay}>
                <View style={styles.container}>

                    <Text style={styles.title}>Create Bed</Text>

                    <Input
                        placeholder="Bed Number"
                        keyboardType="number-pad"
                        value={bedNumber}
                        onChangeText={onChangeBed}
                    />

                    <Input
                        placeholder="Tariff / Rent"
                        keyboardType="number-pad"
                        value={tariff}
                        onChangeText={onChangeTariff}
                    />

                    <View style={styles.actionRow}>
                        <View style={styles.col}>
                            <Button
                                title="Cancel"
                                variant="secondary"
                                onPress={onClose}
                            />
                        </View>

                        <View style={styles.col}>
                            <Button
                                title="Create"
                                loading={loading}
                                disabled={!bedNumber || !tariff}
                                onPress={onSubmit}
                            />
                        </View>
                    </View>

                </View>
            </View>
        </Modal>
    );
}




const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.45)",
        justifyContent: "center",
        padding: 20,
    },
    container: {
        backgroundColor: "#fff",
        borderRadius: 18,
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontFamily: Fonts.serif,
        marginBottom: 14,
        color: Colors.primary,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 12,
        padding: 12,
        fontFamily: Fonts.serif,
        marginBottom: 12,
    },
    actionRow: {
        flexDirection: "row",
        gap: 12,
        marginTop: 10,
    },
    col: {
        flex: 1,
    },
});
