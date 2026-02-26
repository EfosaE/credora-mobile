import { NotificationProvider } from "@/features/NotificationProvider";
import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <NotificationProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="transfer-modal"
          options={{
            presentation: "modal",
            animation: "fade",
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="receipt-preview"
          options={{
            headerTitle: "Receipt Preview",
            animation: "fade",
          }}
        />
      </Stack>
    </NotificationProvider>
  );
}
