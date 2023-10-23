import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import Profile from "components/pages/Profile";
import { AuthProvider } from "hooks/providers/useAuthProvider";
import client from "lib/api/client";
import { act } from "react-dom/test-utils";

const mockUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
}));

const mockUseToast = jest.fn();
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: () => mockUseToast,
}));

const loading = false;
const mockcurrentUser = undefined;
const mockSetLoading = jest.fn();
const mockSetIsSignedIn = jest.fn();
const mockSetCurrentUser = jest.fn();

jest.mock("hooks/providers/useAuthProvider", () => ({
  ...jest.requireActual("hooks/providers/useAuthProvider"),
  useAuth: () => ({
    loading,
    currentUser: mockcurrentUser,
    setCurrentUser: mockSetCurrentUser,
    setLoading: mockSetLoading,
    setIsSignedIn: mockSetIsSignedIn,
  }),
}));

const mockAxios = new MockAdapter(client);

afterEach(() => {
  mockAxios.resetHistory();
  jest.clearAllMocks();
});

describe("プロフィールページのレンダリングテスト", () => {
  test("プロフィールページの見出しが表示されていること", () => {
    render(
      <AuthProvider>
        <Profile />
      </AuthProvider>
    );
    const profileHeading = screen.getByText("プロフィール");
    expect(profileHeading).toBeInTheDocument();
  });

  describe("プロフィール更新フォームのテスト", () => {
    test("名前ラベルが表示されていること", () => {
      render(
        <AuthProvider>
          <Profile />
        </AuthProvider>
      );
      const nameLabel = screen.getByRole("heading", { name: "名前" });
      expect(nameLabel).toBeInTheDocument();
    });

    test("名前の記入欄が表示されていること", () => {
      render(
        <AuthProvider>
          <Profile />
        </AuthProvider>
      );
      const nameInput = screen.getByRole("textbox", { name: "name" });
      expect(nameInput).toBeInTheDocument();
    });

    test("ニックネームラベルが表示されていること", () => {
      render(
        <AuthProvider>
          <Profile />
        </AuthProvider>
      );
      const nickNameLabel = screen.getByRole("heading", { name: "ニックネーム" });
      expect(nickNameLabel).toBeInTheDocument();
    });

    test("ニックネームの記入欄が表示されていること", () => {
      render(
        <AuthProvider>
          <Profile />
        </AuthProvider>
      );
      const nickNameInput = screen.getByRole("textbox", { name: "nickName" });
      expect(nickNameInput).toBeInTheDocument();
    });

    test("emailラベルが表示されていること", () => {
      render(
        <AuthProvider>
          <Profile />
        </AuthProvider>
      );
      const emailLabel = screen.getByRole("heading", { name: "Email" });
      expect(emailLabel).toBeInTheDocument();
    });

    test("メールアドレスの記入欄が表示されていること", () => {
      render(
        <AuthProvider>
          <Profile />
        </AuthProvider>
      );
      const emailInput = screen.getByRole("textbox", { name: "email" });
      expect(emailInput).toBeInTheDocument();
    });

    test("プロフィール更新ボタンが表示されていること", () => {
      render(
        <AuthProvider>
          <Profile />
        </AuthProvider>
      );
      const updateProfileButton = screen.getByRole("button", { name: "プロフィール更新" });
      expect(updateProfileButton).toBeInTheDocument();
    });
  });

  describe("パスワード更新フォームのテスト", () => {
    test("パスワードラベルが表示されていること", () => {
      render(
        <AuthProvider>
          <Profile />
        </AuthProvider>
      );
      const passwordLabel = screen.getByRole("heading", { name: "パスワード" });
      expect(passwordLabel).toBeInTheDocument();
    });

    test("パスワードの記入欄が表示されていること", () => {
      render(
        <AuthProvider>
          <Profile />
        </AuthProvider>
      );
      const passwordInput = screen.getByLabelText("password");
      expect(passwordInput).toBeInTheDocument();
    });

    test("パスワード確認ラベルが表示されていること", () => {
      render(
        <AuthProvider>
          <Profile />
        </AuthProvider>
      );
      const passwordConfirmationLabel = screen.getByRole("heading", { name: "パスワード(確認)" });
      expect(passwordConfirmationLabel).toBeInTheDocument();
    });

    test("パスワード(確認)の記入欄が表示されていること", () => {
      render(
        <AuthProvider>
          <Profile />
        </AuthProvider>
      );
      const passwordConfirmationInput = screen.getByLabelText("passwordConfirmation");
      expect(passwordConfirmationInput).toBeInTheDocument();
    });

    test("パスワード更新ボタンが存在すること", () => {
      render(
        <AuthProvider>
          <Profile />
        </AuthProvider>
      );
      const updatePasswordButton = screen.getByRole("button", { name: "パスワード更新" });
      expect(updatePasswordButton).toBeInTheDocument();
    });
  });

  describe("ホームに戻るボタンのテスト", () => {
    test("ホームに戻るボタンが表示されていること", () => {
      render(
        <AuthProvider>
          <Profile />
        </AuthProvider>
      );
      const returnToTopButton = screen.getByRole("button", { name: "ホームに戻る" });
      expect(returnToTopButton).toBeInTheDocument();
    });

    test("ホームに戻るボタン押下でhomeページに遷移すること", async () => {
      const user = userEvent.setup();
      render(
        <AuthProvider>
          <Profile />
        </AuthProvider>
      );
      const returnToTopButton = screen.getByRole("button", { name: "ホームに戻る" });
      await act(async () => {
        await user.click(returnToTopButton);
      });
      expect(mockUseNavigate).toHaveBeenCalledWith("/home");
    });
  });

  describe("アカウント削除ボタンのテスト", () => {
    test("アカウント削除ボタンが表示されていること", () => {
      render(
        <AuthProvider>
          <Profile />
        </AuthProvider>
      );
      const deleteAccountButton = screen.getByRole("button", { name: "アカウント削除" });
      expect(deleteAccountButton).toBeInTheDocument();
    });
  });
});

describe("プロフィールページの機能テスト", () => {
  mockAxios.onPut("auth").reply((config) => {
    const data = JSON.parse(config.data);
    return [200, { data }];
  });

  test("プロフィール更新ボタン押下でプロフィールを更新できること", async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <Profile />
      </AuthProvider>
    );
    const nameInput = screen.getByRole("textbox", { name: "name" });
    const nickNameInput = screen.getByRole("textbox", { name: "nickName" });
    const emailInput = screen.getByRole("textbox", { name: "email" });
    const updateProfileButton = screen.getByRole("button", { name: "プロフィール更新" });
    await act(async () => {
      await user.type(nameInput, "newName");
      await user.type(nickNameInput, "newNickName");
      await user.type(emailInput, "newTest@example.com");
      await user.click(updateProfileButton);
    });

    expect(mockSetLoading).toHaveBeenCalledWith(true);

    expect(mockUseToast).toHaveBeenCalledWith({
      title: "プロフィールを更新しました。",
      status: "success",
      position: "top",
      duration: 5000,
      isClosable: true,
    });

    expect(mockUseToast).toHaveBeenCalledTimes(1);

    expect(mockSetCurrentUser).toHaveBeenCalledWith({
      name: "newName",
      nickname: "newNickName",
      email: "newTest@example.com",
    });
    expect(mockSetCurrentUser).toHaveBeenCalledTimes(1);

    expect(mockSetLoading).toHaveBeenCalledWith(false);
    expect(mockSetLoading).toHaveBeenCalledTimes(2);
  });

  mockAxios.onPut("auth/password").reply(200, {
    message: "パスワードの更新に成功しました。",
  });

  test("パスワード更新ボタン押下でパスワード更新できること", async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <Profile />
      </AuthProvider>
    );
    const passwordInput = screen.getByPlaceholderText("6文字以上の半角英数字") as HTMLInputElement;
    const passwordConfirmationInput = screen.getByPlaceholderText(
      "パスワードを確認してください"
    ) as HTMLInputElement;
    const updatePasswordButton = screen.getByRole("button", { name: "パスワード更新" });

    expect(passwordInput.value).toBe("");
    expect(passwordConfirmationInput.value).toBe("");
    expect(updatePasswordButton).toBeDisabled();

    await act(async () => {
      await user.type(passwordInput, "newName");
      await user.type(passwordConfirmationInput, "newNickName");
    });

    expect(updatePasswordButton).not.toBeDisabled();

    await act(async () => {
      await user.click(updatePasswordButton);
    });

    expect(mockSetLoading).toHaveBeenCalledWith(true);

    expect(mockUseToast).toHaveBeenCalledWith({
      title: "パスワードの更新に成功しました。",
      status: "success",
      position: "top",
      duration: 5000,
      isClosable: true,
    });
    expect(mockUseToast).toHaveBeenCalledTimes(1);

    expect(mockSetLoading).toHaveBeenCalledWith(false);
    expect(mockSetLoading).toHaveBeenCalledTimes(2);
  });

  mockAxios.onDelete("auth").reply(200, {
    message: "'test@example.com' のアカウントは削除されました。",
  });

  test("アカウント削除ボタン押下でアカウント削除されること", async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <Profile />
      </AuthProvider>
    );
    const deleteAccountButton = screen.getByRole("button", { name: "アカウント削除" });
    await user.click(deleteAccountButton);

    expect(mockSetLoading).toHaveBeenCalledWith(true);

    expect(mockSetIsSignedIn).toHaveBeenCalledWith(false);
    expect(mockSetIsSignedIn).toHaveBeenCalledTimes(1);

    expect(mockSetCurrentUser).toHaveBeenCalledWith(undefined);
    expect(mockSetCurrentUser).toHaveBeenCalledTimes(1);

    expect(mockUseToast).toHaveBeenCalledWith({
      title: "'test@example.com' のアカウントは削除されました。",
      status: "success",
      position: "top",
      duration: 5000,
      isClosable: true,
    });
    expect(mockUseToast).toHaveBeenCalledTimes(1);

    expect(mockUseNavigate).toHaveBeenCalledWith("/login");
    expect(mockUseNavigate).toHaveBeenCalledTimes(1);

    expect(mockSetLoading).toHaveBeenCalledWith(false);
    expect(mockSetLoading).toHaveBeenCalledTimes(2);
  });
});
