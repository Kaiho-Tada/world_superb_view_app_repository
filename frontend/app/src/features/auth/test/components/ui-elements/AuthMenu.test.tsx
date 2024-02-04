import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import AuthMenu from "features/auth/components/ui-elements/AuthMenu";
import { useAuth as mockUseAuth } from "providers/useAuthProvider";
import { act } from "react-dom/test-utils";

const mockUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
}));

jest.mock("providers/useAuthProvider", () => ({
  ...jest.requireActual("providers/useAuthProvider"),
  useAuth: jest.fn(),
}));
const mockContextValue = {
  loading: false,
  currentUser: {
    id: 1,
    email: "email@example.com",
  },
};
const mockContextGuestUser = {
  loading: false,
  currentUser: {
    id: 1,
    email: "guest@example.com",
  },
};
const mockContextValueLoading = {
  loading: true,
  currentUser: {
    id: 1,
    email: "email@example.com",
  },
};

const mockHandleSignout = jest.fn();
jest.mock("features/auth/hooks/useSignout", () => ({
  ...jest.requireActual("features/auth/hooks/useSignout"),
  __esModule: true,
  default: () => ({
    handleSignout: mockHandleSignout,
  }),
}));

describe("ログイン済みの挙動のテスト", () => {
  test("loading中はコンポーネントが非表示になっていること", () => {
    (mockUseAuth as jest.Mock).mockReturnValue(mockContextValueLoading);
    render(<AuthMenu isSignedIn />);
    expect(screen.queryByRole("img", { name: "avatar" })).not.toBeInTheDocument();
  });

  test("currentUserがゲストユーザーである場合はプロフィールページのリンクが表示されないこと", () => {
    (mockUseAuth as jest.Mock).mockReturnValue(mockContextGuestUser);
    render(<AuthMenu isSignedIn />);
    expect(screen.queryByAltText("profile_icon")).not.toBeInTheDocument();
    expect(screen.queryByText("プロフィール")).not.toBeInTheDocument();
  });

  test("アバターアイコンが表示されていること", () => {
    (mockUseAuth as jest.Mock).mockReturnValue(mockContextValue);
    render(<AuthMenu isSignedIn />);
    expect(screen.getByRole("img", { name: "avatar" })).toBeInTheDocument();
  });

  describe("サインアウトボタンのテスト", () => {
    test("サインアウトボタンが表示されていること", () => {
      (mockUseAuth as jest.Mock).mockReturnValue(mockContextValue);
      render(<AuthMenu isSignedIn />);
      expect(screen.getByAltText("account_icon")).toBeInTheDocument();
      expect(screen.getByText("サインアウト")).toBeInTheDocument();
    });

    test("サインアウトボタン押下でhandleSignout関数が実行されること", async () => {
      (mockUseAuth as jest.Mock).mockReturnValue(mockContextValue);
      const user = userEvent.setup();
      render(<AuthMenu isSignedIn />);
      await user.click(screen.getByText("サインアウト"));
      expect(mockHandleSignout).toHaveBeenCalledTimes(1);
    });
  });

  describe("プロフィールリンクのテスト", () => {
    test("プロフィールリンクが表示されていること", () => {
      (mockUseAuth as jest.Mock).mockReturnValue(mockContextValue);
      render(<AuthMenu isSignedIn />);
      expect(screen.getByAltText("profile_icon")).toBeInTheDocument();
      expect(screen.getByText("プロフィール")).toBeInTheDocument();
    });

    test("プロフィールリンク押下でプロフィールページに遷移すること", async () => {
      (mockUseAuth as jest.Mock).mockReturnValue(mockContextValue);
      const user = userEvent.setup();
      render(<AuthMenu isSignedIn />);
      await user.click(screen.getByText("プロフィール"));
      expect(mockUseNavigate).toHaveBeenCalledWith("/profile");
      expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    });
  });
});

describe("未ログインの挙動のテスト", () => {
  test("loading中はコンポーネントが非表示になっていること", () => {
    (mockUseAuth as jest.Mock).mockReturnValue(mockContextValueLoading);
    render(<AuthMenu isSignedIn />);
    expect(screen.queryByRole("img", { name: "avatar" })).not.toBeInTheDocument();
    expect(screen.queryByRole("menu", { name: "プロフィールメニュー" })).not.toBeInTheDocument();
  });

  describe("アバターアイコンのテスト", () => {
    test("アバターアイコンが表示されていること", () => {
      (mockUseAuth as jest.Mock).mockReturnValue(mockContextValue);
      render(<AuthMenu isSignedIn={false} />);
      const avatarIcon = screen.getByRole("img", { name: "avatar" });
      expect(avatarIcon).toBeInTheDocument();
    });

    test("アバターアイコン押下でログインページに遷移すること", async () => {
      (mockUseAuth as jest.Mock).mockReturnValue(mockContextValue);
      const user = userEvent.setup();
      render(<AuthMenu isSignedIn={false} />);
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
      (mockUseAuth as jest.Mock).mockReturnValue(mockContextValue);
      render(<AuthMenu isSignedIn={false} />);
      const loginLink = screen.getByRole("link", { name: "ログイン" });
      expect(loginLink).toBeInTheDocument();
    });

    test("ログインリンク押下でログインページに遷移すること", async () => {
      (mockUseAuth as jest.Mock).mockReturnValue(mockContextValue);
      const user = userEvent.setup();
      render(<AuthMenu isSignedIn={false} />);
      const loginLink = screen.getByRole("link", { name: "ログイン" });
      await user.click(loginLink);
      expect(mockUseNavigate).toHaveBeenCalledWith("/login");
      expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    });
  });

  describe("サインアップリンクのテスト", () => {
    test("サインアップリンクが表示されていること", () => {
      (mockUseAuth as jest.Mock).mockReturnValue(mockContextValue);
      render(<AuthMenu isSignedIn={false} />);
      const signUpLink = screen.getByRole("link", { name: "新規登録" });
      expect(signUpLink).toBeInTheDocument();
    });

    test("サインアップリンク押下でサインアップページに遷移すること", async () => {
      (mockUseAuth as jest.Mock).mockReturnValue(mockContextValue);
      const user = userEvent.setup();
      render(<AuthMenu isSignedIn={false} />);
      const signUpLink = screen.getByRole("link", { name: "新規登録" });
      await user.click(signUpLink);
      expect(mockUseNavigate).toHaveBeenCalledWith("/signup");
      expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    });
  });
});
