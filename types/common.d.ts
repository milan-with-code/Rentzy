export interface ViewMoreSectionDataProps {
    id: number,
    title: string,
    path: string
}
export interface ReminderSectionDataProps {
    id: number,
    amount: number,
    title: string,
    icon: LucideIconName;
}
export interface QuickActionsDataProps {
    id: number,
    title: string,
    icon: string,
}


export interface UserAvatarProps {
    name: string,
    size?: number,
}

export type ProfileHeaderProps = {
    name: string;
    email: string;
    phone: string;
    avatarName: string;
};

export type MaritalType = "single" | "married";

export interface FormType {
    uri: string;
    name: string;
    mobile: string;
    dob: string;
    marital: MaritalType;
    email: string;
    address: string;
    state: string;
    district: string;
    course: string;
    institution: string;
    profession: string;
    idNumber: string;
    fatherName: string;
    fatherContact: string;
    motherName: string;
    motherContact: string;
    fatherOccupation: string;
    motherOccupation: string;
    guardianName: string;
    guardianContact: string;
    guardianAddress: string;
    residentSignature: string;
    parentSignature: string;
    idProof1: string;
    idProof2: string;
    idProof3: string;
    room: string;
    bed: string;
    rentAmount: string;
    meterReading: string;
}

export interface StepProps {
    form: FormType;
    handleChange: <K extends keyof FormType>(key: K, value: FormType[K]) => void;
}
