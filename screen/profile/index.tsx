import { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import ScreenLayout from "@/components/layout/screen-layout";
import ProfileHeader from "./components/profile-header";
import ConfirmModal from "@/components/ui/confirm-modal";
import Button from "@/components/ui/button";
import { AuthContext } from "@/context/auth-context";
import { usePropertyStore } from "@/store/usePropertyStore";
import ProfileHeaderSkeleton from "@/skeleton/profile-header-skeleton";

export default function ProfileScreen() {
    const [showLogout, setShowLogout] = useState(false);
    const { setAuthToken } = useContext(AuthContext)
    const { property, loading, fetchProperty } = usePropertyStore();

    const handleLogout = () => {
        setShowLogout(false);
        setAuthToken(null)
    };

    return (
        <ScreenLayout title="Profile">
            <View style={styles.container}>
                <View style={styles.content}>
                    {loading ? (
                        <ProfileHeaderSkeleton />
                    ) : (
                        <ProfileHeader
                            name={property?.propertyName ?? ""}
                            email={property?.email ?? ""}
                            phone={"+91 8200349568"}
                            avatarName={property?.ownerName ?? ""}
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
});
