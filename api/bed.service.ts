
import { Bed, CreateBedPayload } from "@/types/bed";
import API from "./axios";

export const bedService = {
    createBed: (data: CreateBedPayload) =>
        API.post("/beds/create", data),

    getAllVacantBeds: () =>
        API.get<{ total: number; beds: Bed[] }>("/beds/vacant"),
};
