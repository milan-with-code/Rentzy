
import API from "./axios";

export const residentService = {
    addResident: (data: any) => API.post("/residents/create", data),
    getRentDueResidents: () => API.get("/resident/due"),
};
