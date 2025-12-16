import { FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";
import ScreenLayout from "@/components/layout/screen-layout";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";
import { formatTitle } from "@/utils";
import { quickActionsData } from "@/mock";
import { QuickActionsDataProps } from "@/types/common";

export default function QuickActionScreen() {
    const renderElement = ({ item }: { item: QuickActionsDataProps }) => (
        <TouchableOpacity activeOpacity={0.8} style={styles.actionItem}>
            <IconSymbol name={item.icon} size={26} color="#000" />
            <Text style={styles.actionLabel}>{formatTitle(item.title)}</Text>
        </TouchableOpacity>
    );

    return (
        <ScreenLayout title="Quick Actions">
            <FlatList
                data={quickActionsData}
                renderItem={renderElement}
                keyExtractor={(item) => item.id.toString()}
                numColumns={4}
                scrollEnabled={false}
                contentContainerStyle={styles.gridContainer}
            />
        </ScreenLayout>
    );
}

const styles = StyleSheet.create({
    gridContainer: {
        paddingVertical: 10,
    },
    actionItem: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
    },
    actionLabel: {
        textAlign: "center",
        fontSize: 11,
        fontFamily: Fonts.sans,
        marginTop: 6,
    },
});
