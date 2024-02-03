import { act, renderHook } from "@testing-library/react";
import useUpdateUser from "features/auth/hooks/useUpdateUser";
import Cookies from "js-cookie";

const mockSetCurrentUser = jest.fn();
const mockSetLoading = jest.fn();
jest.mock("providers/useAuthProvider", () => ({
  ...jest.requireActual("providers/useAuthProvider"),
  useAuth: () => ({
    setCurrentUser: mockSetCurrentUser,
    setLoading: mockSetLoading,
  }),
}));

const mockUseToast = jest.fn();
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: () => mockUseToast,
}));

jest.mock("js-cookie", () => ({
  ...jest.requireActual("js-cookie"),
  set: jest.fn(),
}));

const spyOnUpdateUserApi = jest.spyOn(
  jest.requireActual("features/auth/api/updateUserApi"),
  "default"
);

test("プロフィール更新成功時のテスト", async () => {
  spyOnUpdateUserApi.mockReturnValue({
    data: { data: { id: "1", email: "test@example.com", name: "name", nickname: "nickname" } },
    headers: { uid: "uid" },
  });

  const { result } = renderHook(() => useUpdateUser());
  const { setName, setNickname, setEmail } = result.current;
  await act(async () => {
    setName("name");
    setNickname("nickname");
    setEmail("test@example.com");
  });
  const { handleUpdateUser } = result.current;
  const mockEvent: Partial<React.MouseEvent<HTMLButtonElement, MouseEvent>> = {
    preventDefault: jest.fn(),
  };
  await act(async () => {
    await handleUpdateUser(mockEvent as React.MouseEvent<HTMLButtonElement, MouseEvent>);
  });

  expect(mockSetLoading).toHaveBeenCalledWith(true);
  expect(spyOnUpdateUserApi).toHaveBeenCalledWith({
    name: "name",
    nickname: "nickname",
    email: "test@example.com",
  });
  expect(Cookies.set).toHaveBeenCalledWith("_uid", "uid");
  expect(mockSetCurrentUser).toHaveBeenCalledWith({
    id: "1",
    email: "test@example.com",
    name: "name",
    nickname: "nickname",
  });
  expect(mockSetCurrentUser).toHaveBeenCalledTimes(1);
  expect(mockUseToast).toHaveBeenCalledWith({
    title: "プロフィールを更新しました。",
    status: "success",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);
  expect(mockSetLoading).toHaveBeenCalledWith(false);
  expect(mockSetLoading).toHaveBeenCalledTimes(2);
});

test("プロフィール更新エラー時の処理のテスト", async () => {
  spyOnUpdateUserApi.mockRejectedValue(new Error());

  const { result } = renderHook(() => useUpdateUser());
  const { setName, setNickname, setEmail } = result.current;
  await act(async () => {
    setName("name");
    setNickname("nickname");
    setEmail("test@example.com");
  });
  const { handleUpdateUser } = result.current;
  const mockEvent: Partial<React.MouseEvent<HTMLButtonElement, MouseEvent>> = {
    preventDefault: jest.fn(),
  };
  await act(async () => {
    await handleUpdateUser(mockEvent as React.MouseEvent<HTMLButtonElement, MouseEvent>);
  });

  expect(mockSetLoading).toHaveBeenCalledWith(true);
  expect(spyOnUpdateUserApi).toHaveBeenCalledWith({
    name: "name",
    nickname: "nickname",
    email: "test@example.com",
  });
  expect(Cookies.set).toHaveBeenCalledTimes(0);
  expect(mockSetCurrentUser).not.toHaveBeenCalledWith();
  expect(mockSetCurrentUser).toHaveBeenCalledTimes(0);
  expect(mockUseToast).toHaveBeenCalledWith({
    title: "プロフィール更新時にエラーが発生しました。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);
  expect(mockSetLoading).toHaveBeenCalledWith(false);
  expect(mockSetLoading).toHaveBeenCalledTimes(2);
});

describe("プロフィール更新失敗時の処理のテスト", () => {
  test("updateUserApi関数が403番のステイタスコードを返した際に、適切なエラーメッセージが表示されること", async () => {
    spyOnUpdateUserApi.mockImplementation(() => {
      const error = new Error();
      Object.assign(error, {
        isAxiosError: true,
        response: { status: 403, data: { error: "ゲストユーザーは許可されていません。" } },
      });
      throw error;
    });

    const { result } = renderHook(() => useUpdateUser());
    const { setName, setNickname, setEmail } = result.current;
    await act(async () => {
      setName("name");
      setNickname("nickname");
      setEmail("guest@example.com");
    });
    const { handleUpdateUser } = result.current;
    const mockEvent: Partial<React.MouseEvent<HTMLButtonElement, MouseEvent>> = {
      preventDefault: jest.fn(),
    };
    await act(async () => {
      await handleUpdateUser(mockEvent as React.MouseEvent<HTMLButtonElement, MouseEvent>);
    });

    expect(mockSetLoading).toHaveBeenCalledWith(true);
    expect(spyOnUpdateUserApi).toHaveBeenCalledWith({
      name: "name",
      nickname: "nickname",
      email: "guest@example.com",
    });
    expect(Cookies.set).toHaveBeenCalledTimes(0);
    expect(mockSetCurrentUser).toHaveBeenCalledTimes(0);
    expect(mockUseToast).toHaveBeenCalledWith({
      title: "ゲストユーザーは許可されていません。",
      status: "error",
      position: "top",
      duration: 5000,
      isClosable: true,
    });
    expect(mockUseToast).toHaveBeenCalledTimes(1);
    expect(mockSetLoading).toHaveBeenCalledWith(false);
    expect(mockSetLoading).toHaveBeenCalledTimes(2);
  });

  test("リクエストのemailが空文字列の場合はプロフィールの更新に失敗すること", async () => {
    spyOnUpdateUserApi.mockImplementation(() => {
      const error = new Error();
      Object.assign(error, {
        isAxiosError: true,
        response: {
          status: 422,
          data: {
            errors: {
              fullMessages: ["Eメールを入力してください", "Eメールは有効ではありません"],
            },
          },
        },
      });
      throw error;
    });

    const { result } = renderHook(() => useUpdateUser());
    const { setName, setNickname, setEmail } = result.current;
    await act(async () => {
      setName("name");
      setNickname("nickname");
      setEmail("test@example.com");
    });
    const { handleUpdateUser } = result.current;
    const mockEvent: Partial<React.MouseEvent<HTMLButtonElement, MouseEvent>> = {
      preventDefault: jest.fn(),
    };
    await act(async () => {
      await handleUpdateUser(mockEvent as React.MouseEvent<HTMLButtonElement, MouseEvent>);
    });

    expect(mockSetLoading).toHaveBeenCalledWith(true);
    expect(spyOnUpdateUserApi).toHaveBeenCalledWith({
      name: "name",
      nickname: "nickname",
      email: "test@example.com",
    });
    expect(Cookies.set).toHaveBeenCalledTimes(0);
    expect(mockSetCurrentUser).toHaveBeenCalledTimes(0);
    expect(mockUseToast).toHaveBeenCalledWith({
      title: "Eメールを入力してください",
      status: "error",
      position: "top",
      duration: 5000,
      isClosable: true,
    });
    expect(mockUseToast).toHaveBeenCalledWith({
      title: "Eメールは有効ではありません",
      status: "error",
      position: "top",
      duration: 5000,
      isClosable: true,
    });
    expect(mockUseToast).toHaveBeenCalledTimes(2);
    expect(mockSetLoading).toHaveBeenCalledWith(false);
    expect(mockSetLoading).toHaveBeenCalledTimes(2);
  });
});
