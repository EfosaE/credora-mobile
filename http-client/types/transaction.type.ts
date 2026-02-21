export type SectionedTransaction = {
  month: string; // e.g. "Jan, 2026"
  data: Transaction[];
};
export type Transaction = {
  id: number;
  accountId: string;
  counterpartyId: string;
  amount: string; // string because backend returns numeric as string
  direction: "DEBIT" | "CREDIT";
  status: "SUCCESS" | "FAILED" | "PENDING";
  description: string;
  reference: string;
  channel: "INTERNAL_TRANSFER" | string; // keep extensible
  createdAt: string; // ISO timestamp
};

export const CONTENT_CONTAINER_STYLE = {
  padding: 16,
  paddingBottom: 32,
  flexGrow: 1,
} as const;

export const STATUS_CLASS_MAP: Record<Transaction["status"], string> = {
  SUCCESS: "text-green-500",
  PENDING: "text-amber-500",
  FAILED: "text-red-500",
};

export const STATUS_DOT_CLASS_MAP: Record<Transaction["status"], string> = {
  SUCCESS: "bg-green-500",
  PENDING: "bg-amber-500",
  FAILED: "bg-red-500",
};
