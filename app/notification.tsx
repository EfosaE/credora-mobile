import { useState, useEffect } from "react";
import { View, Button, Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { AppText } from "@/components/ui/AppText";
import { AppScreen } from "@/components/ui/AppScreen";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync(): Promise<
  string | undefined
> {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
    });
  }

  if (!Device.isDevice) {
    handleRegistrationError("Must use physical device");
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    handleRegistrationError("Permission not granted");
    return;
  }

  try {
    //  This returns REAL FCM token
    const devicePushToken = await Notifications.getDevicePushTokenAsync();

    console.log("FCM Token:", devicePushToken.data);

    return devicePushToken.data;
  } catch (e: unknown) {
    handleRegistrationError(`${e}`);
  }
}

export default function NotificationManager() {
  const [fcmToken, setFcmToken] = useState("");
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setFcmToken(token ?? ""))
      .catch((error: any) => setFcmToken(`${error}`));

    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      },
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  return (
    <AppScreen
      style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}>
      <AppText>Your FCM token: {fcmToken}</AppText>

      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <AppText>Title: {notification?.request.content.title}</AppText>
        <AppText>Body: {notification?.request.content.body}</AppText>
        <AppText>
          Data:{" "}
          {notification && JSON.stringify(notification.request.content.data)}
        </AppText>
      </View>

      <Button
        title="Send Test (via backend)"
        onPress={async () => {
          await fetch("https://your-backend.com/api/send-notification", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: fcmToken,
            }),
          });
        }}
      />
    </AppScreen>
  );
}
