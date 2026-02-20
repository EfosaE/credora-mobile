import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useQuery } from "@tanstack/react-query";

import { AppText } from "@/components/ui/AppText";
import { AppInput } from "@/components/ui/AppInput";
import { transferClient } from "@/http-client/transfer/client";

type Props = {
  accountNumber: string;
  setAccountNumber: (v: string) => void;
  amount: string;
  setAmount: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  setRecipientName: (v: string) => void;
};

export function InternalTransferForm({
  accountNumber,
  setAccountNumber,
  amount,
  setAmount,
  description,
  setDescription,
  setRecipientName,
}: Props) {
  const isValidAccountNumber = accountNumber.length === 10;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["internalRecipient", accountNumber],
    queryFn: () => transferClient.getRecipientName(accountNumber),
    enabled: isValidAccountNumber, // only run when 10 digits
    retry: false,
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });

  // console.log("Query Data", data);

  const recipientName = data?.data?.user.name ?? null;

  useEffect(() => {
    setRecipientName(recipientName || "");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipientName]);

  return (
    <>
      {/* Account Number */}
      <View className="mb-2">
        <AppText className="text-sm opacity-70 mb-1">
          Credora account number
        </AppText>
        <AppInput
          placeholder="Enter account number"
          keyboardType="number-pad"
          value={accountNumber}
          onChangeText={setAccountNumber}
          maxLength={10}
        />
      </View>

      {/* Recipient Status */}
      {isLoading && (
        <View className="mb-4 flex-row items-center">
          <ActivityIndicator size="small" />
          <AppText className="ml-2 text-sm opacity-70">
            Verifying account...
          </AppText>
        </View>
      )}

      {recipientName && !isLoading && (
        <View className="mb-4">
          <AppText className="text-sm text-green-600 font-semibold">
            {recipientName}
          </AppText>
        </View>
      )}

      {isError && !isLoading && (
        <View className="mb-4">
          <AppText className="text-sm text-red-500">
            {error instanceof Error
              ? error.message
              : "Unable to verify account"}
          </AppText>
        </View>
      )}

      {/* Amount */}
      <View className="mb-4">
        <AppText className="text-sm opacity-70 mb-1">Amount</AppText>
        <AppInput
          placeholder="Enter amount greater than ₦100"
          keyboardType="number-pad"
          value={amount}
          onChangeText={setAmount}
        />
      </View>

      {/* Description */}
      <View className="mb-6">
        <AppText className="text-sm opacity-70 mb-1">Description</AppText>
        <AppInput
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
        />
      </View>
    </>
  );
}
