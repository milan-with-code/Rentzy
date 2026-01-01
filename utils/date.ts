export function formatDate(
    dateInput: string | Date,
    formatType: "DD MMM YYYY" | "DD-MM-YYYY" = "DD MMM YYYY"
): string {
    const date = new Date(dateInput);

    if (isNaN(date.getTime())) return "";

    const day = String(date.getDate()).padStart(2, "0");
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    const monthsShort = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    if (formatType === "DD-MM-YYYY") {
        return `${day}-${String(monthIndex + 1).padStart(2, "0")}-${year}`;
    }

    return `${day} ${monthsShort[monthIndex]} ${year}`;
}
