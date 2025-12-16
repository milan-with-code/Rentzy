import { Stack } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";
import {
    ThemeProvider,
    DarkTheme,
    DefaultTheme,
} from "@react-navigation/native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { StatusBar } from "expo-status-bar";

export default function RootNavigator() {
    const { isSignedIn, loading } = useContext(AuthContext);
    const colorScheme = useColorScheme();

    if (loading) return null;

    return (
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Protected guard={isSignedIn}>
                    <Stack.Screen name="(main)" />
                </Stack.Protected>

                <Stack.Protected guard={!isSignedIn}>
                    <Stack.Screen name="(auth)" />
                </Stack.Protected>
            </Stack>

            <StatusBar style="auto" />
        </ThemeProvider>
    );
}
