import { bedService } from "@/api/bed.service";
import { roomService } from "@/api/room.service";
import ScreenLayout from "@/components/layout/screen-layout";
import AssignBedModal from "@/components/modals/assign-bed-modal";
import IconButton from "@/components/ui/icon-button";
import StatsBar from "@/components/ui/stats-bar";
import { RoomManageRouteParams } from "@/types/navigation";
import { AxiosError } from "axios";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

export default function RoomManageScreen() {
    const { roomId, roomName } = useLocalSearchParams<RoomManageRouteParams>();
    const [bedNumber, setBedNumber] = useState("");
    const [tariff, setTariff] = useState("");
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [room, setRoom] = useState<{ occupancy: number, remainingBeds: number, totalBeds: 0 }>({
        occupancy: 0,
        remainingBeds: 0,
        totalBeds: 0
    });


    const roomNameText = `Room No : ${roomName}`

    useEffect(() => {
        if (!roomId) return;
        const fetchRoomDocs = async () => {
            try {
                const response = await roomService.getRoomById(roomId);
                const data = response?.data?.room;
                setRoom({
                    occupancy: data?.occupancy,
                    remainingBeds: 0,
                    totalBeds: 0,
                })
            } catch (e) {
                const err = e as AxiosError<{ message?: string }>;
                Alert.alert("Create Room Failed", err.response?.data?.message ?? err.message ?? "Something went wrong");
            }
        }
        fetchRoomDocs()
    }, [roomId])

    const handleCreateBed = useCallback(async () => {
        if (!bedNumber && !roomId && !tariff) return;
        try {
            const response = await bedService.createBed({
                bedNumber,
                roomId,
                tariff
            });
            setRoom({
                occupancy: response.data?.stats?.occupancy,
                remainingBeds: response.data?.stats?.remainingBeds,
                totalBeds: response.data?.stats?.totalBeds
            })


        } catch (e) {
            const err = e as AxiosError<{ message?: string }>;
            Alert.alert("Create Room Failed", err.response?.data?.message ?? err.message ?? "Something went wrong");
        } finally {
            setVisible(false);
            setBedNumber("");
            setTariff("")
        }
    }, [bedNumber, tariff, roomId])

    const remainingBeds = room.occupancy - 0;


    const handleCloseModal = useCallback(() => {
        setVisible(false);
        setBedNumber("");
        setTariff("")
    }, [])

    const stats = [
        { label: "Total Occupancy", value: room.occupancy },
        { label: "Total Beds", value: 0 },
        { label: "Remaining", value: remainingBeds },
    ];

    return (
        <ScreenLayout title={roomNameText}>
            <StatsBar stats={stats} />
            <View style={styles.fab}>
                <IconButton
                    icon="Plus"
                    onPress={() => setVisible(true)}
                />
            </View>
            <AssignBedModal
                visible={visible}
                loading={loading}
                bedNumber={bedNumber}
                tariff={tariff}
                onChangeBed={setBedNumber}
                onChangeTariff={setTariff}
                onClose={handleCloseModal}
                onSubmit={handleCreateBed}
            />
        </ScreenLayout>
    );
}

const styles = StyleSheet.create({
    fab: {
        position: "absolute",
        bottom: 20,
        right: 20,
    },
})
