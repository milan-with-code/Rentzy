import { Stack, Redirect } from "expo-router";

export default function MainLayout() {

    const user = null;

    if (user) return <Redirect href="/(auth)/login" />;

    return (
        <Stack screenOptions={{ headerShown: false }} />
    );
}
