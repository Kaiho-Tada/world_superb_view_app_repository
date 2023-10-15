export type User = {
  id: number;
  email: string;
  uid: string;
  provider: string;
  name: string;
  nickname?: string;
  image?: string;
  allowPasswordChange: boolean;
};
