import { AccountPickerModal } from "@/components/transfer/AccountPickerModal";
import { DebitAccountSelector } from "@/components/transfer/DebitAccountSelector";
import { ExternalTransferForm } from "@/components/transfer/ExternalTransferForm";
import { InternalTransferForm } from "@/components/transfer/InternalTransferForm";
import { TransferTabs } from "@/components/transfer/TransferTabs";
import { AppButton } from "@/components/ui/AppButton";
import { AppScreen } from "@/components/ui/AppScreen";
import { useSession } from "@/features/ctx";
import { useTransferForm } from "@/features/hooks/useTransfer";
import { transferClient } from "@/http-client/transfer/client";
import * as Crypto from "expo-crypto";
import { router } from "expo-router";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Transfer() {
  const { user } = useSession();
  const [selectedAccount, setSelectedAccount] = useState(user!.accounts[0]);

  const [showAccountPicker, setShowAccountPicker] = useState(false);

  const {
    transferType,
    switchType,
    bank,
    setBank,
    accountNumber,
    setAccountNumber,
    amount,
    setAmount,
    description,
    setDescription,
    loading,
    submit,
    isDisabled,
    setRecipientName,
    recipientName,
  } = useTransferForm({
    
    balance: Number(selectedAccount.balance),
    userAccountNumber: selectedAccount.accountNumber,
  });

  type HandleSubmitPayload =
    | {
        type: string;
        bank: string;
        accountNumber: string;
        amount: number;
        description: string;
      }
    | {
        type: string;
        accountNumber: string;
        amount: number;
        description: string;
        bank?: undefined;
      };

  const handleSubmit = async (payload: HandleSubmitPayload) => {
    const idempotencyKey = Crypto.randomUUID();
    console.log("Sending:", payload);
    if (payload.type === "external") {
      // call external transfer API here
      console.log("External transfer payload:", payload);
      return;
    }

    const res = await transferClient.makeInternalTransfer(
      {
        fromAccount: selectedAccount.accountNumber,
        toAccount: payload.accountNumber,
        amount: payload.amount.toString(),
        currency: selectedAccount.currency,
        description:
          payload.description.trim() === ""
            ? `Internal Transfer to ${payload.accountNumber}`
            : payload.description,
      },
      idempotencyKey,
    );
    console.log("Response:", res);
    // POLL THE RESPONSE FOR THE FINAL RESULT & OPEN A MODAL
    if (res?.data?.transferId) {
      router.push({
        pathname: "/transfer-modal",
        params: {
          transferId: res.data.transferId,
          amount: payload.amount.toString(),
          recipientName: recipientName || "Unknown Recipient",
        },
      });
    }
  };

  return (
    <AppScreen>
      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 24,
        }}>
        <TransferTabs value={transferType} onChange={switchType} />

        <DebitAccountSelector
          accounts={user!.accounts}
          selectedAccount={selectedAccount}
          onPress={() => setShowAccountPicker(true)}
        />

        {transferType === "external" ? (
          <ExternalTransferForm
            bank={bank}
            setBank={setBank}
            accountNumber={accountNumber}
            setAccountNumber={setAccountNumber}
            amount={amount}
            setAmount={setAmount}
            description={description}
            setDescription={setDescription}
          />
        ) : (
          <InternalTransferForm
            accountNumber={accountNumber}
            setAccountNumber={setAccountNumber}
            amount={amount}
            setAmount={setAmount}
            description={description}
            setDescription={setDescription}
            setRecipientName={setRecipientName}
          />
        )}

        <AppButton
          title="Make Transfer"
          disabled={isDisabled || loading}
          loading={loading}
          onPress={() => submit(handleSubmit)}
        />
        <AccountPickerModal
          visible={showAccountPicker}
          accounts={user!.accounts}
          selectedAccount={selectedAccount}
          onClose={() => setShowAccountPicker(false)}
          onSelect={setSelectedAccount}
        />
      </KeyboardAwareScrollView>
    </AppScreen>
  );
}
