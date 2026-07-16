import { useSession } from "@/features/ctx";
import { useNotifications } from "@/features/hooks/useNotifications";
import { ReactNode } from "react";

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { user } = useSession();
  console.log("NotificationProvider user:", user?.id);
  useNotifications(user?.id ?? null);

  return <>{children}</>;
}
