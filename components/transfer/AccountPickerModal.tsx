import { Modal, View, Pressable, FlatList } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { AppText } from "@/components/ui/AppText";
import { Account } from "@/http-client/types/user.type";

type Props = {
  visible: boolean;
  accounts: Account[];
  selectedAccount: Account;
  onClose: () => void;
  onSelect: (account: Account) => void;
};

export function AccountPickerModal({
  visible,
  accounts,
  selectedAccount,
  onClose,
  onSelect,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <Pressable onPress={onClose} className="flex-1 justify-end bg-black/50">
        <Pressable
          onPress={() => {}}
          className="
            rounded-t-3xl
            px-5
            pt-6
            pb-8
            bg-surface-light
            dark:bg-surface-dark
          ">
          <View className="items-center mb-6">
            <View className="w-12 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600" />
          </View>

          <AppText className="text-xl font-semibold mb-5 text-foreground-light dark:text-foreground-dark">
            Select Debit Account
          </AppText>

          <FlatList
            data={accounts}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const selected = item.id === selectedAccount.id;

              return (
                <Pressable
                  onPress={() => {
                    onSelect(item);
                    onClose();
                  }}
                  className={`
                    flex-row
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    px-4
                    py-4
                    mb-3
                    ${
                      selected
                        ? "border-primary bg-primary/10"
                        : "border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark"
                    }
                  `}>
                  <View>
                    <AppText className="font-semibold text-foreground-light dark:text-foreground-dark">
                      {item.accountType}
                    </AppText>

                    <AppText className="mt-1 text-muted-foreground">
                      {item.accountNumber}
                    </AppText>

                    <AppText className="mt-2 font-bold text-foreground-light dark:text-foreground-dark">
                      {item.currency} {Number(item.balance).toLocaleString()}
                    </AppText>
                  </View>

                  {selected && (
                    <Ionicons
                      name="checkmark-circle"
                      size={24}
                      color="#3B82F6"
                    />
                  )}
                </Pressable>
              );
            }}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
}
