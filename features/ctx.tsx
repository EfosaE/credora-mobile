import { useStorageState } from "@/features/hooks/useSecureStore";
import { UserAccount } from "@/http-client/types/user.type";
import { use, createContext, type PropsWithChildren } from "react";

const AuthContext = createContext<{
  signIn: (token: string, user: UserAccount) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
  user: UserAccount | null;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
  user: null,
});

export function useSession() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [[isLoadingUser, storedUser], setStoredUser] = useStorageState("user");

  const user: UserAccount | null = storedUser ? JSON.parse(storedUser) : null;

  return (
    <AuthContext.Provider
      value={{
        signIn: (token: string, user: UserAccount) => {
          setSession(token);
          setStoredUser(JSON.stringify(user));
        },
        signOut: () => {
          setSession(null);
          setStoredUser(null);
        },
        session,
        isLoading: isLoading || isLoadingUser,
        user,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
