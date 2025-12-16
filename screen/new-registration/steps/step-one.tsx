import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Checkbox from "@/components/ui/checkbox";
import InputField from "@/components/ui/input-field";
import UploadRounded from "@/components/ui/upload-rounded";
import DropdownPicker from "@/components/ui/dropdown-picker";
import { Fonts } from "@/constants/theme";
import { StepProps } from "@/types/common";

export default function StepOne({ form, handleChange }: StepProps) {
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);

    const professionOptions = useMemo(
        () => [
            { id: 1, label: "Student", value: "student" },
            { id: 2, label: "Employee", value: "employee" },
            { id: 3, label: "Business", value: "business" },
            { id: 4, label: "Freelancer", value: "freelancer" },
        ],
        []
    );

    const renderElement = useCallback(
        ({ item }: { item: any }) => {
            const isSelected = item.value === form.profession;

            return (
                <TouchableOpacity
                    onPress={() => {
                        handleChange("profession", item.value);
                        setIsOpenDropdown(false);
                    }}
                    style={[
                        styles.dropdownItem,
                        {
                            backgroundColor: isSelected ? "#1D61E7" : "#fff",
                        },
                    ]}
                >
                    <Text
                        style={[
                            styles.dropdownItemText,
                            { color: isSelected ? "#fff" : "#333" },
                        ]}
                    >
                        {item.label}
                    </Text>
                </TouchableOpacity>
            );
        },
        [form.profession]
    );

    return (
        <View>
            <View style={styles.center}>
                <UploadRounded
                    value={form.uri}
                    onChange={(v) => handleChange("uri", v ?? "")}
                    size={96}
                    name="Milan Patel"
                    allowCamera
                />
                <Text style={styles.uploadText}>Upload Image</Text>
            </View>

            <InputField
                label="Name"
                value={form.name}
                onChangeText={(t) => handleChange("name", t)}
                placeholder="Enter Name"
            />

            <View style={styles.row}>
                <InputField
                    label="Mobile Number"
                    value={form.mobile}
                    onChangeText={(t) => handleChange("mobile", t)}
                    placeholder="Enter mobile number"
                    keyboardType="phone-pad"
                    containerStyle={styles.col}
                />

                <InputField
                    label="Date of Birth"
                    value={form.dob}
                    onChangeText={(t) => handleChange("dob", t)}
                    placeholder="DD/MM/YYYY"
                    containerStyle={styles.col}
                />
            </View>

            <View style={styles.maritalRow}>
                <Text style={styles.label}>Marital Status</Text>

                <View style={styles.row}>
                    <Checkbox
                        checked={form.marital === "single"}
                        onChange={() => handleChange("marital", "single")}
                        label="Single"
                    />

                    <Checkbox
                        checked={form.marital === "married"}
                        onChange={() => handleChange("marital", "married")}
                        label="Married"
                    />
                </View>
            </View>

            <InputField
                label="Email Address"
                value={form.email}
                onChangeText={(t) => handleChange("email", t)}
                placeholder="Enter email"
                keyboardType="email-address"
            />

            <InputField
                label="Permanent Address"
                value={form.address}
                onChangeText={(t) => handleChange("address", t)}
                placeholder="Enter address"
            />

            <View style={styles.row}>
                <InputField
                    label="State"
                    value={form.state}
                    onChangeText={(t) => handleChange("state", t)}
                    placeholder="Enter state"
                    containerStyle={styles.col}
                />

                <InputField
                    label="District"
                    value={form.district}
                    onChangeText={(t) => handleChange("district", t)}
                    placeholder="Enter district"
                    containerStyle={styles.col}
                />
            </View>

            <View style={styles.row}>
                <InputField
                    label="Course"
                    value={form.course}
                    onChangeText={(t) => handleChange("course", t)}
                    placeholder="Enter course"
                    containerStyle={styles.col}
                />

                <InputField
                    label="Institution Name"
                    value={form.institution}
                    onChangeText={(t) => handleChange("institution", t)}
                    placeholder="Enter institution or company"
                    containerStyle={styles.col}
                />
            </View>

            <DropdownPicker
                selected={
                    form.profession
                        ? {
                            label:
                                form.profession.charAt(0).toUpperCase() +
                                form.profession.slice(1),
                            value: form.profession,
                        }
                        : null
                }
                isOpen={isOpenDropdown}
                setIsOpen={setIsOpenDropdown}
                renderItem={renderElement}
                data={professionOptions}
                placeholder="Select Profession"
                containerStyle={{ marginBottom: 16 }}
            />

            <InputField
                label="ID Proof Number"
                value={form.idNumber}
                onChangeText={(t) => handleChange("idNumber", t)}
                placeholder="Enter ID Number"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    center: { alignItems: "center", },
    uploadText: { fontFamily: Fonts.sans, fontSize: 14 },

    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    col: { flex: 1 },

    maritalRow: {
        flexDirection: "row",
        marginBottom: 12,
        alignItems: "center",
        gap: 16,
    },

    label: {
        fontFamily: Fonts.sans,
        fontSize: 14,
        lineHeight: 20,
    },

    dropdownItem: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },

    dropdownItemText: {
        fontSize: 14,
        fontFamily: Fonts.sans,
        lineHeight: 20
    },
});
