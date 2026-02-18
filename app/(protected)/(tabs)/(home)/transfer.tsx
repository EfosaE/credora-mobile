import React, { useState } from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";

import { AppScreen } from "@/components/ui/AppScreen";
import { AppText } from "@/components/ui/AppText";
import { AppInput } from "@/components/ui/AppInput";
import { AppButton } from "@/components/ui/AppButton";
import { AppSelectModal } from "@/components/AppSelectModal";

const BANKS = [
  { label: "Access Bank", value: "access" },
  { label: "GTBank", value: "gtb" },
  { label: "First Bank", value: "first" },
  { label: "UBA", value: "uba" },
  { label: "Zenith Bank", value: "zenith" },
];

type Beneficiary = {
  id: string;
  name: string;
};

const BENEFICIARIES: Beneficiary[] = [
  { id: "1", name: "Savannah" },
  { id: "2", name: "Jennifer" },
  { id: "3", name: "Albert" },
  { id: "4", name: "Leslie" },
  { id: "5", name: "Kathryn" },
];

export default function Transfer() {
  const [bankModalOpen, setBankModalOpen] = useState(false);

  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const isDisabled = !bank || !accountNumber || !amount;

  return (
    <>
      <AppSelectModal
        visible={bankModalOpen}
        title="Select Bank"
        options={BANKS}
        selectedValue={BANKS.find((b) => b.label === bank)?.value}
        onSelect={(option) => {
          setBank(option.label);
        }}
        onClose={() => setBankModalOpen(false)}
      />

      <AppScreen>
        <KeyboardAwareScrollView
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingVertical: 24,
          }}>
          {/* Balance */}
          <View className="mb-6">
            <AppText className="text-sm opacity-60 mb-1">
              Available Balance
            </AppText>
            <AppText className="text-2xl font-bold text-green-600">
              ₦ 294,843.43
            </AppText>
          </View>

          {/* Frequent Beneficiaries */}
          <View className="mb-6">
            <AppText className="font-semibold mb-3">
              Frequent Beneficiaries
            </AppText>

            <FlatList
              data={BENEFICIARIES}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ gap: 12 }}
              renderItem={({ item }) => (
                <TouchableOpacity className="items-center">
                  <View className="w-12 h-12 rounded-full bg-blue-100 items-center justify-center mb-1">
                    <AppText className="font-semibold text-primary">
                      {item.name.charAt(0)}
                    </AppText>
                  </View>
                  <AppText className="text-xs opacity-70">{item.name}</AppText>
                </TouchableOpacity>
              )}
            />
          </View>

          {/* Bank Selector */}
          <View className="mb-4">
            <AppText className="text-sm opacity-70 mb-1">Bank</AppText>
            <TouchableOpacity
              onPress={() => {
                setBankModalOpen(true);
              }}
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
          <View className="mb-8">
            <AppText className="text-sm opacity-70 mb-1">Description</AppText>
            <AppInput
              placeholder="Enter description"
              value={description}
              onChangeText={setDescription}
            />
          </View>

          {/* Submit */}
          <AppButton
            title="Make Transfer"
            disabled={isDisabled}
            onPress={() => {
              // handle transfer
            }}
          />
        </KeyboardAwareScrollView>
      </AppScreen>
    </>
  );
}
