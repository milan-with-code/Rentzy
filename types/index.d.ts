export interface WheelDatePickerFieldProps {
    value: Date;
    onConfirm: (date: Date) => void;
    label?: string;
    containerStyle?: ViewStyle;
};


export interface WheelColumnProps {
    data: string[];
    selectedIndex: number;
    onChange: (index: number) => void;
}
