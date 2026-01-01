export const formatTitle = (text: string) => {
    const words = text.split(" ");
    return words.join("\n");
};

export const formatIndianPhone = (phone: string) => {
    if (!phone) return "";

    const digits = phone.replace(/\D/g, "");

    if (digits.length !== 10) return phone;

    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
};
