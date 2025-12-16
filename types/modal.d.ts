export interface AssignBedModalProps {
    visible: boolean;
    loading?: boolean;

    bedNumber: string;
    tariff: string;

    onChangeBed: (value: string) => void;
    onChangeTariff: (value: string) => void;

    onClose: () => void;
    onSubmit: () => void;
}
