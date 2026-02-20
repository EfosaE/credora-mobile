import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { AppText } from "@/components/ui/AppText";
import { AppInput } from "@/components/ui/AppInput";
import { AppSelectModal } from "@/components/AppSelectModal";

const BANKS = [
  { label: "Access Bank", value: "access" },
  { label: "GTBank", value: "gtb" },
  { label: "First Bank", value: "first" },
  { label: "UBA", value: "uba" },
  { label: "Zenith Bank", value: "zenith" },
];

type Props = {
  bank: string;
  setBank: (v: string) => void;
  accountNumber: string;
  setAccountNumber: (v: string) => void;
  amount: string;
  setAmount: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
};

export function ExternalTransferForm({
  bank,
  setBank,
  accountNumber,
  setAccountNumber,
  amount,
  setAmount,
  description,
  setDescription,
}: Props) {
  const [bankModalOpen, setBankModalOpen] = useState(false);

  return (
    <>
      <AppSelectModal
        visible={bankModalOpen}
        title="Select Bank"
        options={BANKS}
        selectedValue={BANKS.find((b) => b.label === bank)?.value}
        onSelect={(option) => {
          setBank(option.label);
          setBankModalOpen(false);
        }}
        onClose={() => setBankModalOpen(false)}
      />

      {/* Bank Selector */}
      <View className="mb-4">
        <AppText className="text-sm opacity-70 mb-1">Bank</AppText>
        <TouchableOpacity
          onPress={() => setBankModalOpen(true)}
          className="flex-row items-center justify-between border border-gray-200 rounded-xl px-4 py-2 h-12">
          <AppText className={bank ? "" : "opacity-40"}>
            {bank || "Select bank"}
          </AppText>
          <Ionicons name="chevron-down" size={18} color="#888" />
        </TouchableOpacity>
      </View>

      {/* Account Number */}
      <View className="mb-4">
        <AppText className="text-sm opacity-70 mb-1">
          Beneficiary account number
        </AppText>
        <AppInput
          placeholder="Enter account number"
          keyboardType="number-pad"
          value={accountNumber}
          onChangeText={setAccountNumber}
          maxLength={10}
        />
      </View>

      {/* Amount */}
      <View className="mb-4">
        <AppText className="text-sm opacity-70 mb-1">Amount</AppText>
        <AppInput
          placeholder="Enter amount"
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
