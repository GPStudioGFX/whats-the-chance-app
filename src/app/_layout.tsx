import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useFonts, Figtree_400Regular, Figtree_500Medium, Figtree_600SemiBold, Figtree_700Bold, Figtree_800ExtraBold, Figtree_900Black } from '@expo-google-fonts/figtree';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';
import { colors } from '@/constants';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Figtree_400Regular,
    Figtree_500Medium,
    Figtree_600SemiBold,
    Figtree_700Bold,
    Figtree_800ExtraBold,
    Figtree_900Black,
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return <View style={{ flex: 1, backgroundColor: colors.background }} />;

  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="setup" />
        <Stack.Screen name="theme" />
        <Stack.Screen name="game-settings" />
        <Stack.Screen name="rules" />
        <Stack.Screen name="game/dare" />
        <Stack.Screen name="game/input" />
        <Stack.Screen name="game/reveal" />
        <Stack.Screen name="game/result" />
        <Stack.Screen name="game/safe" />
        <Stack.Screen name="settings" />
      </Stack>
    </>
  );
}
