import { StepProps } from "@/types/common";
import { View, StyleSheet } from "react-native";
import InputField from "@/components/ui/input-field";

export default function StepTwo({ form, handleChange }: StepProps) {
    return (
        <View>
            <View style={styles.row}>
                <InputField
                    label="Father Name"
                    value={form.fatherName}
                    onChangeText={(t) => handleChange("fatherName", t)}
                    placeholder="Enter father name"
                    containerStyle={styles.col}
                />

                <InputField
                    label="Father Contact"
                    value={form.fatherContact}
                    onChangeText={(t) => handleChange("fatherContact", t)}
                    placeholder="Enter father contact"
                    containerStyle={styles.col}
                    keyboardType="phone-pad"
                />
            </View>

            <View style={styles.row}>
                <InputField
                    label="Mother Name"
                    value={form.motherName}
                    onChangeText={(t) => handleChange("motherName", t)}
                    placeholder="Enter mother name"
                    containerStyle={styles.col}
                />

                <InputField
                    label="Mother Contact"
                    value={form.motherContact}
                    onChangeText={(t) => handleChange("motherContact", t)}
                    placeholder="Enter mother contact"
                    keyboardType="phone-pad"
                    containerStyle={styles.col}
                />
            </View>

            <View style={styles.row}>
                <InputField
                    label="Father Occupation"
                    value={form.fatherOccupation}
                    onChangeText={(t) => handleChange("fatherOccupation", t)}
                    placeholder="Enter father occupation"
                    containerStyle={styles.col}
                />

                <InputField
                    label="Mother Occupation"
                    value={form.motherOccupation}
                    onChangeText={(t) => handleChange("motherOccupation", t)}
                    placeholder="Enter mother occupation"
                    containerStyle={styles.col}

                />
            </View>
            <View style={styles.row}>
                <InputField
                    label="Guardian's Name"
                    value={form.guardianName}
                    onChangeText={(t) => handleChange("guardianName", t)}
                    placeholder="Enter guardian name"
                    containerStyle={styles.col}
                />

                <InputField
                    label="Guardian Contact"
                    value={form.guardianContact}
                    onChangeText={(t) => handleChange("guardianContact", t)}
                    placeholder="Enter guardian contact"
                    keyboardType="phone-pad"
                    containerStyle={styles.col}
                />
            </View>

            <InputField
                label="Guardian Address"
                value={form.guardianAddress}
                onChangeText={(t) => handleChange("guardianAddress", t)}
                placeholder="Enter guardian address"
                multiline
                numberOfLines={4}
                containerStyle={{ height: 100 }}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    col: { flex: 1 },
});
