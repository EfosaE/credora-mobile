import { ExternalTransferForm } from "@/components/transfer/ExternalTransferForm";
import { InternalTransferForm } from "@/components/transfer/InternalTransferForm";
import { TransferTabs } from "@/components/transfer/TransferTabs";
import { AppButton } from "@/components/ui/AppButton";
import { AppScreen } from "@/components/ui/AppScreen";
import { AppText } from "@/components/ui/AppText";
import { useSession } from "@/features/ctx";
import { useTransferForm } from "@/features/hooks/useTransfer";
import { transferClient } from "@/http-client/transfer/client";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Crypto from "expo-crypto";
import { router } from "expo-router";

export default function Transfer() {
  const { user } = useSession();

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
    balance: Number(user!.balance),
    userAccountNumber: user!.accountNumber,
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
        toAccount: payload.accountNumber,
        amount: payload.amount.toString(),
        currency: "NGN",
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
      </KeyboardAwareScrollView>
    </AppScreen>
  );
}
