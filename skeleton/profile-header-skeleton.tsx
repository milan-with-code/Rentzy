import { Skeleton } from "@/components/skeleton";
import { View, StyleSheet } from "react-native";

export default function ProfileHeaderSkeleton() {
    return (
        <View style={styles.wrapper}>
            <View style={styles.row}>

                <View style={styles.avatarSkeleton} />

                <View style={styles.infoBox}>
                    <Skeleton width={140} height={20} />
                    <Skeleton width={180} height={14} />
                    <Skeleton width={120} height={14} />
                </View>
            </View>

            <Skeleton width={36} height={36} radius={8} />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    avatarSkeleton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#E1E9EE",
    },

    infoBox: {
        gap: 6,
    },
});
