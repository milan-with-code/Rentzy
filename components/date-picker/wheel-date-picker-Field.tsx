import { useEffect, useState } from "react";
import {
    View,
    Text,
    Modal,
    Pressable,
    ViewStyle,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { formatDate, MONTHS } from "@/utils/time";
import { Colors, Fonts } from "@/constants/theme";
import { WheelColumn } from "./wheel-column";
import { WheelDatePickerFieldProps } from "@/types";

export default function WheelDatePickerField({
    value,
    onConfirm,
    label,
    containerStyle,
}: WheelDatePickerFieldProps) {
    const initYear = value.getFullYear();
    const initMonth = value.getMonth();
    const initDay = value.getDate();

    const [visible, setVisible] = useState(false);
    const [year, setYear] = useState(initYear);
    const [month, setMonth] = useState(initMonth);
    const [day, setDay] = useState(initDay);

    const years = Array.from({ length: 80 }, (_, i) => initYear - 40 + i);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    useEffect(() => {
        if (day > daysInMonth) setDay(daysInMonth);
    }, [month, year]);

    return (
        <>
            <View style={containerStyle}>
                {label && <Text style={styles.label}>{label}</Text>}

                <TouchableOpacity
                    style={styles.input}
                    onPress={() => setVisible(true)}
                >
                    <Text style={styles.inputText}>
                        {formatDate(value)}
                    </Text>
                </TouchableOpacity>
            </View>

            <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
                <View style={styles.overlay}>
                    <View style={styles.container}>

                        <View style={styles.wheelsRow}>
                            <WheelColumn
                                data={MONTHS}
                                selectedIndex={month}
                                onChange={setMonth}
                            />

                            <WheelColumn
                                data={Array.from(
                                    { length: daysInMonth },
                                    (_, i) => `${i + 1}`
                                )}
                                selectedIndex={day - 1}
                                onChange={(i) => setDay(i + 1)}
                            />

                            <WheelColumn
                                data={years.map(String)}
                                selectedIndex={years.indexOf(year)}
                                onChange={(i) => setYear(years[i])}
                            />
                        </View>

                        <View style={styles.footer}>
                            <Pressable onPress={() => setVisible(false)}>
                                <Text style={styles.cancel}>Cancel</Text>
                            </Pressable>

                            <Pressable
                                onPress={() => {
                                    onConfirm(new Date(year, month, day));
                                    setVisible(false);
                                }}
                            >
                                <Text style={styles.ok}>OK</Text>
                            </Pressable>
                        </View>

                    </View>
                </View>
            </Modal>
        </>
    );
};

export const styles = StyleSheet.create({
    /* ================= OVERLAY ================= */

    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.45)",
        justifyContent: "center",
        alignItems: "center",
    },

    /* ================= FIELD ================= */

    label: {
        fontFamily: Fonts.serif,
        color: Colors.nevada,
        marginBottom: 3,
        fontSize: 12,
        lineHeight: 19,
    },

    input: {
        height: 48,
        borderRadius: 10,
        paddingHorizontal: 12,
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#E0E0E0",
        backgroundColor: "#FAFAFA",
    },

    inputText: {
        fontSize: 14,
        fontFamily: Fonts.sans,
        color: "#1A1A1A",
    },

    /* ================= MODAL ================= */

    container: {
        width: 340,
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
    },

    wheelsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    footer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 16,
        gap: 24,
    },

    cancel: {
        fontSize: 14,
        fontFamily: Fonts.sans,
        color: "#666",
    },

    ok: {
        fontSize: 14,
        fontFamily: Fonts.sans,
        color: "#007AFF",
        fontWeight: "600",
    },
});
