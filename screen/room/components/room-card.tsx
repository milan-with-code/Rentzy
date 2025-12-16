import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Fonts } from "@/constants/theme";

interface RoomCardProps {
    name: string;
    occupancy: number;
    balcony: boolean;
    attachedBathroom: boolean;
    amenities: string[];
    onPress?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
}

export default function RoomCard({
    name,
    occupancy,
    balcony,
    attachedBathroom,
    amenities,
    onPress,
    onEdit,
    onDelete,
}: RoomCardProps) {
    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={onPress}
        >
            <View style={styles.accent} />

            <View style={styles.content}>
                <View style={styles.headerRow}>
                    <Text numberOfLines={1} style={styles.roomName}>
                        {name}
                    </Text>

                    <View style={styles.actionRow}>
                        {onEdit && (
                            <TouchableOpacity onPress={onEdit} hitSlop={10}>
                                <Ionicons
                                    name="create-outline"
                                    size={18}
                                    color="#2F80ED"
                                />
                            </TouchableOpacity>
                        )}

                        {onDelete && (
                            <TouchableOpacity onPress={onDelete} hitSlop={10}>
                                <Ionicons
                                    name="trash-outline"
                                    size={18}
                                    color="#EB5757"
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                <View style={styles.row}>
                    <Ionicons name="people" size={15} color="#2F80ED" />
                    <Text style={styles.text}>Occupancy: {occupancy}</Text>
                </View>

                <View style={styles.row}>
                    <Ionicons
                        name={balcony ? "sunny" : "close-circle"}
                        size={15}
                        color={balcony ? "#27AE60" : "#EB5757"}
                    />
                    <Text style={styles.text}>
                        Balcony: {balcony ? "Yes" : "No"}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Ionicons
                        name={attachedBathroom ? "water" : "close-circle"}
                        size={15}
                        color={attachedBathroom ? "#27AE60" : "#EB5757"}
                    />
                    <Text style={styles.text}>
                        Attached Bathroom: {attachedBathroom ? "Yes" : "No"}
                    </Text>
                </View>

                {amenities.length > 0 && (
                    <View style={styles.amenityBox}>
                        <Text style={styles.amenityTitle}>Amenities</Text>

                        <View style={styles.amenityList}>
                            {amenities.slice(0, 4).map((item, index) => (
                                <View key={index} style={styles.amenityBadge}>
                                    <Text style={styles.amenityText}>
                                        {item}
                                    </Text>
                                </View>
                            ))}

                            {amenities.length > 4 && (
                                <View style={styles.moreBadge}>
                                    <Text style={styles.moreText}>
                                        +{amenities.length - 4} more
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        backgroundColor: "#FAFBFF",
        borderRadius: 16,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: "#E6ECF5",
        position: "relative",
        overflow: "hidden"
    },

    accent: {
        width: 5,
        backgroundColor: "#2F80ED",
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
    },

    content: {
        flex: 1,
        padding: 14,
    },

    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },

    actionRow: {
        flexDirection: "row",
        gap: 14,
        alignItems: "center",
    },

    roomName: {
        flex: 1,
        marginRight: 8,
        fontSize: 17,
        fontFamily: Fonts.serif,
        color: "#1F3A8A",
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginBottom: 4,
    },

    text: {
        fontSize: 13,
        fontFamily: Fonts.serif,
        color: "#4B5563",
    },

    amenityBox: {
        marginTop: 10,
    },

    amenityTitle: {
        fontSize: 13,
        fontFamily: Fonts.serif,
        color: "#374151",
        marginBottom: 6,
    },

    amenityList: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 6,
    },

    amenityBadge: {
        backgroundColor: "#EEF2FF",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },

    amenityText: {
        fontSize: 12,
        fontFamily: Fonts.serif,
        color: "#3730A3",
    },

    moreBadge: {
        backgroundColor: "#DBEAFE",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },

    moreText: {
        fontSize: 12,
        fontFamily: Fonts.serif,
        color: "#1D4ED8",
    },
});
