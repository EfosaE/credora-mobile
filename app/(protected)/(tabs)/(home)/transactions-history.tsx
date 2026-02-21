import { useTheme } from "@/features/ThemeProvider";
import { cn } from "@/lib/cn";
import React, { useCallback, useMemo } from "react";
import { SectionList, View } from "react-native";
// import { useTransactions } from "@/features/hooks/useTransactions";
import { ItemSeparator } from "@/components/transactions/ItemSeparator";
import { TransactionListFooter } from "@/components/transactions/TransactionFooter";
import { TransactionHeader } from "@/components/transactions/TransactionHeader";
import { TransactionItem } from "@/components/transactions/TransactionItem";
import { TransactionListEmpty } from "@/components/transactions/TransactionListEmpty";
import { TransactionScreenError } from "@/components/transactions/TransactionScreenError";
import { TransactionScreenLoader } from "@/components/transactions/TransactionScreenLoader";
import { AppText } from "@/components/ui/AppText";

import {
  CONTENT_CONTAINER_STYLE,
  SectionedTransaction,
  Transaction,
} from "@/http-client/types/transaction.type";
import { useTransactionHistory } from "@/http-client/user/hook";

export default function TransactionScreen() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const {
    transactions,
    onEndReached,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useTransactionHistory();

  const renderItem = useCallback(
    ({ item }: { item: Transaction }) => (
      <TransactionItem item={item} theme={theme} />
    ),
    [theme],
  );

  const renderSectionHeader = useCallback(
    ({ section }: { section: SectionedTransaction }) => (
      <AppText>{section.month}</AppText>
    ),
    [],
  );

  const keyExtractor = useCallback(
    (item: Transaction) => item.id.toString(),
    [],
  );

  const listFooter = useMemo(
    () => (
      <TransactionListFooter
        isDark={isDark}
        isFetchingNextPage={isFetchingNextPage}
      />
    ),
    [isDark, isFetchingNextPage],
  );

  const listEmpty = useMemo(
    () => <TransactionListEmpty isDark={isDark} isLoading={isLoading} />,
    [isDark, isLoading],
  );

  if (isLoading) return <TransactionScreenLoader isDark={isDark} />;
  if (isError)
    return <TransactionScreenError isDark={isDark} onRetry={refetch} />;

  return (
    <View className={cn("flex-1", isDark ? "bg-[#0F0F1A]" : "bg-[#F5F5FA]")}>
      <TransactionHeader
        isDark={isDark}
        loaded={transactions.length}
        // total={total}
      />
      {/* <FlatList
        data={transactions}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.3}
        ListFooterComponent={listFooter}
        ListEmptyComponent={listEmpty}
        contentContainerStyle={CONTENT_CONTAINER_STYLE}
        ItemSeparatorComponent={ItemSeparator}
        showsVerticalScrollIndicator={false}
      /> */}

      <SectionList
        sections={transactions}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.3}
        ListFooterComponent={listFooter}
        ListEmptyComponent={listEmpty}
        contentContainerStyle={CONTENT_CONTAINER_STYLE}
        ItemSeparatorComponent={ItemSeparator}
        SectionSeparatorComponent={ItemSeparator}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
      />
    </View>
  );
}
