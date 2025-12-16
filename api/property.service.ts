
import API from "./axios";

export const propertyService = {
    getProperty: () => API.get("/property/my-property"),
};
