import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import * as Sharing from "expo-sharing";
import { Ionicons } from "@expo/vector-icons";

import { AppScreen } from "@/components/ui/AppScreen";
import { AppText } from "@/components/ui/AppText";
import { AppButton } from "@/components/ui/AppButton";

import { generateReceiptPdf } from "@/lib/generateReceipt";
import { ReceiptCard } from "@/components/CustomReceiptCard";

export default function ReceiptPreviewScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const { amount, transferId, date, recipientName, uri } =
    useLocalSearchParams<{
      amount: string;
      transferId: string;
      date: string;
      recipientName: string;
      /** Pre-generated PDF uri — if passed we skip re-generating on share */
      uri?: string;
    }>();

  const [isSharing, setIsSharing] = useState(false);

  const handleSharePdf = async () => {
    try {
      setIsSharing(true);

      let pdfUri = uri;

      if (!pdfUri) {
        const result = await generateReceiptPdf({
          amount: amount ?? "",
          transferId: transferId ?? "",
          date: date ?? "",
          recipientName: recipientName ?? "",
        });
        pdfUri = result.uri;
      }

      const canShare = await Sharing.isAvailableAsync();
      if (!canShare) {
        alert("Sharing is not available on this device.");
        return;
      }

      await Sharing.shareAsync(pdfUri, {
        mimeType: "application/pdf",
        dialogTitle: "Share Receipt",
        UTI: "com.adobe.pdf",
      });
    } catch (err) {
      console.error("Share error:", err);
      alert("Could not share the receipt. Please try again.");
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <AppScreen>
      {/* ── Nav bar ── */}
      <View className="flex-row items-center px-4 py-3 border-b border-gray-100 dark:border-gray-800">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-9 items-start justify-center"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons
            name="chevron-back"
            size={24}
            color={isDark ? "#F9FAFB" : "#111827"}
          />
        </TouchableOpacity>

        <AppText className="flex-1 text-center text-base font-semibold text-gray-900 dark:text-gray-50">
          Receipt
        </AppText>

        {/* Spacer keeps title centred */}
        <View className="w-9" />
      </View>

      {/* ── Scrollable receipt card ── */}
      <ScrollView
        className="flex-1"
        contentContainerClassName="p-5 pb-8"
        showsVerticalScrollIndicator={false}>
        <ReceiptCard
          amount={amount ?? "0"}
          transferId={transferId ?? "—"}
          date={date ?? "—"}
          recipientName={recipientName ?? "—"}
          status="SUCCESS"
        />

        <AppText className="text-[12px] text-center text-gray-400 dark:text-gray-600 mt-4">
          A PDF copy will be generated when you share.
        </AppText>
      </ScrollView>

      {/* ── Sticky bottom bar ── */}
      <View className="px-5 pt-4 pb-8 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
        <AppButton
          title={isSharing ? "Preparing PDF…" : "Share as PDF"}
          onPress={handleSharePdf}
          disabled={isSharing}
          loading={isSharing}
        />

        <AppButton
          title="Done"
          className="mt-3"
          onPress={() => router.replace("/")}
        />
      </View>
    </AppScreen>
  );
}
