import { ThemeProvider } from '@react-navigation/native';
import { SQLiteProvider } from 'expo-sqlite';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { migrate } from '@/localdb';
import { DefaultTheme } from '@/constants/Themes';
import 'react-native-reanimated';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
    duration: 300,
    fade: true,
});

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <SQLiteProvider databaseName="moodstat.db" onInit={migrate}>
            <ThemeProvider value={DefaultTheme}>
                <GestureHandlerRootView>
                    <Stack>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                        <Stack.Screen name="log-mood" options={{ headerShown: false, presentation: 'modal' }} />
                        <Stack.Screen name="+not-found" /> 
                    </Stack>
                    <StatusBar style="dark" />
                </GestureHandlerRootView>
            </ThemeProvider>
        </SQLiteProvider>
    );
}
