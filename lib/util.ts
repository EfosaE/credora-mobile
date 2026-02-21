import {
  SectionedTransaction,
  Transaction,
} from "@/http-client/types/transaction.type";

export function formatCurrency(amount: number): string {
  return `₦${amount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function getInitials(title: string): string {
  return title
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function toMonthKey(iso: string): string {
  const date = new Date(iso);
  const month = date.toLocaleString("en-NG", { month: "short" });
  const year = date.getFullYear();
  return `${month}, ${year}`; // always "Jan, 2026"
}
/**
 * Groups a flat list of transactions into sections by calendar month.
 * Preserves the order of months as they are first encountered (newest first
 * assuming the array is already sorted descending by date).
 */
export function groupTransactionsByMonth(
  transactions: Transaction[],
): SectionedTransaction[] {
  const sectionMap = new Map<string, Transaction[]>();

  for (const transaction of transactions) {
    const month = toMonthKey(transaction.date);

    if (!sectionMap.has(month)) {
      sectionMap.set(month, []);
    }

    sectionMap.get(month)!.push(transaction);
  }

  return Array.from(sectionMap.entries()).map(([month, data]) => ({
    month,
    data,
  }));
}

export function groupTransactionsByMonthAPI(
  transactions: Transaction[],
): SectionedTransaction[] {
  const sectionMap = new Map<string, Transaction[]>();

  for (const transaction of transactions) {
    const month = toMonthKey(transaction.createdAt); // changed from transaction.date

    if (!sectionMap.has(month)) {
      sectionMap.set(month, []);
    }

    sectionMap.get(month)!.push(transaction);
  }

  return Array.from(sectionMap.entries()).map(([month, data]) => ({
    month,
    data,
  }));
}
