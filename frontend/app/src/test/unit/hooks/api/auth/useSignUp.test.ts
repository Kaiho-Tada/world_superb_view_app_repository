import { act, renderHook } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import useSignUp from "hooks/api/auth/useSignUp";
import client from "lib/api/client";

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

const mockSetLoading = jest.fn();

jest.mock("hooks/providers/useAuthProvider", () => ({
  ...jest.requireActual("hooks/providers/useAuthProvider"),
  useAuth: () => ({
    setLoading: mockSetLoading,
  }),
}));
const mockAxios = new MockAdapter(client);

afterEach(() => {
  mockAxios.resetHistory();
  jest.clearAllMocks();
});

mockAxios.onPost("/auth").reply((config) => {
  const data = JSON.parse(config.data);
  if (!data.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/)) {
    return [
      422,
      {
        errors: {
          fullMessages: ["Eメールは有効ではありません"],
        },
      },
    ];
  }
  if (data.password.length < 6) {
    return [
      422,
      {
        errors: {
          fullMessages: ["パスワードは6文字以上で入力してください"],
        },
      },
    ];
  }
  return [200];
});

test("サインアップ成功時の処理のテスト", async () => {
  const { result } = renderHook(() => useSignUp());

  const { setEmail, setPassword } = result.current;

  await act(async () => {
    setEmail("test@example.com");
    setPassword("password");
  });

  const { handleSignUp } = result.current;

  const mockEvent: Partial<React.MouseEvent<HTMLButtonElement, MouseEvent>> = {
    preventDefault: jest.fn(),
  };

  await handleSignUp(mockEvent as React.MouseEvent<HTMLButtonElement, MouseEvent>);

  expect(mockSetLoading).toHaveBeenCalledWith(true);

  expect(mockUseNavigate).toHaveBeenCalledWith("/login");
  expect(mockUseNavigate).toHaveBeenCalledTimes(1);

  expect(mockUseToast).toHaveBeenCalledWith({
    title:
      "登録メールアドレスにユーザー認証メールを送信しました。認証が完了しましたら、ログインしてください。",
    status: "success",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);

  expect(mockSetLoading).toHaveBeenCalledWith(false);
  expect(mockSetLoading).toHaveBeenCalledTimes(2);
});

describe("サインアップ失敗時の処理のテスト", () => {
  test("リクエストのemailのフォーマットが正しくない場合はプロフィールの更新に失敗すること", async () => {
    const { result } = renderHook(() => useSignUp());

    const { setEmail, setPassword } = result.current;

    await act(async () => {
      setEmail("test.example.com");
      setPassword("password");
    });

    const { handleSignUp } = result.current;

    const mockEvent: Partial<React.MouseEvent<HTMLButtonElement, MouseEvent>> = {
      preventDefault: jest.fn(),
    };

    await handleSignUp(mockEvent as React.MouseEvent<HTMLButtonElement, MouseEvent>);

    expect(mockSetLoading).toHaveBeenCalledWith(true);

    expect(mockUseToast).toHaveBeenCalledWith({
      title: "Eメールは有効ではありません",
      status: "error",
      position: "top",
      duration: 5000,
      isClosable: true,
    });
    expect(mockUseToast).toHaveBeenCalledTimes(1);

    expect(mockUseNavigate).not.toHaveBeenCalledWith();
    expect(mockUseNavigate).toHaveBeenCalledTimes(0);

    expect(mockSetLoading).toHaveBeenCalledWith(false);
    expect(mockSetLoading).toHaveBeenCalledTimes(2);
  });

  test("パスワードは6文字以上でなければ登録できないこと", async () => {
    const { result } = renderHook(() => useSignUp());

    const { setEmail, setPassword } = result.current;

    await act(async () => {
      setEmail("test@example.com");
      setPassword("passw");
    });

    const { handleSignUp } = result.current;

    const mockEvent: Partial<React.MouseEvent<HTMLButtonElement, MouseEvent>> = {
      preventDefault: jest.fn(),
    };

    await handleSignUp(mockEvent as React.MouseEvent<HTMLButtonElement, MouseEvent>);

    expect(mockSetLoading).toHaveBeenCalledWith(true);

    expect(mockUseToast).toHaveBeenCalledWith({
      title: "パスワードは6文字以上で入力してください",
      status: "error",
      position: "top",
      duration: 5000,
      isClosable: true,
    });
    expect(mockUseToast).toHaveBeenCalledTimes(1);

    expect(mockUseNavigate).not.toHaveBeenCalledWith();
    expect(mockUseNavigate).toHaveBeenCalledTimes(0);

    expect(mockSetLoading).toHaveBeenCalledWith(false);
    expect(mockSetLoading).toHaveBeenCalledTimes(2);
  });
});

test("サインアップエラー時の処理のテスト", async () => {
  mockAxios.onPost("/auth").reply(500);

  const { result } = renderHook(() => useSignUp());

  const { setEmail, setPassword } = result.current;

  await act(async () => {
    setEmail("test@example.com");
    setPassword("password");
  });

  const { handleSignUp } = result.current;

  const mockEvent: Partial<React.MouseEvent<HTMLButtonElement, MouseEvent>> = {
    preventDefault: jest.fn(),
  };

  await handleSignUp(mockEvent as React.MouseEvent<HTMLButtonElement, MouseEvent>);

  expect(mockSetLoading).toHaveBeenCalledWith(true);

  expect(mockUseNavigate).not.toHaveBeenCalledWith();
  expect(mockUseNavigate).toHaveBeenCalledTimes(0);

  expect(mockUseToast).toHaveBeenCalledWith({
    title: "エラーが発生しました。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);

  expect(mockSetLoading).toHaveBeenCalledWith(false);
  expect(mockSetLoading).toHaveBeenCalledTimes(2);
});
