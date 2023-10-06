export type SignUpData = {
  email: string;
  password: string;
  passwordConfirmation: string;
  confirm_success_url: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type UpdateUserData = {
  name: string | undefined;
  nickname: string | undefined;
  email: string | undefined;
};

export type UpdatePasswordData = {
  password: string;
  passwordConfirmation: string;
};
