import { useEffect } from "react";
import { router, Stack } from "expo-router";
import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { DMSans_400Regular } from "@expo-google-fonts/dm-sans";
import * as SplashScreen from "expo-splash-screen";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../api/client";
import { ItemService } from "../api/services/item.service";
import { registerForPushNotifications } from "../components/utils/notifications";

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    DMSans_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    const ping = () => api.get("/auth/ping").catch(() => {});

    ping();

    const interval = setInterval(ping, 14 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const registerToken = async () => {
      try {
        const authToken = await AsyncStorage.getItem("token");
        if (!authToken) return;

        const pushToken = await registerForPushNotifications();
        if (pushToken) {
          await ItemService.updatePushToken(pushToken);
        }
      } catch (error) {
        console.error("Failed to register push token:", error);
      }
    };

    registerToken();
  }, []);

  useEffect(() => {
    const sub = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const itemId = response.notification.request.content.data?.itemId;
        if (itemId) {
          router.push({
            pathname: "/(app)/item/[id]",
            params: { id: String(itemId) },
          });
        }
      },
    );
    return () => sub.remove();
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}
