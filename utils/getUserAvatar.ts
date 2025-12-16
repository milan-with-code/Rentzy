export const getUserAvatar = (name: string = "") => {
    const firstChar = name?.trim()?.charAt(0)?.toUpperCase() || "?";

    const colors = [
        "#1abc9c", "#3498db", "#9b59b6", "#e67e22",
        "#e74c3c", "#2ecc71", "#f1c40f", "#34495e"
    ];

    const hash = name
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0);

    const bgColor = colors[hash % colors.length];

    return {
        char: firstChar,
        color: bgColor,
    };
};
