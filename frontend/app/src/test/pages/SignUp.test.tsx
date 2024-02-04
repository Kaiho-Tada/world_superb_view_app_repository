import { fireEvent, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import SignUp from "pages/SignUp";
import { act } from "react-dom/test-utils";

const mockUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
}));

afterEach(() => {
  jest.restoreAllMocks();
});

test("新規登録フォームが表示されていること", () => {
  render(<SignUp />);
  expect(screen.getByRole("form", { name: "新規登録フォーム" })).toBeInTheDocument();
});

test("新規登録フォームの送信をトリガーにhandleSignUp関数が呼び出されること", () => {
  const spyOnUseSignUp = jest.spyOn(jest.requireActual("features/auth/hooks/useSignUp"), "default");
  const mockHandleSignUp = jest.fn();
  spyOnUseSignUp.mockReturnValue({
    email: "email",
    password: "password",
    handleSignUp: mockHandleSignUp,
  });

  render(<SignUp />);
  fireEvent.submit(screen.getByRole("form", { name: "新規登録フォーム" }));
  expect(mockHandleSignUp).toHaveBeenCalledTimes(1);

  spyOnUseSignUp.mockRestore();
});

test("新規登録フォームの見出しが表示されていること", () => {
  render(<SignUp />);
  expect(screen.getByRole("heading", { name: "新規登録" })).toBeInTheDocument();
});

test("メールアイコンが表示されていること", () => {
  render(<SignUp />);
  expect(screen.getByRole("img", { name: "メールアイコン" })).toBeInTheDocument();
});

test("emailラベルが表示されていること", () => {
  render(<SignUp />);
  expect(screen.getByRole("heading", { name: "Email" })).toBeInTheDocument();
});

test("メールアドレスの記入欄が表示されていること", () => {
  render(<SignUp />);
  expect(screen.getByRole("textbox", { name: "email" })).toBeInTheDocument();
});

test("メールアドレスの記入欄の入力をトリガーにemailが更新されること", async () => {
  const spyOnUseSignUp = jest.spyOn(jest.requireActual("features/auth/hooks/useSignUp"), "default");
  const mockSetEmail = jest.fn();
  spyOnUseSignUp.mockReturnValue({
    setEmail: mockSetEmail,
  });

  const user = userEvent.setup();
  render(<SignUp />);
  await act(async () => {
    await user.type(screen.getByRole("textbox", { name: "email" }), "Eメール");
  });
  expect(mockSetEmail).toHaveBeenCalledWith("Eメール");
  expect(mockSetEmail).toHaveBeenCalledTimes(4);
});

test("パスワードアイコンが表示されていること", () => {
  render(<SignUp />);
  expect(screen.getByRole("img", { name: "パスワードアイコン" })).toBeInTheDocument();
});

test("パスワードラベルが表示されていること", () => {
  render(<SignUp />);
  expect(screen.getByRole("heading", { name: "パスワード" })).toBeInTheDocument();
});

test("パスワードの記入欄が表示されていること", () => {
  render(<SignUp />);
  expect(screen.getByLabelText("password")).toBeInTheDocument();
});

test("パスワードの記入欄の入力をトリガーにpasswordが更新されること", async () => {
  const spyOnUseSignUp = jest.spyOn(jest.requireActual("features/auth/hooks/useSignUp"), "default");
  const mockSetPassword = jest.fn();
  spyOnUseSignUp.mockReturnValue({
    setPassword: mockSetPassword,
  });

  const user = userEvent.setup();
  render(<SignUp />);
  await act(async () => {
    await user.type(screen.getByLabelText("password"), "パスワード");
  });
  expect(mockSetPassword).toHaveBeenCalledWith("パスワード");
  expect(mockSetPassword).toHaveBeenCalledTimes(5);
});

test("新規登録ボタンが表示されていること", () => {
  render(<SignUp />);
  expect(screen.getByRole("button", { name: "新規登録" })).toBeInTheDocument();
});

test("emailとpasswordが未入力である場合、新規登録ボタンが非アクティブであること", () => {
  render(<SignUp />);
  expect(screen.getByRole("button", { name: "新規登録" })).toBeDisabled();
});

test("emailとpassword入力で、新規登録ボタンがアクティブになること", async () => {
  const user = userEvent.setup();
  render(<SignUp />);
  await act(async () => {
    await user.type(screen.getByRole("textbox", { name: "email" }), "Eメール");
    await user.type(screen.getByLabelText("password"), "パスワード");
  });
  expect(screen.getByRole("button", { name: "新規登録" })).not.toBeDisabled();
});

test("AuthContextのloadingの値がtrueの場合は新規登録ボタンがloading中であること", () => {
  const spyOnUseSignUp = jest.spyOn(jest.requireActual("features/auth/hooks/useSignUp"), "default");
  spyOnUseSignUp.mockReturnValue({
    email: "email",
    password: "password",
  });
  const spyOnUseAuthProvider = jest.spyOn(
    jest.requireActual("providers/useAuthProvider"),
    "useAuth"
  );
  spyOnUseAuthProvider.mockReturnValue({ loading: true });

  render(<SignUp />);
  expect(screen.getByTestId("auth-button")).toBeDisabled();
});

test("アカウント登録済みユーザー用のテキストが表示されていること", () => {
  render(<SignUp />);
  expect(screen.getByRole("heading", { name: "アカウントをお持ちの方" })).toBeInTheDocument();
});

test("ログインページ遷移ボタンが表示されていること", () => {
  render(<SignUp />);
  expect(screen.getByRole("button", { name: "ログインページへ" })).toBeInTheDocument();
});

test("ログインページ遷移ボタン押下でログインページに遷移されること", async () => {
  const user = userEvent.setup();
  render(<SignUp />);
  await user.click(screen.getByRole("button", { name: "ログインページへ" }));
  expect(mockUseNavigate).toHaveBeenCalledWith("/login");
  expect(mockUseNavigate).toHaveBeenCalledTimes(1);
});
