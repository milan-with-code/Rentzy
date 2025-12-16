const DEV_BASE_URL = "http://10.117.174.33:5000/api";
const PROD_BASE_URL = "https://api.rentzy.in/api";

export const API_URL =
    process.env.NODE_ENV === "development" ? DEV_BASE_URL : PROD_BASE_URL;
