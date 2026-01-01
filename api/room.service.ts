
import API from "./axios";

export const roomService = {
    getRooms: () => API.get("/rooms"),
    createRoom: (data: any) => API.post("/rooms/create", data),
    getRoomById: (roomId: string) => API.get(`/rooms/${roomId}`),
    updateRoom: (roomId: string, data: any) => API.put(`/rooms/${roomId}`, data),
    getRoomStats: (roomId: string) => API.get(`/rooms/${roomId}/stats`),
};
