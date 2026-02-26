import { useSession } from "@/features/ctx";
import { useNotifications } from "@/features/hooks/useNotifications";
import { ReactNode } from "react";

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { user } = useSession();
  useNotifications(user?.userId ?? null);

  return <>{children}</>;
}
