import React from "react";
import { Text, View } from "react-native";
import { cn } from "@/lib/cn";

interface TransactionListEmptyProps {
  isDark: boolean;
  isLoading: boolean;
}

function TransactionListEmptyBase({ isDark, isLoading }: TransactionListEmptyProps) {
  if (isLoading) return null;

  return (
    <View className="flex-1 items-center justify-center pt-16">
      <Text className={cn(isDark ? "text-[#9A9AB0]" : "text-gray-500")}>
        No transactions found.
      </Text>
    </View>
  );
}

export const TransactionListEmpty = React.memo(TransactionListEmptyBase);