import React from "react";
import { View, StyleSheet } from "react-native";
import { AppText } from "@/components/ui/AppText";

export type ReceiptCardProps = {
  amount: string;
  transferId: string;
  date: string;
  recipientName: string;
  status?: "SUCCESS" | "FAILED";
};

// ─── Row ─────────────────────────────────────────────────────────────────────

function ReceiptRow({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <View className="flex-row justify-between items-center py-3">
      <AppText className="text-[13px] text-gray-500 dark:text-gray-400 flex-1">
        {label}
      </AppText>
      <AppText
        className={`text-[13px] font-semibold flex-[1.5] text-right text-gray-900 dark:text-gray-50 ${
          valueClassName ?? ""
        }`}
        numberOfLines={1}
        ellipsizeMode="middle">
        {value}
      </AppText>
    </View>
  );
}

// ─── Divider ─────────────────────────────────────────────────────────────────

function Divider() {
  return <View className="border-b border-gray-100 dark:border-gray-700" />;
}

// ─── Perforated edge ──────────────────────────────────────────────────────────
// The half-circles need a negative-margin trick NativeWind can't express,
// so only those two views keep a tiny StyleSheet entry. Everything else is className.

const circleStyles = StyleSheet.create({
  left: { marginLeft: -9 },
  right: { marginRight: -9 },
});

function PerforatedEdge() {
  return (
    <View className="flex-row items-center my-0.5">
      <View
        className="w-[18px] h-[18px] rounded-full bg-gray-100 dark:bg-gray-800"
        style={circleStyles.left}
      />

      <View className="flex-1 flex-row justify-between items-center px-2">
        {Array.from({ length: 12 }).map((_, i) => (
          <View
            key={i}
            className="w-1.5 h-0.5 rounded-full bg-gray-200 dark:bg-gray-700"
          />
        ))}
      </View>

      <View
        className="w-[18px] h-[18px] rounded-full bg-gray-100 dark:bg-gray-800"
        style={circleStyles.right}
      />
    </View>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function ReceiptCard({
  amount,
  transferId,
  date,
  recipientName,
  status = "SUCCESS",
}: ReceiptCardProps) {
  const isSuccess = status === "SUCCESS";

  return (
    <View
      className="rounded-2xl overflow-hidden bg-white dark:bg-gray-900"
      // RN shadows can't be expressed in NativeWind — kept as inline style
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 6,
      }}>
      {/* ── Header ── */}
      <View className="bg-blue-50 dark:bg-blue-950 items-center px-6 pt-7 pb-5">
        <AppText className="text-[22px] font-extrabold text-blue-600 dark:text-blue-400 tracking-wide">
          Credora
        </AppText>

        <AppText className="text-[13px] text-blue-400 dark:text-blue-300 mt-0.5 opacity-80">
          Transaction Receipt
        </AppText>

        {/* Status badge */}
        <View
          className={`mt-3.5 px-4 py-1.5 rounded-full ${
            isSuccess
              ? "bg-green-100 dark:bg-green-950"
              : "bg-red-100 dark:bg-red-950"
          }`}>
          <AppText
            className={`text-[13px] font-semibold ${
              isSuccess
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}>
            {isSuccess ? "✓  Transfer Successful" : "✗  Transfer Failed"}
          </AppText>
        </View>
      </View>

      {/* ── Amount hero ── */}
      <View className="items-center py-6 px-6">
        <AppText className="text-[11px] uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1.5">
          Amount Sent
        </AppText>
        <AppText className="text-[38px] font-bold tracking-tight text-gray-900 dark:text-gray-50">
          ₦{amount}
        </AppText>
      </View>

      {/* ── Perforated tear line ── */}
      <PerforatedEdge />

      {/* ── Detail rows ── */}
      <View className="px-6 pt-5 pb-2">
        <ReceiptRow label="Recipient" value={recipientName} />
        <Divider />
        <ReceiptRow label="Transfer ID" value={transferId} />
        <Divider />
        <ReceiptRow label="Date & Time" value={date} />
        <Divider />
        <ReceiptRow
          label="Status"
          value={status}
          valueClassName={
            isSuccess
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }
        />
      </View>

      {/* ── Footer ── */}
      <View className="border-t border-gray-100 dark:border-gray-700 py-4 items-center">
        <AppText className="text-[12px] text-gray-400 dark:text-gray-600">
          Thank you for banking with Credora
        </AppText>
      </View>
    </View>
  );
}
