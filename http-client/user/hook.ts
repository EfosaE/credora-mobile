import { SectionedTransaction } from "@/http-client/types/transaction.type";
import {
  TransactionHistoryResponse,
  userClient,
} from "@/http-client/user/client";
import { groupTransactionsByMonthAPI } from "@/lib/util";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

export function useTransactionHistory() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useInfiniteQuery<
    TransactionHistoryResponse,
    Error,
    InfiniteData<TransactionHistoryResponse>,
    string[],
    string | null
  >({
    queryKey: ["transactions-history"],

    queryFn: async ({ pageParam }): Promise<TransactionHistoryResponse> => {
      const res = await userClient.getUserTransactionHistory(pageParam, "50");
      console.log("Infinite Query Response:", res.data);
      if (!res.data) throw new Error("No data returned");
      return res.data;
    },

    getNextPageParam: (lastPage): string | null | undefined =>
      lastPage?.nextCursor ?? undefined,

    initialPageParam: null,
  });

  const transactions: SectionedTransaction[] = useMemo(() => {
    const flat = data?.pages.flatMap((page) => page.transactions ?? []) ?? [];
    return groupTransactionsByMonthAPI(flat);
  }, [data?.pages]);

  const onEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return {
    transactions,
    onEndReached,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  };
}
