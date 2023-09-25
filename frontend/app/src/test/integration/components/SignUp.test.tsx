import { act, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import { SignUp } from "components/pages/SignUp";
import { AuthProvider } from "hooks/providers/useAuthProvider";
import client from "lib/api/client";

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

const mockUseToast = jest.fn();
jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useToast: () => mockUseToast,
}));

const mockSetLoading = jest.fn();

jest.mock('hooks/providers/useAuthProvider', () => ({
  ...jest.requireActual('hooks/providers/useAuthProvider'),
  useAuth: () => ({
    setLoading: mockSetLoading,
  }),
}));

const mockAxios = new MockAdapter(client);

test('新規登録フォームの見出しが表示されていること', () => {
  render(
    <AuthProvider>
      <SignUp />
    </AuthProvider>
  );
  const signUpHeading = screen.getByRole('heading', { name: "新規登録"});
  expect(signUpHeading).toBeInTheDocument();
});

test('emailラベルが表示されていること', () => {
  render(
    <AuthProvider>
      <SignUp />
    </AuthProvider>
  );
  const emailLabel = screen.getByRole('heading', { name: "Email"});
  expect(emailLabel).toBeInTheDocument();
});

test('メールアドレスの記入欄が存在すること', () => {
  render(
    <AuthProvider>
      <SignUp />
    </AuthProvider>
  );
  const emailInput = screen.getByRole('textbox', {name: ""});
  expect(emailInput).toBeInTheDocument();
});

test('パスワードラベルが表示されていること', () => {
  render(
    <AuthProvider>
      <SignUp />
    </AuthProvider>
  );
  const passwordLabel = screen.getByRole('heading', { name: "パスワード"});
  expect(passwordLabel).toBeInTheDocument();
});

test('パスワードの記入欄が存在すること', () => {
  render(
    <AuthProvider>
      <SignUp />
    </AuthProvider>
  );
  const passwordInput = screen.getByPlaceholderText('6文字以上の半角英数字');
  expect(passwordInput).toBeInTheDocument();
});

test('パスワード確認ラベルが表示されていること', () => {
  render(
    <AuthProvider>
      <SignUp />
    </AuthProvider>
  );
  const passwordLabel = screen.getByRole('heading', { name: "パスワード確認"});
  expect(passwordLabel).toBeInTheDocument();
});

test('パスワード確認の記入欄が存在すること', () => {
  render(
    <AuthProvider>
      <SignUp />
    </AuthProvider>
  );
  const passwordConfirmationInput = screen.getByPlaceholderText('パスワードを確認してください');
  expect(passwordConfirmationInput).toBeInTheDocument();
});

test('新規登録ボタンが存在すること', () => {
  render(
    <AuthProvider>
      <SignUp />
    </AuthProvider>
  );
  const signUpButton = screen.getByRole('button', { name: "新規登録"});
  expect(signUpButton).toBeInTheDocument();
});

test('サインアップ成功時の処理のテスト', async () => {
  mockAxios.onPost('/auth').reply(200);

  const user = userEvent.setup();
  render(
    <AuthProvider>
      <SignUp />
    </AuthProvider>
  );
  const emailInput = screen.getByRole("textbox", { name: "" }) as HTMLInputElement;
  const passwordInput = screen.getByPlaceholderText('6文字以上の半角英数字') as HTMLInputElement;
  const passwordConfirmationInput = screen.getByPlaceholderText('パスワードを確認してください') as HTMLInputElement;

  const signUpButton = screen.getByRole('button', { name: "新規登録"});

  expect(emailInput.value).toBe("");
  expect(passwordInput.value).toBe("");
  expect(passwordConfirmationInput.value).toBe("");

  expect(signUpButton).toBeDisabled();
  await act(async () => {
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password");
    await user.type(passwordConfirmationInput, "password");
  });

  expect(signUpButton).not.toBeDisabled();
  await act(async () => {
    await user.click(signUpButton);
  });

  expect(mockSetLoading).toHaveBeenCalledWith(true);

  expect(mockUseNavigate).toHaveBeenCalledWith('/login');
  expect(mockUseNavigate).toHaveBeenCalledTimes(1);

  expect(mockUseToast).toHaveBeenCalledWith({
    title: '登録メールアドレスにユーザー認証メールを送信しました。認証が完了しましたら、ログインしてください。',
    status: 'success',
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);

  expect(mockSetLoading).toHaveBeenCalledWith(false);
  expect(mockSetLoading).toHaveBeenCalledTimes(2);
});


test('サインアップ失敗時の処理のテスト', async() => {
  mockAxios.onPost('/auth').reply(422, {
    errors: {
      fullMessages: [
        "パスワード（確認用）とパスワードの入力が一致しません",
        "Eメールはすでに存在します"
      ],
    },
  });

  const user = userEvent.setup();
  render(
    <AuthProvider>
      <SignUp />
    </AuthProvider>
  );
  const emailInput = screen.getByRole("textbox", { name: "" }) as HTMLInputElement;
  const passwordInput = screen.getByPlaceholderText('6文字以上の半角英数字') as HTMLInputElement;
  const passwordConfirmationInput = screen.getByPlaceholderText('パスワードを確認してください') as HTMLInputElement;

  const signUpButton = screen.getByRole('button', { name: "新規登録"});

  expect(emailInput.value).toBe("");
  expect(passwordInput.value).toBe("");
  expect(passwordConfirmationInput.value).toBe("");

  expect(signUpButton).toBeDisabled();
  await act(async () => {
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password");
    await user.type(passwordConfirmationInput, "password");
  });

  expect(signUpButton).not.toBeDisabled();
  await act(async () => {
    await user.click(signUpButton);
  });

  expect(mockSetLoading).toHaveBeenCalledWith(true);

  expect(mockUseNavigate).not.toHaveBeenCalledWith();
  expect(mockUseNavigate).toHaveBeenCalledTimes(0);

  expect(mockUseToast).toHaveBeenCalledWith({
    title: 'パスワード（確認用）とパスワードの入力が一致しません',
    status: 'error',
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledWith({
    title: 'Eメールはすでに存在します',
    status: 'error',
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(2);

  expect(mockSetLoading).toHaveBeenCalledWith(false);
  expect(mockSetLoading).toHaveBeenCalledTimes(2);
});

test('サインアップエラー時の処理のテスト', async() => {
  mockAxios.onPost('/auth').reply(500);

  const user = userEvent.setup();
  render(
    <AuthProvider>
      <SignUp />
    </AuthProvider>
  );
  const emailInput = screen.getByRole("textbox", { name: "" }) as HTMLInputElement;
  const passwordInput = screen.getByPlaceholderText('6文字以上の半角英数字') as HTMLInputElement;
  const passwordConfirmationInput = screen.getByPlaceholderText('パスワードを確認してください') as HTMLInputElement;

  const signUpButton = screen.getByRole('button', { name: "新規登録"});

  expect(emailInput.value).toBe("");
  expect(passwordInput.value).toBe("");
  expect(passwordConfirmationInput.value).toBe("");

  expect(signUpButton).toBeDisabled();
  await act(async () => {
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password");
    await user.type(passwordConfirmationInput, "password");
  });

  expect(signUpButton).not.toBeDisabled();
  await act(async () => {
    await user.click(signUpButton);
  });

  expect(mockSetLoading).toHaveBeenCalledWith(true);

  expect(mockUseNavigate).not.toHaveBeenCalledWith();
  expect(mockUseNavigate).toHaveBeenCalledTimes(0);

  expect(mockUseToast).toHaveBeenCalledWith({
    title: 'エラーが発生しました。',
    status: 'error',
    position: "top",
    duration: 5000,
    isClosable: true,
  });

  expect(mockUseToast).toHaveBeenCalledTimes(1);

  expect(mockSetLoading).toHaveBeenCalledWith(false);
  expect(mockSetLoading).toHaveBeenCalledTimes(2);
});
