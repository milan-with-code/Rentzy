import { useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import ScreenLayout from "@/components/layout/screen-layout";
import Checkbox from "@/components/ui/checkbox";
import InputField from "@/components/ui/input-field";
import AmenityBadge from "@/components/ui/amenity-badge";
import Button from "@/components/ui/button";
import { roomAmenities } from "@/mock";
import { CreateRoomState } from "@/types/room";
import { router } from "expo-router";
import { roomService } from "@/api/room.service";
import { AxiosError } from "axios";
import { Fonts } from "@/constants/theme";

export default function CreateRoomScreen() {
    const [room, setRoom] = useState<CreateRoomState>({
        roomName: "",
        roomOccupancy: "",
        balcony: false,
        attachedBathroom: false,
        amenities: {
            ac: false,
            tv: false,
            parking: false,
            wifi: false,
        },
    });

    const handleCreate = async () => {
        const amenitiesArray = Object.keys(room.amenities).filter(
            (key) => room.amenities[key] === true
        );

        const payload = {
            name: room.roomName,
            occupancy: room.roomOccupancy,
            balcony: room.balcony,
            attachedBathroom: room.attachedBathroom,
            amenities: amenitiesArray,
        };

        try {
            const response = await roomService.createRoom(payload);
            if (response.status === 201) {
                router.replace("/(tabs)/room");
            }
        } catch (e) {
            const err = e as AxiosError<{ message?: string }>;
            Alert.alert(
                "Create Room Failed",
                err.response?.data?.message ?? "Something went wrong"
            );
        }
    };

    return (
        <ScreenLayout title="Create Room">
            <InputField
                placeholder="Room Name"
                value={room.roomName}
                onChangeText={(text) =>
                    setRoom({ ...room, roomName: text })
                }
            />
            <InputField
                placeholder="Room Occupancy"
                keyboardType="numeric"
                value={room.roomOccupancy}
                onChangeText={(text) =>
                    setRoom({ ...room, roomOccupancy: text })
                }
            />
            <View style={styles.commonRow}>
                {roomAmenities.common.map((item) => (
                    <View key={item.id} style={styles.commonItem}>
                        <Checkbox
                            label={item.label}
                            checked={room[item.key as keyof typeof room] === true}
                            onChange={(value) =>
                                setRoom({
                                    ...room,
                                    [item.key]: value,
                                })
                            }
                        />
                    </View>
                ))}
            </View>

            <Text style={styles.sectionTitle}>Other Amenities</Text>

            <View style={styles.badgeWrapper}>
                {roomAmenities.optional.map((item) => (
                    <AmenityBadge
                        key={item.id}
                        label={item.label}
                        selected={room.amenities[item.key]}
                        onToggle={() =>
                            setRoom({
                                ...room,
                                amenities: {
                                    ...room.amenities,
                                    [item.key]: !room.amenities[item.key],
                                },
                            })
                        }
                    />
                ))}
            </View>


            <View style={styles.bottomRow}>
                <View style={styles.flex}>
                    <Button
                        title="Cancel"
                        variant="secondary"
                        onPress={() => router.back()}
                        fullWidth
                    />
                </View>
                <View style={styles.flex}>
                    <Button
                        title="Create"
                        onPress={handleCreate}
                        fullWidth
                    />
                </View>
            </View>
        </ScreenLayout>
    );
}

const styles = StyleSheet.create({

    commonRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 10,
    },
    commonItem: {
        width: "50%",
        paddingRight: 8,
        marginBottom: 12,
    },

    sectionTitle: {
        fontSize: 16,
        fontFamily: Fonts.serif,
        marginVertical: 12,
    },

    badgeWrapper: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        marginBottom: 30,
    },

    bottomRow: {
        flexDirection: "row",
        gap: 12,
        position: "absolute",
        bottom: 20,
        left: 16,
        right: 16,
    },

    flex: {
        flex: 1,
    },
});
