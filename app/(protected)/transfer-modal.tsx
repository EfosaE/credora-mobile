import { View, ActivityIndicator } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";

// import * as Sharing from "expo-sharing";
// import { File, Paths } from "expo-file-system";

import { AppScreen } from "@/components/ui/AppScreen";
import { AppText } from "@/components/ui/AppText";
import { AppButton } from "@/components/ui/AppButton";
import { transferClient } from "@/http-client/transfer/client";
import { useEffect, useState } from "react";
import { generateReceiptPdf } from "@/lib/generateReceipt";

type Status = "pending" | "success" | "failed";

export default function TransferResultModal() {
  const [receiptUri, setReceiptUri] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { transferId, amount, recipientName } = useLocalSearchParams<{
    transferId: string;
    amount: string;
    recipientName: string;
  }>();

  const formattedAmount = Number(amount ?? 0).toLocaleString();
  const transferDate = new Date().toLocaleString();

  // ── Poll transfer status ──────────────────────────────────────────────────
  const { data } = useQuery({
    queryKey: ["transfer-status", transferId],
    queryFn: async () => {
      const res = await transferClient.getTransferStatus(transferId);
      return res?.data?.status.status;
    },
    refetchInterval: (query) => {
      const status = query.state.data;
      if (status === "SUCCESS" || status === "FAILED") return false;
      return 3000;
    },
    enabled: !!transferId,
  });

  // ── Auto-generate PDF when transfer succeeds ──────────────────────────────
  const generateReceipt = async () => {
    try {
      const { uri } = await generateReceiptPdf({
        amount: formattedAmount,
        transferId: transferId ?? "",
        date: transferDate,
        recipientName: recipientName ?? "",
      });
      setReceiptUri(uri);
    } catch (err) {
      console.log("Receipt generation failed:", err);
    }
  };

  useEffect(() => {
    if (data === "SUCCESS") {
      queryClient.invalidateQueries({ queryKey: ["user-balance"] });
      generateReceipt();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const status: Status =
    data === "SUCCESS" ? "success" : data === "FAILED" ? "failed" : "pending";

  // ── Shared receipt preview params ─────────────────────────────────────────
  const receiptParams = {
    amount: formattedAmount,
    transferId: transferId ?? "",
    date: transferDate,
    recipientName: recipientName ?? "",
    uri: receiptUri ?? "",
  };

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleViewReceipt = () => {
    router.push({
      pathname: "/receipt-preview",
      params: receiptParams,
    });
  };

  // const handleShareDirect = async () => {
  //   if (!receiptUri) return;
  //   await Sharing.shareAsync(receiptUri, { mimeType: "application/pdf" });
  // };

  // const handleSave = async () => {
  //   if (!receiptUri) return;
  //   const fileName = `Credora-Receipt-${transferId}.pdf`;
  //   try {
  //     const sourceFile = new File(receiptUri);
  //     const destination = new File(Paths.document, fileName);
  //     sourceFile.copy(destination);
  //     alert("Receipt saved successfully.");
  //   } catch (err) {
  //     console.log("Save file error:", err);
  //     alert("Could not save receipt.");
  //   }
  // };

  return (
    <AppScreen>
      <View className="flex-1 justify-center items-center px-6">
        {/* ── Pending ── */}
        {status === "pending" && (
          <View className="items-center">
            {/* Animated ring */}
            <View className="w-24 h-24 rounded-full bg-blue-50 dark:bg-blue-950 items-center justify-center mb-6">
              <ActivityIndicator size="large" color="#2563EB" />
            </View>

            <AppText className="text-xl font-bold text-center text-gray-900 dark:text-gray-50">
              Processing Transfer
            </AppText>
            <AppText className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400 leading-5">
              Please wait while we confirm{"\n"}your transaction.
            </AppText>

            {/* Transfer details while waiting */}
            <View className="mt-8 w-full bg-gray-50 dark:bg-gray-800 rounded-2xl px-5 py-4 gap-3">
              <View className="flex-row justify-between">
                <AppText className="text-sm text-gray-500 dark:text-gray-400">
                  Amount
                </AppText>
                <AppText className="text-sm font-semibold text-gray-900 dark:text-gray-50">
                  ₦{formattedAmount}
                </AppText>
              </View>
              {recipientName ? (
                <View className="flex-row justify-between">
                  <AppText className="text-sm text-gray-500 dark:text-gray-400">
                    To
                  </AppText>
                  <AppText className="text-sm font-semibold text-gray-900 dark:text-gray-50">
                    {recipientName}
                  </AppText>
                </View>
              ) : null}
              <View className="flex-row justify-between">
                <AppText className="text-sm text-gray-500 dark:text-gray-400">
                  Transfer ID
                </AppText>
                <AppText
                  className="text-sm font-semibold text-gray-900 dark:text-gray-50 max-w-[55%] text-right"
                  numberOfLines={1}
                  ellipsizeMode="middle">
                  {transferId}
                </AppText>
              </View>
            </View>
          </View>
        )}

        {/* ── Success ── */}
        {status === "success" && (
          <View className="items-center w-full">
            {/* Icon */}
            <View className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-950 items-center justify-center">
              <Ionicons name="checkmark-circle" size={52} color="#16A34A" />
            </View>

            <AppText className="mt-5 text-2xl font-bold text-green-600 dark:text-green-400">
              Transfer Successful
            </AppText>

            {/* Amount */}
            <AppText className="mt-1 text-[42px] font-bold tracking-tight text-gray-900 dark:text-gray-50">
              ₦{formattedAmount}
            </AppText>

            {/* Recipient */}
            {recipientName ? (
              <AppText className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Sent to{" "}
                <AppText className="font-semibold text-gray-700 dark:text-gray-200">
                  {recipientName}
                </AppText>
              </AppText>
            ) : null}

            {/* Transfer ID pill */}
            <View className="mt-3 px-4 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
              <AppText
                className="text-xs text-gray-500 dark:text-gray-400"
                numberOfLines={1}
                ellipsizeMode="middle">
                ID: {transferId}
              </AppText>
            </View>

            {/* Summary card */}
            <View className="mt-6 w-full bg-gray-50 dark:bg-gray-800 rounded-2xl px-5 py-4 gap-3">
              <View className="flex-row justify-between">
                <AppText className="text-sm text-gray-500 dark:text-gray-400">
                  Date
                </AppText>
                <AppText className="text-sm font-medium text-gray-900 dark:text-gray-50">
                  {transferDate}
                </AppText>
              </View>
              <View className="border-t border-gray-100 dark:border-gray-700" />
              <View className="flex-row justify-between">
                <AppText className="text-sm text-gray-500 dark:text-gray-400">
                  Status
                </AppText>
                <View className="flex-row items-center gap-1">
                  <View className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <AppText className="text-sm font-semibold text-green-600 dark:text-green-400">
                    Completed
                  </AppText>
                </View>
              </View>
            </View>

            {/* Actions */}
            <View className="mt-6 w-full gap-3">
              <AppButton
                title="View Receipt"
                className="w-full"
                onPress={handleViewReceipt}
              />

              <AppButton
                title="Done"
                className="w-full"
                onPress={() => router.replace("/")}
              />
            </View>
          </View>
        )}

        {/* ── Failed ── */}
        {status === "failed" && (
          <View className="items-center w-full">
            {/* Icon */}
            <View className="w-24 h-24 rounded-full bg-red-100 dark:bg-red-950 items-center justify-center">
              <Ionicons name="close-circle" size={52} color="#DC2626" />
            </View>

            <AppText className="mt-5 text-2xl font-bold text-red-600 dark:text-red-400">
              Transfer Failed
            </AppText>

            <AppText className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400 leading-5">
              Something went wrong while processing{"\n"}your transfer. Your
              money is safe.
            </AppText>

            {/* Failed transfer details */}
            <View className="mt-6 w-full bg-gray-50 dark:bg-gray-800 rounded-2xl px-5 py-4 gap-3">
              <View className="flex-row justify-between">
                <AppText className="text-sm text-gray-500 dark:text-gray-400">
                  Amount
                </AppText>
                <AppText className="text-sm font-semibold text-gray-900 dark:text-gray-50">
                  ₦{formattedAmount}
                </AppText>
              </View>
              {recipientName ? (
                <View className="flex-row justify-between">
                  <AppText className="text-sm text-gray-500 dark:text-gray-400">
                    To
                  </AppText>
                  <AppText className="text-sm font-semibold text-gray-900 dark:text-gray-50">
                    {recipientName}
                  </AppText>
                </View>
              ) : null}
              <View className="border-t border-gray-100 dark:border-gray-700" />
              <View className="flex-row justify-between">
                <AppText className="text-sm text-gray-500 dark:text-gray-400">
                  Status
                </AppText>
                <View className="flex-row items-center gap-1">
                  <View className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <AppText className="text-sm font-semibold text-red-600 dark:text-red-400">
                    Failed
                  </AppText>
                </View>
              </View>
            </View>

            <View className="mt-6 w-full gap-3">
              <AppButton
                title="Try Again"
                className="w-full"
                onPress={() => router.back()}
              />

              <AppButton
                title="Go Home"
                className="w-full"
                onPress={() => router.replace("/")}
              />
            </View>
          </View>
        )}
      </View>
    </AppScreen>
  );
}
