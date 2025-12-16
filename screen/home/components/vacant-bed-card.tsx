
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Fonts } from "@/constants/theme";

type Props = {
    totalVacant: number;
    handleOnPress: () => void;
};

export default function VacantBedCard({ totalVacant, handleOnPress }: Props) {
    return (
        <Pressable style={styles.card} onPress={handleOnPress}>
            <View style={styles.left}>
                <View style={styles.iconBox}>
                    <Ionicons name="bed-outline" size={22} color={Colors.primary} />
                </View>

                <View>
                    <Text style={styles.title}>Vacant Beds</Text>
                    <Text style={styles.subTitle}>
                        Available for allocation
                    </Text>
                </View>
            </View>

            <View style={styles.right}>
                <Text style={styles.count}>{totalVacant}</Text>
            </View>
        </Pressable>
    );
}


const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FAFBFF",
        borderRadius: 14,
        padding: 16,

        borderWidth: 1,
        borderColor: "#E6ECF5",
    },

    left: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    iconBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: "#EAF0FF",
        justifyContent: "center",
        alignItems: "center",
    },

    title: {
        fontSize: 15,
        fontFamily: Fonts.rounded,
        color: "#0F172A",
        lineHeight: 20,
    },

    subTitle: {
        fontSize: 12,
        fontFamily: Fonts.sans,
        color: "#64748B",
        marginTop: 2,
        lineHeight: 16,
    },

    right: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
    },

    count: {
        color: "#fff",
        fontSize: 16,
        fontFamily: Fonts.mono,
        lineHeight: 20,
    },
});

