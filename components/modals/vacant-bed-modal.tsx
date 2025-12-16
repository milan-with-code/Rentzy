import {
    Modal,
    View,
    Text,
    StyleSheet,
    FlatList,
    Pressable,
} from "react-native";
import { Fonts, Colors } from "@/constants/theme";
import { Bed } from "@/types/bed";

type Props = {
    visible: boolean;
    onClose: () => void;
    beds: Bed[];
};

export default function VacantBedModal({ visible, onClose, beds }: Props) {
    const grouped = beds.reduce((acc: any, bed) => {
        const roomId = bed.roomId._id;
        if (!acc[roomId]) {
            acc[roomId] = {
                roomName: bed.roomId.name,
                occupancy: bed.roomId.occupancy,
                count: 0,
            };
        }
        acc[roomId].count += 1;
        return acc;
    }, {});

    const data = Object.values(grouped);

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent
            onRequestClose={onClose}
            statusBarTranslucent
        >
            <View style={styles.overlay}>
                <View style={styles.sheet}>

                    <View style={styles.header}>
                        <Text style={styles.title}>Vacant Beds</Text>
                        <Pressable onPress={onClose}>
                            <Text style={styles.close}>Close</Text>
                        </Pressable>
                    </View>

                    <FlatList
                        data={data}
                        keyExtractor={(item: any, index) => index.toString()}
                        ItemSeparatorComponent={() => (
                            <View style={styles.divider} />
                        )}
                        renderItem={({ item }: any) => (
                            <View style={styles.row}>
                                <Text style={styles.room}>{item.roomName}</Text>
                                <Text style={styles.meta}>
                                    Occupancy: {item.occupancy}
                                </Text>
                                <Text style={styles.badge}>
                                    {item.count} Beds
                                </Text>
                            </View>
                        )}
                    />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "flex-end",
    },

    sheet: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 16,
        maxHeight: "70%",
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },

    title: {
        fontSize: 16,
        fontFamily: Fonts.rounded,
        lineHeight: 22,
        color: "#0F172A",
    },

    close: {
        fontSize: 14,
        fontFamily: Fonts.sans,
        color: Colors.primary,
    },

    row: {
        paddingVertical: 12,
    },

    room: {
        fontSize: 14,
        fontFamily: Fonts.rounded,
        color: "#0F172A",
    },

    meta: {
        fontSize: 12,
        fontFamily: Fonts.sans,
        color: "#64748B",
        marginTop: 2,
    },

    badge: {
        alignSelf: "flex-start",
        marginTop: 6,
        backgroundColor: "#EEF2FF",
        color: Colors.primary,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        fontSize: 12,
        fontFamily: Fonts.mono,
    },

    divider: {
        height: 1,
        backgroundColor: "#E5EAF3",
    },
});
