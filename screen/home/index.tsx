import { ScrollView, View, StyleSheet } from "react-native";
import Header from "./components/header";
import ReminderSection from "./components/reminder-section";
import ViewMoreSection from "./components/view-more-section";
import RentDueSection from "./components/rent-due-section";

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Header />
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <ReminderSection />
                <View style={styles.contentContainer}>
                    <ViewMoreSection />
                    <RentDueSection />
                </View>
            </ScrollView>
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
