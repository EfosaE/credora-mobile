
import { STATUS_CLASS_MAP, STATUS_DOT_CLASS_MAP, Transaction } from "@/http-client/types/transaction.type";
import { cn } from "@/lib/cn";
import { formatCurrency, formatDate, getInitials } from "@/lib/util";
import React from "react";
import { Text, View } from "react-native";

interface TransactionItemProps {
  item: Transaction;
  theme: "light" | "dark";
}

function TransactionItemBase({ item, theme }: TransactionItemProps) {
  const isDark = theme === "dark";
  const isCredit = item.direction === "CREDIT";
  const statusLabel =
    item.status.charAt(0).toUpperCase() + item.status.slice(1);

  return (
    <View
      className={cn(
        "flex-row items-center rounded-2xl border px-3.5 py-3.5",
        isDark ? "bg-[#1E1E2E] border-[#2A2A3E]" : "bg-white border-[#F0F0F0]",
      )}>
      {/* Avatar */}
      <View
        className={cn(
          "w-11 h-11 rounded-xl items-center justify-center mr-3",
          isDark ? "bg-[#2A2A3E]" : "bg-indigo-50",
        )}>
        <Text
          className={cn(
            "text-sm font-bold",
            isDark ? "text-violet-400" : "text-indigo-500",
          )}>
          {/* This should come from account Name */}
          {getInitials(item.accountId)}
        </Text>
      </View>

      {/* Info */}
      <View className="flex-1 mr-2">
        <Text
          className={cn(
            "text-[15px] font-semibold mb-0.5",
            isDark ? "text-[#F1F1F1]" : "text-[#1A1A2E]",
          )}
          numberOfLines={1}>
          {item.counterpartyId}
        </Text>
        <Text
          className={cn(
            "text-xs mb-1",
            isDark ? "text-[#9A9AB0]" : "text-gray-500",
          )}
          numberOfLines={1}>
          {item.description}
        </Text>
        <View className="flex-row items-center gap-1">
          <Text
            className={cn(
              "text-[11px]",
              isDark ? "text-[#9A9AB0]" : "text-gray-500",
            )}>
            {formatDate(item.createdAt)}
          </Text>
          <View
            className={cn(
              "w-1.5 h-1.5 rounded-full ml-1",
              STATUS_DOT_CLASS_MAP[item.status],
            )}
          />
          <Text
            className={cn(
              "text-[11px] font-medium",
              STATUS_CLASS_MAP[item.status],
            )}>
            {statusLabel}
          </Text>
        </View>
      </View>

      {/* Amount */}
      <Text
        className={cn(
          "text-[15px] font-bold",
          isCredit ? "text-green-500" : "text-red-500",
        )}>
        {isCredit ? "+" : "-"}
        {formatCurrency(Number(item.amount))}
      </Text>
    </View>
  );
}

TransactionItemBase.displayName = "TransactionItem";

export const TransactionItem = React.memo(TransactionItemBase);
