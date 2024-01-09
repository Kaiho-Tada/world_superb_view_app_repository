import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import AuthLink from "features/auth/components/ui-elements/AuthLink";
import Cookies from "js-cookie";
import client from "lib/client";
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

jest.mock("js-cookie", () => ({
  ...jest.requireActual("js-cookie"),
  get: jest.fn(),
  remove: jest.fn(),
}));

const mockSetLoading = jest.fn();
const mockSetIsSignedIn = jest.fn();
const mockSetCurrentUser = jest.fn();

jest.mock("providers/useAuthProvider", () => ({
  ...jest.requireActual("providers/useAuthProvider"),
  useAuth: () => ({
    loading: false,
    setLoading: mockSetLoading,
    setIsSignedIn: mockSetIsSignedIn,
    setCurrentUser: mockSetCurrentUser,
  }),
}));

const mockAxios = new MockAdapter(client);

afterEach(() => {
  mockAxios.resetHistory();
  jest.clearAllMocks();
});

describe("ログイン済みの挙動のテスト", () => {
  mockAxios.onDelete("auth/sign_out").reply(200);

  test("アバターアイコンが表示されていること", () => {
    render(<AuthLink isSignedIn />);
    const avatarIcon = screen.getByRole("img", { name: "avatar" });
    expect(avatarIcon).toBeInTheDocument();
  });

  describe("サインアウトボタンのテスト", () => {
    test("サインアウトボタンが表示されていること", () => {
      render(<AuthLink isSignedIn />);
      const accountIcon = screen.getByAltText("account_icon");
      const signoutText = screen.getByText("サインアウト");
      expect(accountIcon).toBeInTheDocument();
      expect(signoutText).toBeInTheDocument();
    });

    test("サインアウトボタン押下でサインアウトできること", async () => {
      const user = userEvent.setup();
      render(<AuthLink isSignedIn />);
      const signoutText = screen.getByText("サインアウト");
      await user.click(signoutText);
      expect(mockSetLoading).toHaveBeenCalledWith(true);

      expect(Cookies.remove).toHaveBeenCalledWith("_access_token");
      expect(Cookies.remove).toHaveBeenCalledWith("_client");
      expect(Cookies.remove).toHaveBeenCalledWith("_uid");

      expect(mockSetIsSignedIn).toHaveBeenCalledWith(false);
      expect(mockSetIsSignedIn).toHaveBeenCalledTimes(1);

      expect(mockSetCurrentUser).toHaveBeenCalledWith(undefined);
      expect(mockSetCurrentUser).toHaveBeenCalledTimes(1);

      expect(mockUseToast).toHaveBeenCalledWith({
        title: "サインアウトしました。",
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

  describe("プロフィールリンクのテスト", () => {
    test("プロフィールリンクが表示されていること", () => {
      render(<AuthLink isSignedIn />);
      const profileIcon = screen.getByAltText("profile_icon");
      const profileText = screen.getByText("プロフィール");
      expect(profileIcon).toBeInTheDocument();
      expect(profileText).toBeInTheDocument();
    });

    test("プロフィールリンク押下でプロフィールページに遷移すること", async () => {
      const user = userEvent.setup();
      render(<AuthLink isSignedIn />);
      const profileText = screen.getByText("プロフィール");
      await user.click(profileText);
      expect(mockUseNavigate).toHaveBeenCalledWith("/profile");
      expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    });
  });
});

describe("未ログインの挙動のテスト", () => {
  describe("アバターーアイコンのテスト", () => {
    test("アバターアイコンが表示されていること", () => {
      render(<AuthLink isSignedIn={false} />);
      const avatarIcon = screen.getByRole("img", { name: "avatar" });
      expect(avatarIcon).toBeInTheDocument();
    });

    test("アバターアイコン押下でログインページに遷移すること", async () => {
      const user = userEvent.setup();
      render(<AuthLink isSignedIn={false} />);
      const avatarIcon = screen.getByRole("img", { name: "avatar" });
      await act(async () => {
        await user.click(avatarIcon);
      });
      expect(mockUseNavigate).toHaveBeenCalledWith("/login");
      expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    });
  });

  describe("ログインリンクのテスト", () => {
    test("ログインリンクが表示されていること", () => {
      render(<AuthLink isSignedIn={false} />);
      const loginLink = screen.getByRole("link", { name: "ログイン" });
      expect(loginLink).toBeInTheDocument();
    });

    test("ログインリンク押下でログインページに遷移すること", async () => {
      const user = userEvent.setup();
      render(<AuthLink isSignedIn={false} />);
      const loginLink = screen.getByRole("link", { name: "ログイン" });
      await user.click(loginLink);
      expect(mockUseNavigate).toHaveBeenCalledWith("/login");
      expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    });
  });

  describe("サインアップリンクのテスト", () => {
    test("サインアップリンクが表示されていること", () => {
      render(<AuthLink isSignedIn={false} />);
      const signUpLink = screen.getByRole("link", { name: "新規登録" });
      expect(signUpLink).toBeInTheDocument();
    });

    test("サインアップリンク押下でサインアップページに遷移すること", async () => {
      const user = userEvent.setup();
      render(<AuthLink isSignedIn={false} />);
      const signUpLink = screen.getByRole("link", { name: "新規登録" });
      await user.click(signUpLink);
      expect(mockUseNavigate).toHaveBeenCalledWith("/signup");
      expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    });
  });
});
