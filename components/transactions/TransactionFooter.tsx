import React from "react";
import { ActivityIndicator, View } from "react-native";

interface TransactionListFooterProps {
  isDark: boolean;
  isFetchingNextPage: boolean;
}

function TransactionListFooterBase({
  isDark,
  isFetchingNextPage,
}: TransactionListFooterProps) {
  if (!isFetchingNextPage) return null;

  return (
    <View className="py-5 items-center">
      <ActivityIndicator color={isDark ? "#A78BFA" : "#6366F1"} />
    </View>
  );
}

export const TransactionListFooter = React.memo(TransactionListFooterBase);