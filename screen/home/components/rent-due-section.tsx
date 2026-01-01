import { Fonts } from "@/constants/theme";
import { StyleSheet, Text, View, FlatList } from "react-native";
import EmptyState from "@svg/emptyState.svg";
import { useRentDueStore } from "@/store/useRentDueStore";
import { useEffect } from "react";
import RentDueSkeleton from "@/skeleton/rent-due-skeleton";

const STATIC_RENT_DUE = [
    {
        residentId: "1",
        name: "Rahul Sharma",
        mobile: "9876543210",
        rent: 8500,
    },
    {
        residentId: "2",
        name: "Amit Patel",
        mobile: "9123456789",
        rent: 9200,
    },
];

export default function RentDueSection() {
    const {
        getRentDue,
        rentDueList,
        totalDue,
        loading,
    } = useRentDueStore();

    useEffect(() => {
        getRentDue();
    }, []);

    const data =
        rentDueList.length > 0 ? rentDueList : STATIC_RENT_DUE;

    const isEmpty = data.length === 0;

    if (loading) {
        return <RentDueSkeleton />;
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    Rent Due ({data.length})
                </Text>
            </View>

            {isEmpty && !loading && (
                <View style={styles.emptyContainer}>
                    <EmptyState width={120} height={120} />
                    <Text style={styles.emptyText}>No Dues</Text>
                </View>
            )}

            {!isEmpty && (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.residentId}
                    scrollEnabled={false}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <View>
                                <Text style={styles.name}>
                                    {item.name}
                                </Text>
                                <Text style={styles.mobile}>
                                    {item.mobile}
                                </Text>
                            </View>

                            <Text style={styles.rent}>
                                ₹{item.rent}
                            </Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: "#BABABA",
        borderRadius: 8,
        overflow: "hidden",
        marginBottom: 16,
    },

    header: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        backgroundColor: "#B1C8F7",
    },

    headerText: {
        fontFamily: Fonts.serif,
        fontSize: 14,
        lineHeight: 20,
    },

    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 24,
    },

    emptyText: {
        fontFamily: Fonts.sans,
        fontSize: 14,
        lineHeight: 20,
        paddingTop: 10,
        color: "#939090",
    },

    card: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderColor: "#E3E3E3",
    },

    name: {
        fontFamily: Fonts.sans,
        fontSize: 14,
        lineHeight: 20,
    },

    mobile: {
        fontFamily: Fonts.sans,
        fontSize: 12,
        color: "#777",
    },

    rent: {
        fontFamily: Fonts.serif,
        fontSize: 14,
        color: "#E53935",
    },
});
