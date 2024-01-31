import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Profile from "pages/Profile";
import { act } from "react-dom/test-utils";

const mockUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
}));

afterEach(() => {
  jest.restoreAllMocks();
});

test("プロフィールページのフォームの見出しが表示されていること", () => {
  render(<Profile />);
  expect(screen.getByText("プロフィール")).toBeInTheDocument();
});

describe("プロフィール更新フォームのテスト", () => {
  test("名前ラベルが表示されていること", () => {
    render(<Profile />);
    expect(screen.getByRole("heading", { name: "名前" })).toBeInTheDocument();
  });

  test("名前の記入欄が表示されていること", () => {
    render(<Profile />);
    expect(screen.getByRole("textbox", { name: "名前の記入欄" })).toBeInTheDocument();
  });

  test("名前の記入欄の入力をトリガーにnameが更新されること", async () => {
    const spyOnUseUpdateUser = jest.spyOn(
      jest.requireActual("features/auth/hooks/useUpdateUser"),
      "default"
    );
    const mockSetName = jest.fn();
    spyOnUseUpdateUser.mockReturnValue({
      setName: mockSetName,
    });

    const user = userEvent.setup();
    render(<Profile />);
    await act(async () => {
      await user.type(screen.getByRole("textbox", { name: "名前の記入欄" }), "名前");
    });
    expect(mockSetName).toHaveBeenCalledWith("名前");
    expect(mockSetName).toHaveBeenCalledTimes(2);
  });

  test("ニックネームラベルが表示されていること", () => {
    render(<Profile />);
    expect(screen.getByRole("heading", { name: "ニックネーム" })).toBeInTheDocument();
  });

  test("ニックネームの記入欄が表示されていること", () => {
    render(<Profile />);
    expect(screen.getByRole("textbox", { name: "ニックネームの記入欄" })).toBeInTheDocument();
  });

  test("ニックネームの記入欄の入力をトリガーにnicknameが更新されること", async () => {
    const spyOnUseUpdateUser = jest.spyOn(
      jest.requireActual("features/auth/hooks/useUpdateUser"),
      "default"
    );
    const mockSetNickname = jest.fn();
    spyOnUseUpdateUser.mockReturnValue({
      setNickname: mockSetNickname,
    });

    const user = userEvent.setup();
    render(<Profile />);
    await act(async () => {
      await user.type(
        screen.getByRole("textbox", { name: "ニックネームの記入欄" }),
        "ニックネーム"
      );
    });
    expect(mockSetNickname).toHaveBeenCalledWith("ニックネーム");
    expect(mockSetNickname).toHaveBeenCalledTimes(6);
  });

  test("Emailラベルが表示されていること", () => {
    render(<Profile />);
    expect(screen.getByRole("heading", { name: "Email" })).toBeInTheDocument();
  });

  test("メールアドレスの記入欄が表示されていること", () => {
    render(<Profile />);
    expect(screen.getByRole("textbox", { name: "Eメールの記入欄" })).toBeInTheDocument();
  });

  test("Eメールの記入欄の入力をトリガーにemailが更新されること", async () => {
    const spyOnUseUpdateUser = jest.spyOn(
      jest.requireActual("features/auth/hooks/useUpdateUser"),
      "default"
    );
    const mockSetEmail = jest.fn();
    spyOnUseUpdateUser.mockReturnValue({
      setEmail: mockSetEmail,
    });

    const user = userEvent.setup();
    render(<Profile />);
    await act(async () => {
      await user.type(screen.getByRole("textbox", { name: "Eメールの記入欄" }), "Eメール");
    });
    expect(mockSetEmail).toHaveBeenCalledWith("Eメール");
    expect(mockSetEmail).toHaveBeenCalledTimes(4);
  });

  test("プロフィール更新ボタンが表示されていること", () => {
    render(<Profile />);
    expect(screen.getByRole("button", { name: "プロフィール更新" })).toBeInTheDocument();
  });

  test("emailが未入力の場合はプロフィール更新ボタンが非アクティブであること", () => {
    const spyOnUseUpdateUser = jest.spyOn(
      jest.requireActual("features/auth/hooks/useUpdateUser"),
      "default"
    );
    spyOnUseUpdateUser.mockReturnValue({
      email: "",
    });
    render(<Profile />);
    expect(screen.getByRole("button", { name: "プロフィール更新" })).toBeDisabled();
  });

  test("プロフィール更新ボタン押下でhandleUpdateUser関数が呼び出されること", async () => {
    const spyOnUseUpdateUser = jest.spyOn(
      jest.requireActual("features/auth/hooks/useUpdateUser"),
      "default"
    );
    const mockHandleUpdateUser = jest.fn();
    spyOnUseUpdateUser.mockReturnValue({
      handleUpdateUser: mockHandleUpdateUser,
    });
    const user = userEvent.setup();
    render(<Profile />);
    await user.click(screen.getByRole("button", { name: "プロフィール更新" }));
    expect(mockHandleUpdateUser).toHaveBeenCalledTimes(1);
  });
});

describe("パスワード更新フォームのテスト", () => {
  test("パスワードラベルが表示されていること", () => {
    render(<Profile />);
    expect(screen.getByRole("heading", { name: "パスワード" })).toBeInTheDocument();
  });

  test("パスワードの記入欄が表示されていること", () => {
    render(<Profile />);
    expect(screen.getByLabelText("パスワードの記入欄")).toBeInTheDocument();
  });

  test("パスワードの記入欄の入力をトリガーにpasswordが更新されること", async () => {
    const spyOnUseUpdatePassword = jest.spyOn(
      jest.requireActual("features/auth/hooks/useUpdatePassword"),
      "default"
    );
    const mockSetPassword = jest.fn();
    spyOnUseUpdatePassword.mockReturnValue({
      setPassword: mockSetPassword,
    });

    const user = userEvent.setup();
    render(<Profile />);
    await act(async () => {
      await user.type(screen.getByLabelText("パスワードの記入欄"), "パスワード");
    });
    expect(mockSetPassword).toHaveBeenCalledWith("パスワード");
    expect(mockSetPassword).toHaveBeenCalledTimes(5);
  });

  test("パスワード確認ラベルが表示されていること", () => {
    render(<Profile />);
    expect(screen.getByRole("heading", { name: "パスワード(確認)" })).toBeInTheDocument();
  });

  test("パスワード(確認)の記入欄が表示されていること", () => {
    render(<Profile />);
    expect(screen.getByLabelText("パスワード(確認)の記入欄")).toBeInTheDocument();
  });

  test("パスワード(確認)の記入欄の入力をトリガーにpasswordが更新されること", async () => {
    const spyOnUseUpdatePassword = jest.spyOn(
      jest.requireActual("features/auth/hooks/useUpdatePassword"),
      "default"
    );
    const mockSetpasswordConfirmation = jest.fn();
    spyOnUseUpdatePassword.mockReturnValue({
      setpasswordConfirmation: mockSetpasswordConfirmation,
    });

    const user = userEvent.setup();
    render(<Profile />);
    await act(async () => {
      await user.type(screen.getByLabelText("パスワード(確認)の記入欄"), "パスワード");
    });
    expect(mockSetpasswordConfirmation).toHaveBeenCalledWith("パスワード");
    expect(mockSetpasswordConfirmation).toHaveBeenCalledTimes(5);
  });

  test("パスワード更新ボタンが表示されていること", () => {
    render(<Profile />);
    expect(screen.getByRole("button", { name: "パスワード更新" })).toBeInTheDocument();
  });

  test("passwordが未入力の場合はパスワード更新ボタンが非アクティブであること", () => {
    const spyOnUseUpdatePassword = jest.spyOn(
      jest.requireActual("features/auth/hooks/useUpdatePassword"),
      "default"
    );
    spyOnUseUpdatePassword.mockReturnValue({
      password: "",
    });

    render(<Profile />);
    expect(screen.getByRole("button", { name: "パスワード更新" })).toBeDisabled();
  });

  test("passwordConfirmationが未入力の場合はパスワード更新ボタンが非アクティブであること", () => {
    const spyOnUseUpdatePassword = jest.spyOn(
      jest.requireActual("features/auth/hooks/useUpdatePassword"),
      "default"
    );
    spyOnUseUpdatePassword.mockReturnValue({
      passwordConfirmation: "",
    });

    render(<Profile />);
    expect(screen.getByRole("button", { name: "パスワード更新" })).toBeDisabled();
  });

  test("パスワード更新ボタン押下でhandleUpdatePassword関数が呼び出されること", async () => {
    const spyOnUseUpdatePassword = jest.spyOn(
      jest.requireActual("features/auth/hooks/useUpdatePassword"),
      "default"
    );
    const mockHandleUpdatePassword = jest.fn();
    spyOnUseUpdatePassword.mockReturnValue({
      handleUpdatePassword: mockHandleUpdatePassword,
    });

    const user = userEvent.setup();
    render(<Profile />);
    await act(async () => {
      await user.click(screen.getByRole("button", { name: "パスワード更新" }));
    });
    expect(mockHandleUpdatePassword).toHaveBeenCalledTimes(1);
  });
});

describe("ホームに戻るボタンのテスト", () => {
  test("ホームに戻るボタンが表示されていること", () => {
    render(<Profile />);
    expect(screen.getByRole("button", { name: "ホームに戻る" })).toBeInTheDocument();
  });

  test("ホームに戻るボタン押下でhomeページに遷移すること", async () => {
    const user = userEvent.setup();
    render(<Profile />);
    await act(async () => {
      await user.click(screen.getByRole("button", { name: "ホームに戻る" }));
    });
    expect(mockUseNavigate).toHaveBeenCalledWith("/home");
  });
});

describe("アカウント削除ボタンのテスト", () => {
  test("アカウント削除ボタンが表示されていること", () => {
    render(<Profile />);
    expect(screen.getByRole("button", { name: "アカウント削除" })).toBeInTheDocument();
  });

  test("アカウント削除ボタン押下でhandleDeleteUser関数が呼び出されること", async () => {
    const spyOnUseDeleteUser = jest.spyOn(
      jest.requireActual("features/auth/hooks/useDeleteUser"),
      "default"
    );
    const mockHandleDeleteUser = jest.fn();
    spyOnUseDeleteUser.mockReturnValue({
      handleDeleteUser: mockHandleDeleteUser,
    });

    const user = userEvent.setup();
    render(<Profile />);
    await act(async () => {
      await user.click(screen.getByRole("button", { name: "アカウント削除" }));
    });
    expect(mockHandleDeleteUser).toHaveBeenCalledTimes(1);
  });
});

test("AuthContextのloadingの値がtrueの場合はAuthButtonがloading中であること", () => {
  const spyOnUseUpdatePassword = jest.spyOn(
    jest.requireActual("features/auth/hooks/useUpdatePassword"),
    "default"
  );
  spyOnUseUpdatePassword.mockReturnValue({
    password: "",
  });
  const spyOnUseAuthProvider = jest.spyOn(
    jest.requireActual("providers/useAuthProvider"),
    "useAuth"
  );
  spyOnUseAuthProvider.mockReturnValue({ loading: true });

  render(<Profile />);
  const authButtons = screen.getAllByTestId("auth-button");
  authButtons.forEach((button) => {
    expect(button).toBeDisabled();
  });
});
