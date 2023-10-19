import { act, renderHook } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import useUpdateUser from "hooks/api/useUpdateUser";
import Cookies from "js-cookie";
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

jest.mock("js-cookie", () => ({
  ...jest.requireActual("js-cookie"),
  get: jest.fn(),
  set: jest.fn(),
}));

const mockSetLoading = jest.fn();
const mockSetCurrentUser = jest.fn();

jest.mock("hooks/providers/useAuthProvider", () => ({
  ...jest.requireActual("hooks/providers/useAuthProvider"),
  useAuth: () => ({
    setLoading: mockSetLoading,
    setCurrentUser: mockSetCurrentUser,
  }),
}));

client.interceptors.response.use((config) => {
  const modifiedConfig = { ...config, headers: { ...config.headers, uid: "uid" } };
  return modifiedConfig;
});

const mockAxios = new MockAdapter(client);

afterEach(() => {
  mockAxios.resetHistory();
  jest.clearAllMocks();
});

mockAxios.onPut("auth").reply((config) => {
  const data = JSON.parse(config.data);
  if (data.email === "") {
    return [
      422,
      {
        errors: {
          fullMessages: ["Eメールを入力してください"],
        },
      },
    ];
  }
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
  return [200, { data }];
});

test("プロフィール更新成功時のテスト", async () => {
  const { result } = renderHook(() => useUpdateUser());

  const { setName, setNickname, setEmail } = result.current;

  await act(async () => {
    setName("new_name");
    setNickname("new_nickname");
    setEmail("new_test@example.com");
  });

  const { handleUpdateUser } = result.current;

  const mockEvent: Partial<React.MouseEvent<HTMLButtonElement, MouseEvent>> = {
    preventDefault: jest.fn(),
  };
  await handleUpdateUser(mockEvent as React.MouseEvent<HTMLButtonElement, MouseEvent>);

  expect(mockSetLoading).toHaveBeenCalledWith(true);

  expect(Cookies.set).toHaveBeenCalledWith("_uid", "uid");

  expect(mockUseToast).toHaveBeenCalledWith({
    title: "プロフィールを更新しました。",
    status: "success",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);

  expect(mockSetCurrentUser).toHaveBeenCalledWith({
    name: "new_name",
    nickname: "new_nickname",
    email: "new_test@example.com",
  });
  expect(mockSetCurrentUser).toHaveBeenCalledTimes(1);

  expect(mockSetLoading).toHaveBeenCalledWith(false);
  expect(mockSetLoading).toHaveBeenCalledTimes(2);
});

describe("プロフィール更新失敗時の処理のテスト", () => {
  test("リクエストのemailが空文字列の場合はプロフィールの更新に失敗すること", async () => {
    const { result } = renderHook(() => useUpdateUser());

    const { setName, setNickname, setEmail } = result.current;

    await act(async () => {
      setName("new_name");
      setNickname("new_nickname");
      setEmail("");
    });

    const { handleUpdateUser } = result.current;

    const mockEvent: Partial<React.MouseEvent<HTMLButtonElement, MouseEvent>> = {
      preventDefault: jest.fn(),
    };
    await handleUpdateUser(mockEvent as React.MouseEvent<HTMLButtonElement, MouseEvent>);

    expect(mockSetLoading).toHaveBeenCalledWith(true);

    expect(mockSetCurrentUser).not.toHaveBeenCalledWith();
    expect(mockSetCurrentUser).toHaveBeenCalledTimes(0);

    expect(mockUseToast).toHaveBeenCalledWith({
      title: "Eメールを入力してください",
      status: "error",
      position: "top",
      duration: 5000,
      isClosable: true,
    });

    expect(mockUseToast).toHaveBeenCalledTimes(1);

    expect(mockSetLoading).toHaveBeenCalledWith(false);
    expect(mockSetLoading).toHaveBeenCalledTimes(2);
  });

  test("リクエストのemailのフォーマットが正しくない場合はプロフィールの更新に失敗すること", async () => {
    const { result } = renderHook(() => useUpdateUser());

    const { setName, setNickname, setEmail } = result.current;

    await act(async () => {
      setName("new_name");
      setNickname("new_nickname");
      setEmail("test.example.com");
    });

    const { handleUpdateUser } = result.current;

    const mockEvent: Partial<React.MouseEvent<HTMLButtonElement, MouseEvent>> = {
      preventDefault: jest.fn(),
    };
    await handleUpdateUser(mockEvent as React.MouseEvent<HTMLButtonElement, MouseEvent>);

    expect(mockSetLoading).toHaveBeenCalledWith(true);

    expect(mockSetCurrentUser).not.toHaveBeenCalledWith();
    expect(mockSetCurrentUser).toHaveBeenCalledTimes(0);

    expect(mockUseToast).toHaveBeenCalledWith({
      title: "Eメールは有効ではありません",
      status: "error",
      position: "top",
      duration: 5000,
      isClosable: true,
    });

    expect(mockUseToast).toHaveBeenCalledTimes(1);

    expect(mockSetLoading).toHaveBeenCalledWith(false);
    expect(mockSetLoading).toHaveBeenCalledTimes(2);
  });
});

test("プロフィール更新エラー時の処理のテスト", async () => {
  mockAxios.onPut("auth").reply(500);

  const { result } = renderHook(() => useUpdateUser());

  const { setName, setNickname, setEmail } = result.current;

  await act(async () => {
    setName("new_name");
    setNickname("new_nickname");
    setEmail("test@example.com");
  });

  const { handleUpdateUser } = result.current;

  const mockEvent: Partial<React.MouseEvent<HTMLButtonElement, MouseEvent>> = {
    preventDefault: jest.fn(),
  };
  await handleUpdateUser(mockEvent as React.MouseEvent<HTMLButtonElement, MouseEvent>);

  expect(mockSetLoading).toHaveBeenCalledWith(true);

  expect(mockSetCurrentUser).not.toHaveBeenCalledWith();
  expect(mockSetCurrentUser).toHaveBeenCalledTimes(0);

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
