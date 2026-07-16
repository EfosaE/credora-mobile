export type Account = {
  id: string;
  userId: string;
  userName: string;
  accountNumber: string;
  accountType: string;
  bankName: string;
  balance: string;
  monnifyCustomerReference: string;
  createdAt: string;
  updatedAt: string;
  currency: string;
};

export type UserAccount = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  isVerified: boolean;
  nin: string;
  balance: string;
  accounts: Account[];
  createdAt: string;
  updatedAt: string;
};
