import { useEffect, useState } from "react";
import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userClient } from "@/http-client/user/client";

const LAST_TOKEN_KEY = "last_registered_fcm_token";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

async function getDeviceToken(): Promise<string | null> {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
    });
  }

  if (!Device.isDevice) {
    console.log("Must use physical device for Push Notifications");
    return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.log("Push notification permission not granted");
    return null;
  }

  const tokenObj = await Notifications.getDevicePushTokenAsync();
  return tokenObj.data;
}

async function syncTokenWithBackend(token: string, userId: string) {
  const savedToken = await AsyncStorage.getItem(LAST_TOKEN_KEY);

  if (savedToken === token) {
    return; // Already synced
  }

  try {
    await userClient.registerDeviceToken(token, Platform.OS);
  } catch (error) {
    console.log("Error:", error);
    if (error) return;
  }

  await AsyncStorage.setItem(LAST_TOKEN_KEY, token);
}

export function useNotifications(userId: string | null) {
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);

  useEffect(() => {
    if (!userId) return; // Only register if logged in

    async function registerAndSync() {
      const token = await getDeviceToken();

      if (token) {
        setFcmToken(token);
        await syncTokenWithBackend(token, userId!);
      }
    }

    registerAndSync();

    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      },
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification tapped:", response);
      });

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, [userId]);

  return {
    fcmToken,
    notification,
  };
}
