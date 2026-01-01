import { UPLOADS_BASE_URL } from "@/api/config";

const normalizeImageUrl = (path?: string) => {
    if (!path) return null;

    const cleanPath = path.replace(/\\/g, "/");

    if (cleanPath.startsWith("http://") || cleanPath.startsWith("https://")) {
        return cleanPath;
    }

    return `${UPLOADS_BASE_URL}/${cleanPath}`;
};

export const getValidImagePath = (path?: string | null) => {
    if (path && path.startsWith("file://")) {
        return path;
    } else {
        return normalizeImageUrl(path ?? "");
    }
};
