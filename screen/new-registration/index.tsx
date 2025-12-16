import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import { FormType } from "@/types/common";
import ScreenLayout from "@/components/layout/screen-layout";
import StepIndicator from "@/components/step-indicator";
import Button from "@/components/ui/button";
import ExitAlert from "@/components/ui/exit-alert";

import StepOne from "./steps/step-one";
import StepTwo from "./steps/step-two";
import StepThree from "./steps/step-three";
import StepFour from "./steps/step-four";


export default function NewRegistrationScreen() {
    const [step, setStep] = useState(0);
    const [showExitAlert, setShowExitAlert] = useState(false);

    const [form, setForm] = useState<FormType>({
        uri: "",
        name: "",
        mobile: "",
        dob: "",
        marital: "single",
        email: "",
        address: "",
        state: "",
        district: "",
        course: "",
        institution: "",
        profession: "",
        idNumber: "",
        fatherName: "",
        fatherContact: "",
        motherName: "",
        motherContact: "",
        fatherOccupation: "",
        motherOccupation: "",
        guardianName: "",
        guardianContact: "",
        guardianAddress: "",
        idProof1: "",
        idProof2: "",
        idProof3: "",
        residentSignature: "",
        parentSignature: "",
        room: "",
        bed: "",
        rentAmount: "",
        meterReading: "",
    });

    const handleChange = <K extends keyof FormType>(key: K, value: FormType[K]) =>
        setForm((prev) => ({ ...prev, [key]: value }));

    const steps = [
        { component: StepOne, label: "Basic Information" },
        { component: StepTwo, label: "Parent Details" },
        { component: StepThree, label: "Documents" },
        { component: StepFour, label: "Payment Details" },
    ];

    const totalSteps = steps.length;
    const isLastStep = step === totalSteps - 1;
    const ActiveStep = steps[step].component;

    const handleNext = () => {
        if (isLastStep) {
            return;
        }
        setStep((prev) => prev + 1);
    };

    const handleBack = () => {
        if (step === 0) {
            setShowExitAlert(true);
            return;
        }
        setStep((prev) => prev - 1);
    };

    return (
        <>
            <ScreenLayout
                title="New Registration"
                rightIcon={{
                    name: "share.icon",
                    size: 20,
                    onPress: () => console.log("Settings clicked"),
                }}
                headerBottom={
                    <StepIndicator
                        totalSteps={totalSteps}
                        currentStep={step}
                        labels={steps.map((s) => s.label)}
                    />
                }
            >
                <View style={{ flex: 1, justifyContent: "space-between" }}>
                    <ActiveStep form={form} handleChange={handleChange} />

                    <View style={styles.buttonRow}>
                        <Button
                            title="Back"
                            variant="secondary"
                            onPress={handleBack}
                            style={styles.button}
                        />
                        <Button
                            title={isLastStep ? "Submit" : "Next"}
                            onPress={handleNext}
                            style={styles.button}
                        />
                    </View>
                </View>
            </ScreenLayout>

            <ExitAlert
                visible={showExitAlert}
                onCancel={() => setShowExitAlert(false)}
                onConfirm={() => router.back()}
            />
        </>
    );
}

const styles = StyleSheet.create({
    buttonRow: {
        flexDirection: "row",
        marginBottom: 20,
        gap: 12,
    },
    button: {
        flex: 1,
    },
});
