import { useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { StepProps } from "@/types/common";
import { Fonts } from "@/constants/theme";
import DropdownPicker from "@/components/ui/dropdown-picker";
import InputField from "@/components/ui/input-field";

export default function StepFour({ form, handleChange }: StepProps) {
    const [openRoom, setOpenRoom] = useState(false);
    const [openBed, setOpenBed] = useState(false);

    const roomOptions = [
        { id: 1, label: "Room 101", value: "101" },
        { id: 2, label: "Room 102", value: "102" },
        { id: 3, label: "Room 103", value: "103" },
    ];

    const bedOptions = [
        { id: 1, label: "Bed A", value: "A" },
        { id: 2, label: "Bed B", value: "B" },
        { id: 3, label: "Bed C", value: "C" },
    ];

    const handleSelect = (field: string, item: any) => {
        handleChange(field as keyof typeof form, item.value);

        if (field === "room") setOpenRoom(false);
        if (field === "bed") setOpenBed(false);
    };

    const renderItem = (field: string) => ({ item }: { item: any }) => (
        <Pressable onPress={() => handleSelect(field, item)} style={{ padding: 12 }}>
            <Text style={{ fontFamily: Fonts.sans, fontSize: 14 }}>
                {item.label}
            </Text>
        </Pressable>
    );

    return (
        <View>
            <DropdownPicker
                selected={
                    form.room
                        ? { label: `Room ${form.room}`, value: form.room }
                        : null
                }
                isOpen={openRoom}
                setIsOpen={setOpenRoom}
                renderItem={renderItem("room")}
                data={roomOptions}
                placeholder="Select Room"
                containerStyle={{ marginBottom: 16 }}
            />

            <DropdownPicker
                selected={
                    form.bed
                        ? { label: `Bed ${form.bed}`, value: form.bed }
                        : null
                }
                isOpen={openBed}
                setIsOpen={setOpenBed}
                renderItem={renderItem("bed")}
                data={bedOptions}
                placeholder="Select Bed"
                containerStyle={{ marginBottom: 16 }}
            />

            <InputField
                label="Rent Amount"
                placeholder="Enter Rent Amount"
                value={form.rentAmount}
                onChangeText={(v) => handleChange("rentAmount", v)}
                keyboardType="numeric"
                containerStyle={{ marginBottom: 16 }}
            />

            <InputField
                label="Electricity Meter Reading"
                placeholder="Enter Meter Reading"
                value={form.meterReading}
                onChangeText={(v) => handleChange("meterReading", v)}
                keyboardType="numeric"
            />
        </View>
    );
}

const styles = StyleSheet.create({});
