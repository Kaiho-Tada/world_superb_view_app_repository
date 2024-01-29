import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Header from "components/layout/Header";
import { useAuth as mockUseAuth } from "providers/useAuthProvider";

const mockUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
}));

jest.mock("providers/useAuthProvider", () => ({
  ...jest.requireActual("providers/useAuthProvider"),
  useAuth: jest.fn(),
}));

const mockContextValueNotSignIn = {
  isSignedIn: false,
};

const mockContextValueSignIn = {
  isSignedIn: true,
};

describe("アプリロゴのテスト", () => {
  test("アプリのロゴが表示されていること", () => {
    (mockUseAuth as jest.Mock).mockReturnValue(mockContextValueNotSignIn);
    render(<Header />);
    expect(screen.getByRole("heading", { name: "App" })).toBeInTheDocument();
  });

  test("ロゴ押下でhomeページ遷移すること", async () => {
    (mockUseAuth as jest.Mock).mockReturnValue(mockContextValueNotSignIn);
    const user = userEvent.setup();
    render(<Header />);
    await user.click(screen.getByRole("heading", { name: "App" }));
    expect(mockUseNavigate).toHaveBeenCalledWith("/home");
    expect(mockUseNavigate).toHaveBeenCalledTimes(1);
  });
});

describe("絶景一覧リンクのテスト", () => {
  test("絶景一覧リンクが表示されていること", () => {
    (mockUseAuth as jest.Mock).mockReturnValue(mockContextValueNotSignIn);
    render(<Header />);
    expect(screen.getByRole("link", { name: "絶景一覧" })).toBeInTheDocument();
  });

  test("絶景一覧リンク押下で絶景一覧ページへ遷移すること", async () => {
    (mockUseAuth as jest.Mock).mockReturnValue(mockContextValueNotSignIn);
    const user = userEvent.setup();
    render(<Header />);
    await user.click(screen.getByRole("link", { name: "絶景一覧" }));
    expect(mockUseNavigate).toHaveBeenCalledWith("/world_views");
    expect(mockUseNavigate).toHaveBeenCalledTimes(1);
  });
});

describe("アバターアイコンのテスト", () => {
  test("アバターアイコンが表示されていること", () => {
    (mockUseAuth as jest.Mock).mockReturnValue(mockContextValueNotSignIn);
    render(<Header />);
    expect(screen.getByRole("img", { name: "avatar" })).toBeInTheDocument();
  });
});

describe("未ログインの挙動のテスト", () => {
  (mockUseAuth as jest.Mock).mockReturnValue(mockContextValueNotSignIn);
  test("プロフィールメニューがレンダリングされていること", () => {
    (mockUseAuth as jest.Mock).mockReturnValue(mockContextValueNotSignIn);
    render(<Header />);
    expect(screen.getByRole("menu", { name: "プロフィールメニュー" })).toBeInTheDocument();
  });
});

describe("ログイン済みの挙動のテスト", () => {
  test("アバターアイコン押下でPopoverのプロフィールメニューが表示されること", () => {
    (mockUseAuth as jest.Mock).mockReturnValue(mockContextValueSignIn);
    const user = userEvent.setup();
    render(<Header />);
    user.click(screen.getByRole("img", { name: "avatar" }));
    waitFor(() => {
      expect(
        screen.getByRole("menu", { name: "Popoverのプロフィールメニュー" })
      ).toBeInTheDocument();
    });
  });
});
