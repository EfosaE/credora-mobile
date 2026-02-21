import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Home", headerShown: false }}
      />
      <Stack.Screen name="transfer" options={{ title: "Transfer" }} />
      <Stack.Screen name="transactions-history" options={{ title: "Transactions History" }} />
    </Stack>
  );
}
