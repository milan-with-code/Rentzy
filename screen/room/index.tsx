import { useCallback, useMemo, useState } from "react";
import { Text, View, StyleSheet, Alert, FlatList } from "react-native";
import { router, useFocusEffect } from "expo-router";
import axios, { AxiosError } from "axios";

import { roomService } from "@/api/room.service";
import ScreenLayout from "@/components/layout/screen-layout";
import { Fonts } from "@/constants/theme";
import { RoomServiceProps } from "@/types/room";
import IconButton from "@/components/ui/icon-button";
import RoomCard from "./components/room-card";
import RoomCardSkeleton from "@/skeleton/room-card-skeleton";
import StatsBar from "@/components/ui/stats-bar";
import Input from "@/components/ui/text-input";

const TOTAL_ROOMS = 20;
const SKELETON_COUNT = 3;

export default function RoomScreen() {
    const [room, setRoom] = useState<RoomServiceProps>({
        rooms: [],
        total: 0,
    });
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");


    useFocusEffect(
        useCallback(() => {
            let isMounted = true;

            const fetchRoomDocs = async () => {
                try {
                    setLoading(true);

                    const response = await roomService.getRooms();
                    const data = response.data;

                    if (isMounted) {
                        setRoom({
                            rooms: data?.rooms ?? [],
                            total: data?.total ?? 0,
                        });
                    }
                } catch (e) {
                    if (axios.isCancel(e)) return;

                    const err = e as AxiosError<{ message?: string }>;
                    Alert.alert(
                        "Fetch Failed",
                        err.response?.data?.message ??
                        err.message ??
                        "Something went wrong"
                    );
                } finally {
                    if (isMounted) setLoading(false);
                }
            };

            fetchRoomDocs();

            return () => {
                isMounted = false;
            };
        }, [])
    );

    const usedRooms = room.total;
    const remainingRooms = TOTAL_ROOMS - usedRooms;

    const stats = [
        { label: "Total Rooms", value: TOTAL_ROOMS },
        { label: "Rooms Count", value: usedRooms },
        { label: "Remaining", value: remainingRooms },
    ];

    const filteredRooms = useMemo(() => {
        if (!search.trim()) return room.rooms;
        return room.rooms.filter(r =>
            r.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, room.rooms]);

    const openRoom = useCallback((roomId: string, roomName: string) => {
        router.push({
            pathname: "/room/manage/[roomId]",
            params: {
                roomId: roomId,
                roomName: roomName,
            },
        })
    }, [])

    const handleEditRoom = (roomId: string) => {
        router.push({
            pathname: `/room/edit/[roomId]`,
            params: {
                roomId: roomId
            }
        });
    };

    const handleDeleteRoom = () => {
        Alert.alert(
            "Delete Room",
            "Are you sure you want to delete this room?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",

                },
            ]
        );
    };

    return (
        <ScreenLayout title="Room">

            <View style={styles.header}>
                <StatsBar stats={stats} />
                <Input
                    variant="search"
                    placeholder="Search room by name"
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            <FlatList
                data={filteredRooms}
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    loading ? (
                        <View>
                            {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                                <RoomCardSkeleton key={i} />
                            ))}
                        </View>
                    ) : (
                        <Text style={styles.emptyText}>No rooms found</Text>
                    )
                }
                renderItem={({ item }) => (
                    <RoomCard
                        name={item.name}
                        occupancy={item.occupancy}
                        balcony={item.balcony}
                        attachedBathroom={item.attachedBathroom}
                        amenities={item.amenities}
                        onPress={() => openRoom(item._id, item.name)}
                        onEdit={() => handleEditRoom(item._id)}
                        onDelete={() => handleDeleteRoom()}
                    />
                )}
            />

            <View style={styles.fab}>
                <IconButton
                    icon="Plus"
                    onPress={() => router.push("/room/create")}
                />
            </View>
        </ScreenLayout>
    );
}


const styles = StyleSheet.create({
    header: {
        marginBottom: 12,
        gap: 12,
    },

    statValue: {
        color: "#fff",
        fontSize: 16,
        fontFamily: Fonts.mono,
        lineHeight: 26,
        marginBottom: 2,
    },

    statLabel: {
        color: "#fff",
        fontSize: 12,
        fontFamily: Fonts.serif,
        lineHeight: 16,
    },

    emptyText: {
        textAlign: "center",
        marginTop: 20,
        color: "#999",
        fontFamily: Fonts.serif,
    },

    fab: {
        position: "absolute",
        bottom: 20,
        right: 20,
    },
});
