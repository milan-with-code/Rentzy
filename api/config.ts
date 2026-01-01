const DEV_BASE_URL = "http://10.117.174.33:5000/api";
const PROD_BASE_URL = "https://rentzy-q7v3.onrender.com/api";
export const UPLOADS_BASE_URL = "http://10.117.174.33:5000"

export const API_URL =
    process.env.NODE_ENV === "development" ? DEV_BASE_URL : PROD_BASE_URL;
