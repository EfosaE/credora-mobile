import { useState } from "react";
import { Alert } from "react-native";

export type TransferType = "external" | "internal";

type UseTransferFormParams = {
  balance: number;
  userAccountNumber: string;
};

export function useTransferForm({
  balance,
  userAccountNumber,
}: UseTransferFormParams) {
  const [transferType, setTransferType] = useState<TransferType>("external");

  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipientName, setRecipientName] = useState("");

  const resetForm = () => {
    setBank("");
    setAccountNumber("");
    setAmount("");
    setDescription("");
    setRecipientName("");
  };

  const switchType = (type: TransferType) => {
    setTransferType(type);
    resetForm();
  };

  const validate = () => {
    if (!accountNumber || accountNumber.length !== 10) {
      Alert.alert("Invalid account number");
      return false;
    }

    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0) {
      Alert.alert("Invalid amount");
      return false;
    }

    if (numericAmount > balance) {
      Alert.alert("Insufficient balance");
      return false;
    }

    if (transferType === "internal" && accountNumber === userAccountNumber) {
      Alert.alert("You cannot transfer to your own account.");
      return false;
    }

    if (transferType === "external" && !bank) {
      Alert.alert("Please select a bank");
      return false;
    }

    return true;
  };

  const buildPayload = () => {
    const numericAmount = Number(amount);

    if (transferType === "external") {
      return {
        type: "external",
        bank,
        accountNumber,
        amount: numericAmount,
        recipientName,
        description,
      };
    }

    return {
      type: "internal",
      accountNumber,
      recipientName,
      amount: numericAmount,
      description,
    };
  };

  const submit = async (onSubmit: (payload: any) => Promise<void>) => {
    if (!validate()) return;

    try {
      setLoading(true);
      const payload = buildPayload();
      await onSubmit(payload);
      resetForm();
    } finally {
      setLoading(false);
    }
  };

  const isDisabled =
    !accountNumber ||
    !amount ||
    (transferType === "external" && !bank) ||
    Number(amount) <= 100 ||
    recipientName.trim() === "";

  return {
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
    recipientName,
    setRecipientName,
  };
}
