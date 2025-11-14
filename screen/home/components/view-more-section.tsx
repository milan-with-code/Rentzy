import { Dimensions, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { Colors, Fonts } from "@/constants/theme";
import { viewMoreSectionData } from "@/mock";
import { ViewMoreSectionDataProps } from "@/types/common";

export default function ViewMoreSection() {
    const { width } = Dimensions.get("screen");

    const formatTitle = (text: string) => {
        const words = text.split(" ");
        return words.join("\n");
    };

    const renderItemElement = ({ item }: { item: ViewMoreSectionDataProps }) => (
        <Pressable style={[styles.itemContainer, { width: (width - 32) / 4 }]}>
            <View style={styles.iconBox}>
                <Text style={styles.iconLetter}>{item.title.charAt(0)}</Text>
            </View>
            <Text style={styles.itemText}>{formatTitle(item.title)}</Text>
        </Pressable>
    )

    return (
        <View style={{ marginVertical: 20 }}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Quick Action</Text>
                <Link href="/(main)/quick-actions" style={styles.viewMore}>
                    View More
                </Link>
            </View>
            <View>
                <FlatList
                    data={viewMoreSectionData}
                    ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
                    renderItem={renderItemElement}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal={false}
                    scrollEnabled={false}
                    numColumns={4}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    headerText: {
        color: Colors.nevada,
        fontFamily: Fonts.rounded,
        fontSize: 14,
    },
    viewMore: {
        color: "#4D81E7",
        fontFamily: Fonts.serif,
        fontSize: 14,
    },
    itemSeparator: {
        height: 20,
    },
    itemContainer: {
        alignItems: "center",
    },
    iconBox: {
        width: 50,
        height: 50,
        backgroundColor: Colors.athensGrayLight,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    iconLetter: {
        color: Colors.waterloo,
        fontFamily: Fonts.sans,
        fontSize: 16,
    },
    itemText: {
        marginTop: 8,
        color: Colors.waterloo,
        fontFamily: Fonts.sans,
        fontSize: 12,
        textAlign: "center",
        lineHeight: 16,
    },
});
