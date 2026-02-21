import React from "react";
import { Text, View } from "react-native";
import { cn } from "@/lib/cn";

interface TransactionHeaderProps {
  isDark: boolean;
  loaded: number;
  // total: number;
}

function TransactionHeaderBase({
  isDark,
  loaded,
  // total,
}: TransactionHeaderProps) {
  return (
    <View
      className={cn(
        "px-5 pt-4 pb-3 border-b",
        isDark ? "border-[#2A2A3E]" : "border-gray-200",
      )}>
      <Text
        className={cn(
          "text-[22px] font-bold tracking-wide",
          isDark ? "text-[#F1F1F1]" : "text-[#1A1A2E]",
        )}>
        Transactions
      </Text>
      <Text
        className={cn(
          "text-[13px] mt-0.5",
          isDark ? "text-[#9A9AB0]" : "text-gray-500",
        )}>
        {loaded} records
      </Text>
    </View>
  );
}

export const TransactionHeader = React.memo(TransactionHeaderBase);
