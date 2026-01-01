import { useCallback, useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ScreenLayout from "@/components/layout/screen-layout";
import ProfileHeader from "./components/profile-header";
import ConfirmModal from "@/components/ui/confirm-modal";
import Button from "@/components/ui/button";
import { AuthContext } from "@/context/auth-context";
import ProfileHeaderSkeleton from "@/skeleton/profile-header-skeleton";
import { useUserStore } from "@/store/useUserStore";
import { formatIndianPhone } from "@/utils";
import { useFocusEffect } from "expo-router";

export default function ProfileScreen() {
    const [showLogout, setShowLogout] = useState(false);
    const { setAuthToken } = useContext(AuthContext)
    const { user, loading, fetchMyProfile } = useUserStore();

    useFocusEffect(
        useCallback(() => {
            fetchMyProfile();
        }, [])
    );

    const handleLogout = () => {
        setShowLogout(false);
        setAuthToken(null)
    };

    return (
        <ScreenLayout title="Profile">
            <ScrollView style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.content}>
                        {loading ? (
                            <ProfileHeaderSkeleton />
                        ) : (
                            <ProfileHeader
                                name={user?.property?.propertyName ?? ""}
                                email={user?.email ?? ""}
                                phone={formatIndianPhone(user?.phone ?? "")}
                                avatarName={user?.name ?? ""}
                            />
                        )}

                    </View>

                    <View style={styles.bottom}>
                        <Button
                            title="Logout"
                            variant="outline"
                            onPress={() => setShowLogout(true)}
                            fullWidth
                        />
                    </View>

                    <ConfirmModal
                        visible={showLogout}
                        title="Logout"
                        message="Are you sure you want to logout?"
                        confirmText="Logout"
                        cancelText="Cancel"
                        onConfirm={handleLogout}
                        onCancel={() => setShowLogout(false)}
                    />
                </View>
            </ScrollView>
        </ScreenLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
    },
    content: {
        flex: 1,
    },
    bottom: {
        marginBottom: 16,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
});
