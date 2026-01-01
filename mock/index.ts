import { QuickActionsDataProps, ReminderSectionDataProps, ViewMoreSectionDataProps } from "@/types/common";
import { CategoryOption } from "@/types/expenses";
import { RoomAmenities } from "@/types/room";

export const viewMoreSectionData: ViewMoreSectionDataProps[] = [
    { id: 1, title: "Add Resident", path: "/add-resident" },
    { id: 2, title: "Add Payments", path: "/add-payments" },
    { id: 3, title: "Add Expense", path: "/expenses/expenses" },
    { id: 4, title: "Upcoming Dues", path: "/upcoming-dues" }
];

export const reminderSectionData: ReminderSectionDataProps[] = [
    {
        id: 1,
        title: "Rent Due",
        amount: 2500,
        icon: "Wallet",
    },
    {
        id: 2,
        title: "Electricity Bill",
        amount: 460,
        icon: "Zap",
    },
    {
        id: 3,
        title: "Water Bill",
        amount: 300,
        icon: "Droplet",
    },
];


export const quickActionsData: QuickActionsDataProps[] = [
    { id: 1, title: "Add Broker", icon: "user.plus.fill" },
    { id: 2, title: "E-Sign Agreement", icon: "house.fill" },
    { id: 3, title: "E-Sign Inventory", icon: "inventory-material" },
    { id: 4, title: "Food Calender", icon: "storefront" },
];



export const AMENITIES = [
    "AC",
    "RO Water",
    "Bed",
    "Geyser",
    "Fan",
    "Cupboard",
    "Wi-Fi",
    "Parking",
];


export const roomAmenities: RoomAmenities = {
    common: [
        { id: 1, key: "balcony", label: "Balcony" },
        { id: 2, key: "attach", label: "Attached Bathroom" },
    ],
    optional: [
        { id: 4, key: "ac", label: "AC" },
        { id: 5, key: "tv", label: "TV" },
        { id: 6, key: "parking", label: "Parking" },
        { id: 7, key: "wifi", label: "Wi-Fi" },
    ],
};


export const CATEGORY_OPTIONS: CategoryOption[] = [
    { id: 1, label: "Bills", value: "Bills" },
    { id: 2, label: "Food", value: "Food" },
    { id: 3, label: "Maintenance", value: "Maintenance" },
    { id: 4, label: "Marketing", value: "Marketing" },
    { id: 5, label: "Miscellaneous", value: "Miscellaneous" },
    { id: 6, label: "Petty Cash", value: "Petty Cash" },
    { id: 7, label: "Salaries", value: "Salaries" },
];
