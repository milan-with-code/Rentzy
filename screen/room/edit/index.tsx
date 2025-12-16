import { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { AxiosError } from "axios";

import { roomService } from "@/api/room.service";
import ScreenLayout from "@/components/layout/screen-layout";
import Checkbox from "@/components/ui/checkbox";
import Input from "@/components/ui/text-input";
import Button from "@/components/ui/button";
import { AMENITIES } from "@/mock";
import { RoomFormState } from "@/types/room";

export default function EditRoomScreen() {
    const { roomId } = useLocalSearchParams<{ roomId: string }>();

    const [form, setForm] = useState<RoomFormState>({
        name: "",
        occupancy: "",
        balcony: false,
        attachedBathroom: false,
        amenities: [],
    });

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        if (!roomId) return;

        const fetchRoom = async () => {
            setFetching(true);
            try {
                const response = await roomService.getRoomById(roomId);
                const room = response?.data?.room;

                if (!room) return;

                setForm({
                    name: room.name ?? "",
                    occupancy: String(room.occupancy ?? ""),
                    balcony: !!room.balcony,
                    attachedBathroom: !!room.attachedBathroom,
                    amenities: room.amenities ?? [],
                });
            } catch (e) {
                const err = e as AxiosError<{ message?: string }>;
                Alert.alert(
                    "Fetch Failed",
                    err.response?.data?.message ?? err.message
                );
            } finally {
                setFetching(false);
            }
        };

        fetchRoom();
    }, [roomId]);

    const toggleBoolean = (key: "balcony" | "attachedBathroom") => {
        setForm(prev => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const toggleAmenity = (item: string) => {
        setForm(prev => ({
            ...prev,
            amenities: prev.amenities.includes(item)
                ? prev.amenities.filter(a => a !== item)
                : [...prev.amenities, item],
        }));
    };

    const handleRoomUpdate = async () => {
        if (!roomId) return;

        if (!form.name.trim()) {
            Alert.alert("Validation Error", "Room name is required");
            return;
        }

        const occupancyNumber = Number(form.occupancy);
        if (!occupancyNumber || occupancyNumber <= 0) {
            Alert.alert("Validation Error", "Occupancy must be greater than 0");
            return;
        }

        const payload = {
            ...form,
            occupancy: occupancyNumber,
        };

        setLoading(true);
        try {
            const response = await roomService.updateRoom(roomId, payload);

            if (response.status === 200) {
                Alert.alert(
                    "Success",
                    response.data?.message ?? "Room updated successfully"
                );
                router.replace("/room/");
            }
        } catch (e) {
            const err = e as AxiosError<{ message?: string }>;
            Alert.alert(
                "Update Failed",
                err.response?.data?.message ?? err.message
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScreenLayout
            title="Update Room"
        >
            <Input
                value={form.name}
                placeholder="Enter room name"
                onChangeText={(v: string) =>
                    setForm(prev => ({ ...prev, name: v }))
                }
            />

            <Input
                value={form.occupancy}
                placeholder="Enter occupancy"
                keyboardType="numeric"
                onChangeText={(v: string) =>
                    setForm(prev => ({ ...prev, occupancy: v }))
                }
            />

            <View style={styles.amenities}>
                <View style={styles.amenityItem}>
                    <Checkbox
                        label="Balcony"
                        checked={form.balcony}
                        onChange={() => toggleBoolean("balcony")}
                    />
                </View>

                <View style={styles.amenityItem}>
                    <Checkbox
                        label="Attached Bathroom"
                        checked={form.attachedBathroom}
                        onChange={() => toggleBoolean("attachedBathroom")}
                    />
                </View>
            </View>

            <View style={styles.amenities}>
                {AMENITIES.map(item => (
                    <View key={item} style={styles.amenityItem}>
                        <Checkbox
                            label={item}
                            checked={form.amenities.includes(item)}
                            onChange={() => toggleAmenity(item)}
                        />
                    </View>
                ))}
            </View>

            <View style={styles.bottomActions}>
                <View style={styles.col}>
                    <Button
                        title="Cancel"
                        variant="secondary"
                        disabled={loading}
                        onPress={() => router.back()}
                    />
                </View>

                <View style={styles.col}>
                    <Button
                        title="Submit"
                        loading={loading}
                        disabled={loading}
                        onPress={handleRoomUpdate}
                    />
                </View>
            </View>
        </ScreenLayout>
    );
}

const styles = StyleSheet.create({
    amenities: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 16,
    },
    amenityItem: {
        width: "50%",
        marginBottom: 10,
    },
    bottomActions: {
        position: "absolute",
        bottom: 0,
        left: 16,
        right: 16,
        backgroundColor: "white",
        flexDirection: "row",
        gap: 12,
        paddingTop: 16,
        paddingBottom: 32,
    },
    col: {
        flex: 1,
    },
});
