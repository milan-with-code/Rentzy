import { View, Text, StyleSheet } from "react-native";
import { StepProps } from "@/types/common";
import { Fonts } from "@/constants/theme";
import UploadRounded from "@/components/ui/upload-rounded";

interface UploadFieldsProps {
    key: keyof StepProps["form"];
    label: string;
}

export default function StepThree({ form, handleChange }: StepProps) {

    const uploadFields: UploadFieldsProps[] = [
        { key: "residentSignature", label: "Resident's Signature" },
        { key: "parentSignature", label: "Parent Signature" },
        { key: "idProof1", label: "ID Proof 1" },
        { key: "idProof2", label: "ID Proof 2" },
        { key: "idProof3", label: "ID Proof 3" },
    ];

    const renderUpload = (item: UploadFieldsProps) => (
        <View key={String(item.key)} style={styles.col}>
            <UploadRounded
                value={form[item.key]}
                onChange={(v) => handleChange(item.key, v ?? "")}
                size={100}
                name={item.label}
                allowCamera
            />
            <Text style={styles.label}>{item.label}</Text>
        </View>
    );

    return (
        <View style={styles.container}>

            <View style={styles.row}>
                {uploadFields.slice(0, 2).map(renderUpload)}
            </View>

            <View style={styles.row}>
                {uploadFields.slice(2, 4).map(renderUpload)}
            </View>

            <View style={styles.single}>
                {renderUpload(uploadFields[4])}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 18,
        paddingVertical: 10,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 16,
    },
    col: {
        flex: 1,
        alignItems: "center",
    },
    single: {
        alignItems: "center",
        marginTop: 10,
    },
    label: {
        marginTop: 8,
        fontFamily: Fonts.sans,
        fontSize: 14,
        color: "#333",
    },
});
