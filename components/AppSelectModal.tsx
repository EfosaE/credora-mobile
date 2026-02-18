import React from "react";
import { Modal, View, Pressable, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppText } from "@/components/ui/AppText";

type Option = {
  label: string;
  value: string;
};

type Props = {
  visible: boolean;
  title: string;
  options: Option[];
  selectedValue?: string;
  onSelect: (option: Option) => void;
  onClose: () => void;
};

export function AppSelectModal({
  visible,
  title,
  options,
  selectedValue,
  onSelect,
  onClose,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      {/* Backdrop */}
      <Pressable className="flex-1 bg-black/40" onPress={onClose} />

      {/* Sheet */}
      <View className="bg-surface-light dark:bg-surface-dark rounded-t-3xl px-5 pt-4 pb-8">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-4">
          <AppText className="text-base font-semibold">{title}</AppText>
          <Pressable onPress={onClose}>
            <Ionicons name="close" size={22} />
          </Pressable>
        </View>

        <FlatList
          data={options}
          keyExtractor={(item) => item.value}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View className="h-px bg-border-light dark:bg-border-dark" />
          )}
          renderItem={({ item }) => {
            const selected = item.value === selectedValue;

            return (
              <Pressable
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
                className="py-4 flex-row items-center justify-between">
                <AppText className="text-sm">{item.label}</AppText>

                {selected && (
                  <Ionicons name="checkmark" size={18} color="#4F46E5" />
                )}
              </Pressable>
            );
          }}
        />
      </View>
    </Modal>
  );
}
