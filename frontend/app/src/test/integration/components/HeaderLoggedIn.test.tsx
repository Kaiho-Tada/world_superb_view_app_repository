import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import { Header } from "components/organisms/layout/Header";
import { AuthProvider } from "hooks/providers/useAuthProvider";
import client from "lib/api/client";
import Cookies from "js-cookie";

afterEach(() => {
  mockAxios.resetHistory();
  jest.clearAllMocks();
});

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

jest.mock('js-cookie', () => ({
  ...jest.requireActual('js-cookie'),
  get: jest.fn(),
  remove: jest.fn(),
}));

const mockSetLoading = jest.fn();
const mockSetIsSignedIn = jest.fn();
const mocksetCurrentUser = jest.fn();

jest.mock('hooks/providers/useAuthProvider', () => ({
  ...jest.requireActual('hooks/providers/useAuthProvider'),
  useAuth: () => ({
    loading: false,
    isSignedIn: true,
    setIsSignedIn: mockSetIsSignedIn,
    setLoading: mockSetLoading,
    setCurrentUser: mocksetCurrentUser
  }),
}));

const mockAxios = new MockAdapter(client);
mockAxios.onDelete('auth/sign_out').reply(200);

describe('ログイン済みの挙動のテスト', () => {
  test('アバターアイコンが表示されていること', () => {
    render(
      <AuthProvider>
        <Header />
      </AuthProvider>
    );
    const avatarIcon = screen.getByRole('img', { name: "avatar" });
    expect(avatarIcon).toBeInTheDocument();
  });

  describe('サインアウトボタンのテスト', () => {
    test('サインアウトボタンのが表示されていること', () => {
      render(
        <AuthProvider>
          <Header />
        </AuthProvider>
      );
      const accountIcon = screen.getByAltText("account_icon");
      const signOutText = screen.getByText('サインアウト');
      expect(accountIcon).toBeInTheDocument();
      expect(signOutText).toBeInTheDocument();
    });
  });

  test('サインアウトボタン押下でサインアウトできること', async() => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <Header />
      </AuthProvider>
    );
    const signOutText = screen.getByText('サインアウト');
    await user.click(signOutText);

    expect(mockSetLoading).toHaveBeenCalledWith(true);

    expect(Cookies.remove).toHaveBeenCalledWith('_access_token');
    expect(Cookies.remove).toHaveBeenCalledWith('_client');
    expect(Cookies.remove).toHaveBeenCalledWith('_uid');

    expect(mockUseToast).toHaveBeenCalledWith({
      title: "サインアウトしました。",
      status: 'success',
      position: "top",
      duration: 5000,
      isClosable: true,
    });
    expect(mockUseToast).toHaveBeenCalledTimes(1);

    expect(mockSetIsSignedIn).toHaveBeenCalledWith(false);
    expect(mockSetIsSignedIn).toHaveBeenCalledTimes(1);

    expect(mocksetCurrentUser).toHaveBeenCalledWith(undefined);
    expect(mocksetCurrentUser).toHaveBeenCalledTimes(1);

    expect(mockUseNavigate).toHaveBeenCalledWith("/login");
    expect(mockUseNavigate).toHaveBeenCalledTimes(1);

    expect(mockSetLoading).toHaveBeenCalledWith(false);
    expect(mockSetLoading).toHaveBeenCalledTimes(2);
  });
});

describe('アプリロゴのテスト', () => {
  test('アプリのロゴが表示されていること', () => {
    render(
      <AuthProvider>
        <Header />
      </AuthProvider>
    );
    const appLogo = screen.getByRole('heading', { name: "App"});
    expect(appLogo).toBeInTheDocument();
  });

  test('ロゴ押下でhomeページ遷移すること', async() => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <Header />
      </AuthProvider>
    );
    const appLogo = screen.getByRole('heading', { name: "App"});
    await user.click(appLogo);
    expect(mockUseNavigate).toHaveBeenCalledWith('/home');
    expect(mockUseNavigate).toHaveBeenCalledTimes(1);
  });
});
