import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { AppText } from "@/components/ui/AppText";
import { Account } from "@/http-client/types/user.type";
import { useTheme } from "@/features/ThemeProvider";

type Props = {
  accounts: Account[];
  selectedAccount: Account;
  onPress: () => void;
};

export function DebitAccountSelector({
  accounts,
  selectedAccount,
  onPress,
}: Props) {
  const { theme } = useTheme();

  const hasMultipleAccounts = accounts.length > 1;

  return (
    <View className="my-5">
      <AppText className="mb-2 text-sm text-muted-foreground">
        Debit From
      </AppText>

      <Pressable
        disabled={!hasMultipleAccounts}
        onPress={onPress}
        className="
          flex-row
          items-center
          justify-between
          rounded-2xl
          border
          border-border-light
          dark:border-border-dark
          bg-surface-light
          dark:bg-surface-dark
          px-4
          py-4
        ">
        <View className="flex-1">
          <AppText className="text-base font-semibold text-foreground-light dark:text-foreground-dark">
            {selectedAccount.accountType}
          </AppText>

          <AppText className="mt-1 text-xs text-muted-foreground">
            {selectedAccount.bankName}
          </AppText>

          <AppText className="mt-2 text-sm text-muted-foreground">
            {selectedAccount.accountNumber}
          </AppText>

          <AppText className="mt-3 text-lg font-bold text-foreground-light dark:text-foreground-dark">
            {selectedAccount.currency}{" "}
            {Number(selectedAccount.balance).toLocaleString()}
          </AppText>
        </View>

        {hasMultipleAccounts && (
          <Ionicons
            name="chevron-down"
            size={22}
            color={theme === "dark" ? "#F5F5F5" : "#343434"}
          />
        )}
      </Pressable>
    </View>
  );
}
