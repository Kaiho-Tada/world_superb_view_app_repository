import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Login from "pages/Login";
import { act } from "react-dom/test-utils";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

afterEach(() => {
  jest.restoreAllMocks();
});

test("ログインフォームの見出しが表示されていること", () => {
  render(<Login />);
  expect(screen.getByRole("heading", { name: "ログイン" })).toBeInTheDocument();
});

test("メールアイコンが表示されていること", () => {
  render(<Login />);
  expect(screen.getByRole("img", { name: "メールアイコン" })).toBeInTheDocument();
});

test("emailラベルが表示されていること", () => {
  render(<Login />);
  expect(screen.getByRole("heading", { name: "Email" })).toBeInTheDocument();
});

test("メールアドレスの記入欄が表示されていること", () => {
  render(<Login />);
  expect(screen.getByRole("textbox", { name: "email" })).toBeInTheDocument();
});

test("メールアドレスの記入欄の入力をトリガーにemailが更新されること", async () => {
  const spyOnUseLogin = jest.spyOn(jest.requireActual("features/auth/hooks/useLogin"), "default");
  const mockSetEmail = jest.fn();
  spyOnUseLogin.mockReturnValue({
    setEmail: mockSetEmail,
  });

  const user = userEvent.setup();
  render(<Login />);
  await act(async () => {
    await user.type(screen.getByRole("textbox", { name: "email" }), "Eメール");
  });
  expect(mockSetEmail).toHaveBeenCalledWith("Eメール");
  expect(mockSetEmail).toHaveBeenCalledTimes(4);
});

test("パスワードアイコンが表示されていること", () => {
  render(<Login />);
  expect(screen.getByRole("img", { name: "パスワードアイコン" })).toBeInTheDocument();
});

test("パスワードラベルが表示されていること", () => {
  render(<Login />);
  expect(screen.getByRole("heading", { name: "パスワード" })).toBeInTheDocument();
});

test("パスワードの記入欄が表示されていること", () => {
  render(<Login />);
  expect(screen.getByLabelText("password")).toBeInTheDocument();
});

test("パスワードの記入欄の入力をトリガーにpasswordが更新されること", async () => {
  const spyOnUseLogin = jest.spyOn(jest.requireActual("features/auth/hooks/useLogin"), "default");
  const mockSetPassword = jest.fn();
  spyOnUseLogin.mockReturnValue({
    setPassword: mockSetPassword,
  });

  const user = userEvent.setup();
  render(<Login />);
  await act(async () => {
    await user.type(screen.getByLabelText("password"), "パスワード");
  });
  expect(mockSetPassword).toHaveBeenCalledWith("パスワード");
  expect(mockSetPassword).toHaveBeenCalledTimes(5);
});

test("ログインボタンが表示されていること", () => {
  render(<Login />);
  expect(screen.getByRole("button", { name: "ログイン" })).toBeInTheDocument();
});

test("emailとpasswordが未入力である場合、ログインボタンが非アクティブであること", () => {
  render(<Login />);
  expect(screen.getByRole("button", { name: "ログイン" })).toBeDisabled();
});

test("emailとpassword入力で、ログインボタンがアクティブになること", async () => {
  const user = userEvent.setup();
  render(<Login />);
  await act(async () => {
    await user.type(screen.getByRole("textbox", { name: "email" }), "Eメール");
    await user.type(screen.getByLabelText("password"), "パスワード");
  });
  expect(screen.getByRole("button", { name: "ログイン" })).not.toBeDisabled();
});

test("AuthContextのloadingの値がtrueの場合はログインボタンがloading中であること", () => {
  const spyOnUseLogin = jest.spyOn(jest.requireActual("features/auth/hooks/useLogin"), "default");
  spyOnUseLogin.mockReturnValue({
    email: "",
    password: "",
  });

  const spyOnUseAuthProvider = jest.spyOn(
    jest.requireActual("providers/useAuthProvider"),
    "useAuth"
  );
  spyOnUseAuthProvider.mockReturnValue({ loading: true });
  render(<Login />);
  expect(screen.getByTestId("auth-button")).toBeDisabled();
});

test("ログインボタン押下でhandleLogin関数が実行されること", async () => {
  const spyOnUseLogin = jest.spyOn(jest.requireActual("features/auth/hooks/useLogin"), "default");
  const mockHandleLogin = jest.fn();
  spyOnUseLogin.mockReturnValue({
    handleLogin: mockHandleLogin,
  });

  const user = userEvent.setup();
  render(<Login />);
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "ログイン" }));
  });
  expect(mockHandleLogin).toHaveBeenCalledTimes(1);
});

test("ゲストログインボタンが表示されていること", () => {
  render(<Login />);
  const GuestLoginButton = screen.getByRole("button", { name: "ゲストログイン" });
  expect(GuestLoginButton).toBeInTheDocument();
});

test("ゲストログインボタン押下でhandleGuestLogin関数が呼び出されること", async () => {
  const spyOnUseGuestLogin = jest.spyOn(
    jest.requireActual("features/auth/hooks/useGuestLogin"),
    "default"
  );
  const mockHandleGuestLogin = jest.fn();
  spyOnUseGuestLogin.mockReturnValue({
    handleGuestLogin: mockHandleGuestLogin,
  });

  const user = userEvent.setup();
  render(<Login />);
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "ゲストログイン" }));
  });
  expect(mockHandleGuestLogin).toHaveBeenCalledTimes(1);
});

test("アカウント未登録者用の見出しが表示されていること", () => {
  render(<Login />);
  const headingForSignUp = screen.getByRole("heading", { name: "アカウントをお持ちでない方" });
  expect(headingForSignUp).toBeInTheDocument();
});

test("サインアップページ遷移ボタンが表示されていること", () => {
  render(<Login />);
  const navigateToSignUpPageButton = screen.getByRole("button", { name: "登録する" });
  expect(navigateToSignUpPageButton).toBeInTheDocument();
});

test("サインアップページ遷移ボタン押下でサインアップページに遷移されること", async () => {
  const user = userEvent.setup();
  render(<Login />);
  const navigateToSignUpPageButton = screen.getByRole("button", { name: "登録する" });
  await user.click(navigateToSignUpPageButton);
  expect(mockNavigate).toHaveBeenCalledWith("/signup");
  expect(mockNavigate).toHaveBeenCalledTimes(1);
});
