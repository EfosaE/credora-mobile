import { AppText } from "@/components/ui/AppText";
import { AppScreen } from "@/components/ui/AppScreen";
import { useSession } from "@/features/ctx";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";

export default function Index() {
  const { signOut } = useSession();

  return (
    <AppScreen className="flex-1 justify-center items-center">
      <AppText className="text-2xl font-bold mb-6">Protected Page</AppText>
      <ThemeToggleButton />

      <AppText
        className="text-lg font-semibold text-red-500 m-4"
        onPress={() => {
          // The guard in `AppCintent` redirects back to the sign-in screen.
          signOut();
        }}>
        Sign Out
      </AppText>
    </AppScreen>
  );
}
