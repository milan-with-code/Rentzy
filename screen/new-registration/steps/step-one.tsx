import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Checkbox from "@/components/ui/checkbox";
import InputField from "@/components/ui/input-field";
import UploadRounded from "@/components/ui/upload-rounded";
import DropdownPicker from "@/components/ui/dropdown-picker";
import { Fonts } from "@/constants/theme";
import { StepProps } from "@/types/common";

export default function StepOne({ form, handleChange }: StepProps) {
    const [isProfessionOpen, setIsProfessionOpen] = useState(false);
    const [isAgreementOpen, setIsAgreementOpen] = useState(false);


    // ------------------ DEFAULT DATE ------------------
    const today = useMemo(() => {
        const d = new Date();
        return d.toISOString().split("T")[0]; // YYYY-MM-DD
    }, []);

    // ------------------ OPTIONS ------------------
    const professionOptions = useMemo(
        () => [
            { id: 1, label: "Student", value: "student" },
            { id: 2, label: "Employee", value: "employee" },
            { id: 3, label: "Business", value: "business" },
            { id: 4, label: "Freelancer", value: "freelancer" },
        ],
        []
    );

    const agreementOptions = useMemo(
        () => [
            { id: 1, label: "1 Month", value: 1 },
            { id: 2, label: "2 Months", value: 2 },
        ],
        []
    );

    const renderProfessionItem = useCallback(
        ({ item }: any) => {
            const isSelected = item.value === form.profession;

            return (
                <TouchableOpacity
                    onPress={() => {
                        handleChange("profession", item.value);
                        setIsProfessionOpen(false);
                    }}
                    style={[
                        styles.dropdownItem,
                        { backgroundColor: isSelected ? "#1D61E7" : "#fff" },
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

    const renderAgreementItem = useCallback(
        ({ item }: any) => (
            <TouchableOpacity
                onPress={() => {
                    handleChange("agreementPeriod", item.value);
                    setIsAgreementOpen(false);
                }}
                style={styles.dropdownItem}
            >
                <Text style={styles.dropdownItemText}>{item.label}</Text>
            </TouchableOpacity>
        ),
        []
    );

    return (
        <View>
            <View style={styles.center}>
                <UploadRounded
                    value={form.uri}
                    onChange={(v) => handleChange("uri", v ?? "")}
                    size={96}
                    name={form.name || "Resident"}
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
                    placeholder="YYYY-MM-DD"
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
                    label="Institution / Company"
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
                            id: professionOptions.find(
                                (opt) => opt.value === form.profession
                            )?.id || 1,
                            label:
                                form.profession.charAt(0).toUpperCase() +
                                form.profession.slice(1),
                            value: form.profession,
                        }
                        : null
                }
                isOpen={isProfessionOpen}
                setIsOpen={setIsProfessionOpen}
                renderItem={renderProfessionItem}
                data={professionOptions}
                placeholder="Select Profession"
                containerStyle={{ marginBottom: 16 }}
            />
            <InputField
                label="Aadhaar Number"
                value={form.aadhaarNumber}
                onChangeText={(t) => handleChange("aadhaarNumber", t)}
                placeholder="Enter Aadhaar Number"
                keyboardType="number-pad"
            />

            <InputField
                label="ID Proof Number"
                value={form.idNumber}
                onChangeText={(t) => handleChange("idNumber", t)}
                placeholder="Enter ID Number"
            />

            <InputField
                label="Pin Code"
                value={form.pinCode}
                onChangeText={(t) => handleChange("pinCode", t)}
                placeholder="Enter pin code"
                keyboardType="number-pad"
            />

            <DropdownPicker
                selected={
                    form.agreementPeriod
                        ? {
                            id: form.agreementPeriod,
                            label: `${form.agreementPeriod} Month`,
                            value: form.agreementPeriod,
                        }
                        : null
                }
                isOpen={isAgreementOpen}
                setIsOpen={setIsAgreementOpen}
                renderItem={renderAgreementItem}
                data={agreementOptions}
                placeholder="Select Agreement Period"
                containerStyle={{ marginBottom: 16 }}
            />

            <View style={styles.row}>
                <InputField
                    label="Registration Date"
                    value={form.registrationDate || today}
                    onChangeText={(t) =>
                        handleChange("registrationDate", t)
                    }
                    placeholder="YYYY-MM-DD"
                    containerStyle={styles.col}
                />

                <InputField
                    label="Accommodation Date"
                    value={form.accommodationDate || today}
                    onChangeText={(t) =>
                        handleChange("accommodationDate", t)
                    }
                    placeholder="YYYY-MM-DD"
                    containerStyle={styles.col}
                />
            </View>

            <InputField
                label="Payment Start Date"
                value={form.paymentStartDate || today}
                onChangeText={(t) =>
                    handleChange("paymentStartDate", t)
                }
                placeholder="YYYY-MM-DD"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    center: {
        alignItems: "center",
        marginBottom: 16,
    },

    uploadText: {
        fontFamily: Fonts.sans,
        fontSize: 14,
        marginTop: 6,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    col: {
        flex: 1,
    },

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
        lineHeight: 20,
    },
});
