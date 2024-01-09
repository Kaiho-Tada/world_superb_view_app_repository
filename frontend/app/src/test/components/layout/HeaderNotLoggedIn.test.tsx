import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Header from "components/layout/Header";
import { AuthProvider } from "providers/useAuthProvider";

afterEach(() => {
  jest.clearAllMocks();
});

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

jest.mock("js-cookie", () => ({
  ...jest.requireActual("js-cookie"),
  get: jest.fn(),
  remove: jest.fn(),
}));

const mockSetLoading = jest.fn();
const mockSetIsSignedIn = jest.fn();
const mocksetCurrentUser = jest.fn();

jest.mock("providers/useAuthProvider", () => ({
  ...jest.requireActual("providers/useAuthProvider"),
  useAuth: () => ({
    loading: false,
    isSignedIn: false,
    setIsSignedIn: mockSetIsSignedIn,
    setLoading: mockSetLoading,
    setCurrentUser: mocksetCurrentUser,
  }),
}));

describe("未ログインの挙動のテスト", () => {
  describe("ログインページのリンクボタンのテスト", () => {
    test("ログインリンクが表示されていること", async () => {
      render(
        <AuthProvider>
          <Header />
        </AuthProvider>
      );
      const loginLink = screen.getByRole("link", { name: "ログイン" });
      expect(loginLink).toBeInTheDocument();
    });

    test("ログインリンク押下でログインページへ遷移すること", async () => {
      const user = userEvent.setup();
      render(
        <AuthProvider>
          <Header />
        </AuthProvider>
      );
      const loginLink = screen.getByRole("link", { name: "ログイン" });
      await user.click(loginLink);
      expect(mockUseNavigate).toHaveBeenCalledWith("/login");
      expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    });
  });

  describe("サインアップページのリンクボタンのテスト", () => {
    test("サインアップリンクが表示されていること", () => {
      render(
        <AuthProvider>
          <Header />
        </AuthProvider>
      );
      const signupLink = screen.getByRole("link", { name: "新規登録" });
      expect(signupLink).toBeInTheDocument();
    });
    test("サインアップリンク押下でサインアップページへ遷移すること", async () => {
      const user = userEvent.setup();
      render(
        <AuthProvider>
          <Header />
        </AuthProvider>
      );
      const signupLink = screen.getByRole("link", { name: "新規登録" });
      await user.click(signupLink);
      expect(mockUseNavigate).toHaveBeenCalledWith("/signup");
      expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    });
  });

  describe("アバターアイコンのテスト", () => {
    test("アバターアイコンが表示されていること", () => {
      render(
        <AuthProvider>
          <Header />
        </AuthProvider>
      );
      const avatarIcon = screen.getByRole("img", { name: "avatar" });
      expect(avatarIcon).toBeInTheDocument();
    });

    test("アバターアイコン押下でログインページに遷移すること", async () => {
      const user = userEvent.setup();
      render(
        <AuthProvider>
          <Header />
        </AuthProvider>
      );
      const avatarIcon = screen.getByRole("img", { name: "avatar" });
      await user.click(avatarIcon);
      expect(mockUseNavigate).toHaveBeenCalledWith("/login");
      expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    });
  });

  describe("絶景一覧リンクのテスト", () => {
    test("絶景一覧リンクが表示されていること", () => {
      render(
        <AuthProvider>
          <Header />
        </AuthProvider>
      );
      const superbViewsListLink = screen.getByRole("link", { name: "絶景一覧" });
      expect(superbViewsListLink).toBeInTheDocument();
    });

    test("絶景一覧リンク押下で絶景一覧ページへ遷移すること", async () => {
      const user = userEvent.setup();
      render(
        <AuthProvider>
          <Header />
        </AuthProvider>
      );
      const superbViewsListLink = screen.getByRole("link", { name: "絶景一覧" });
      await user.click(superbViewsListLink);
      expect(mockUseNavigate).toHaveBeenCalledWith("/world_views");
      expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    });
  });
});
