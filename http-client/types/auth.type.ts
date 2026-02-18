import { UserAccount } from "@/http-client/types/user.type";

export interface LoginResponse {
  accessToken: string;
  user: UserAccount;
}
