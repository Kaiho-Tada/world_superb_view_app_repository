import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import client from 'lib/api/client';
import MockAdapter from "axios-mock-adapter";
import { AuthProvider } from 'hooks/providers/useAuthProvider';
import { Login } from 'components/pages/Login';
import { userEvent } from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

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
const mockSetIsSignedIn = jest.fn();
const mockSetCurrentUser = jest.fn();

jest.mock('hooks/providers/useAuthProvider', () => ({
  ...jest.requireActual('hooks/providers/useAuthProvider'),
  useAuth: () => ({
    setIsSignedIn: mockSetIsSignedIn,
    setCurrentUser: mockSetCurrentUser,
    setLoading: mockSetLoading,
  }),
}));

const mockAxios = new MockAdapter(client);

test('ログインフォームの見出しが表示されていること', () => {
  render(
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
  const loginHeading = screen.getByRole('heading', { name: "ログイン"});
  expect(loginHeading).toBeInTheDocument();
});

test('emailラベルが表示されていること', () => {
  render(
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
  const emailLabel = screen.getByRole('heading', { name: "Email"});
  expect(emailLabel).toBeInTheDocument();
});

test('メールアドレスの記入欄が存在すること', () => {
  render(
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
  const emailInput = screen.getByRole("textbox", { name: "" });
  expect(emailInput).toBeInTheDocument();
});

test('パスワードラベルが表示されていること', () => {
  render(
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
  const passwordLabel = screen.getByRole('heading', { name: "パスワード"});
  expect(passwordLabel).toBeInTheDocument();
});

test('パスワードの記入欄が存在すること', () => {
  render(
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
  const passwordInput = screen.getByPlaceholderText('6文字以上の半角英数字');
  expect(passwordInput).toBeInTheDocument();
});

test('ログインボタンが存在すること', () => {
  render(
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
  const loginButton = screen.getByRole('button', { name: "ログイン"});
  expect(loginButton).toBeInTheDocument();
});

test('ログイン成功時のテスト', async () => {
  mockAxios.onPost('/auth/sign_in').reply(200,
    {
      data: {
        id: 1,
        email: "test@example.com",
      }
    }
  );

  const user = userEvent.setup();
  render(
    <AuthProvider>
      <Login/>
    </AuthProvider>
  );
  const emailInput = screen.getByRole("textbox", { name: "" }) as HTMLInputElement;
  const passwordInput = screen.getByPlaceholderText('6文字以上の半角英数字') as HTMLInputElement;
  const loginButton = screen.getByRole('button', { name: "ログイン"});

  expect(emailInput.value).toBe("");
  expect(passwordInput.value).toBe("");
  expect(loginButton).toBeDisabled();

  await act(async () => {
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password");
  });
  expect(loginButton).not.toBeDisabled();
  await act(async () => {
    await user.click(loginButton);
  });

  expect(mockSetLoading).toHaveBeenCalledWith(true);

  expect(mockUseToast).toHaveBeenCalledWith({
    title: 'ログインしました',
    status: 'success',
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);

  expect(mockSetIsSignedIn).toHaveBeenCalledWith(true);
  expect(mockSetIsSignedIn).toHaveBeenCalledTimes(1);

  expect(mockSetCurrentUser).toHaveBeenCalledWith({
    id: 1,
    email: "test@example.com",
  });
  expect(mockSetCurrentUser).toHaveBeenCalledTimes(1);

  expect(mockUseNavigate).toHaveBeenCalledWith('/home');
  expect(mockUseNavigate).toHaveBeenCalledTimes(1);

  expect(mockSetLoading).toHaveBeenCalledWith(false);
  expect(mockSetLoading).toHaveBeenCalledTimes(2);
});

test('ログイン失敗時のテスト', async() => {
  mockAxios.onPost('/auth/sign_in').reply(401, {
    errors: [
      'ログイン用の認証情報が正しくありません。再度お試しください。'
    ]
  });

  const user = userEvent.setup();
  render(
    <AuthProvider>
      <Login/>
    </AuthProvider>
  );
  const emailInput = screen.getByRole("textbox", { name: "" }) as HTMLInputElement;
  const passwordInput = screen.getByPlaceholderText('6文字以上の半角英数字') as HTMLInputElement;
  const loginButton = screen.getByRole('button', { name: "ログイン"});

  expect(emailInput.value).toBe("");
  expect(passwordInput.value).toBe("");
  expect(loginButton).toBeDisabled();

  await act(async () => {
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password");
  });
  expect(loginButton).not.toBeDisabled();
  await act(async () => {
    await user.click(loginButton);
  });

  expect(mockSetLoading).toHaveBeenCalledWith(true);

  expect(mockUseToast).toHaveBeenCalledWith({
    title: 'ログイン用の認証情報が正しくありません。再度お試しください。',
    status: 'error',
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);

  expect(mockSetIsSignedIn).not.toHaveBeenCalledWith();
  expect(mockSetIsSignedIn).toHaveBeenCalledTimes(0);

  expect(mockSetCurrentUser).not.toHaveBeenCalledWith();
  expect(mockSetCurrentUser).toHaveBeenCalledTimes(0);

  expect(mockUseNavigate).not.toHaveBeenCalledWith();
  expect(mockUseNavigate).toHaveBeenCalledTimes(0);

  expect(mockSetLoading).toHaveBeenCalledWith(false);
  expect(mockSetLoading).toHaveBeenCalledTimes(2);
});

test('ログインエラー時のテスト', async() => {
  mockAxios.onPost('/auth/sign_in').reply(500);

  const user = userEvent.setup();
  render(
    <AuthProvider>
      <Login/>
    </AuthProvider>
  );
  const emailInput = screen.getByRole("textbox", { name: "" }) as HTMLInputElement;
  const passwordInput = screen.getByPlaceholderText('6文字以上の半角英数字') as HTMLInputElement;
  const loginButton = screen.getByRole('button', { name: "ログイン"});

  expect(emailInput.value).toBe("");
  expect(passwordInput.value).toBe("");
  expect(loginButton).toBeDisabled();

  await act(async () => {
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password");
  });
  expect(loginButton).not.toBeDisabled();
  await act(async () => {
    await user.click(loginButton);
  });

  expect(mockSetLoading).toHaveBeenCalledWith(true);

  expect(mockUseToast).toHaveBeenCalledWith({
    title: 'エラーが発生しました。',
    status: 'error',
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);

  expect(mockSetIsSignedIn).not.toHaveBeenCalledWith();
  expect(mockSetIsSignedIn).toHaveBeenCalledTimes(0);

  expect(mockSetCurrentUser).not.toHaveBeenCalledWith();
  expect(mockSetCurrentUser).toHaveBeenCalledTimes(0);

  expect(mockUseNavigate).not.toHaveBeenCalledWith();
  expect(mockUseNavigate).toHaveBeenCalledTimes(0);

  expect(mockSetLoading).toHaveBeenCalledWith(false);
  expect(mockSetLoading).toHaveBeenCalledTimes(2);
});

test('アカウント未登録者用の見出しが表示されていること', () => {
  render(
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
  const headingForSignUp = screen.getByRole('heading', { name: "アカウントをお持ちでない方"});
  expect(headingForSignUp).toBeInTheDocument();
});

test('アカウント登録ボタンが表示されていること', () => {
  render(
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
  const signUpButton = screen.getByRole('button', { name: "登録する"});
  expect(signUpButton).toBeInTheDocument();
});

test('アカウント登録ボタン押下でサインアップページに遷移されること', async () => {
  const user = userEvent.setup();
  render(
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
  const signUpButton = screen.getByRole('button', { name: "登録する"});
  await user.click(signUpButton);
  expect(mockUseNavigate).toHaveBeenCalledWith('/signup');
  expect(mockUseNavigate).toHaveBeenCalledTimes(1);
});
