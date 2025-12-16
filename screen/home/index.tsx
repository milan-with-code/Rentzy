import { useCallback, useState } from "react";
import { ScrollView, View, StyleSheet, RefreshControl, } from "react-native";
import { useFocusEffect } from "expo-router";
import Header from "./components/header";
import ReminderSection from "./components/reminder-section";
import ViewMoreSection from "./components/view-more-section";
import RentDueSection from "./components/rent-due-section";
import VacantBedCard from "./components/vacant-bed-card";
import VacantBedModal from "@/components/modals/vacant-bed-modal";
import VacantBedCardSkeleton from "@/skeleton/vacant-bed-card-skeleton";
import { useBedStore } from "@/store/useBedStore";
import { Colors } from "@/constants/theme";

export default function HomeScreen() {
    const [showVacantModal, setShowVacantModal] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const { beds, total, loading, fetchVacantBeds, reset } = useBedStore();

    useFocusEffect(
        useCallback(() => {
            fetchVacantBeds();
            return reset;
        }, [])
    );

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchVacantBeds();
        setRefreshing(false);
    }, []);

    const handleOnPress = useCallback(() => {
        setShowVacantModal(true);
    }, [])

    const handleCloseModal = useCallback(() => {
        setShowVacantModal(false);
    }, []);

    return (
        <View style={styles.container}>
            <Header />
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={Colors.primary}
                    />
                }
            >
                <ReminderSection />
                <View style={styles.contentContainer}>
                    {loading ? (
                        <VacantBedCardSkeleton />
                    ) : (
                        <VacantBedCard
                            totalVacant={total}
                            handleOnPress={handleOnPress}
                        />
                    )}
                    <ViewMoreSection />
                    <RentDueSection />
                </View>
            </ScrollView>
            <VacantBedModal
                visible={showVacantModal}
                onClose={handleCloseModal}
                beds={beds}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1D61E7',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: "white",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        padding: 16,
    },
});
