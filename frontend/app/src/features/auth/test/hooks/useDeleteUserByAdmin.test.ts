import { renderHook } from "@testing-library/react";
import useDeleteUserByAdmin from "features/auth/hooks/useDeleteUserByAdmin";
import { act } from "react-dom/test-utils";

const mockSetLoading = jest.fn();
jest.mock("providers/useAuthProvider", () => ({
  ...jest.requireActual("providers/useAuthProvider"),
  useAuth: () => ({
    setLoading: mockSetLoading,
  }),
}));

const mockUseToast = jest.fn();
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: () => mockUseToast,
}));

const userId = 106;

test("アカウント削除成功時の処理のテスト", async () => {
  const spyOnDeleteUserByAdminApi = jest.spyOn(
    jest.requireActual("features/auth/api/deleteUserByAdminApi"),
    "default"
  );
  spyOnDeleteUserByAdminApi.mockReturnValue({
    data: { message: "'test@example.com' のアカウントは削除されました。" },
  });

  const { result } = renderHook(() => useDeleteUserByAdmin());
  const { handleDeleteUserByAdmin } = result.current;
  await act(async () => {
    await handleDeleteUserByAdmin({ userId });
  });

  expect(mockSetLoading).toHaveBeenCalledWith(true);
  expect(spyOnDeleteUserByAdminApi).toHaveBeenCalledWith(106);
  expect(spyOnDeleteUserByAdminApi).toHaveBeenCalledTimes(1);
  expect(mockUseToast).toHaveBeenCalledWith({
    title: "'test@example.com' のアカウントは削除されました。",
    status: "success",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);
});

test("deleteUserByAdminApi関数が404番のステイタスコードを返した際に、適切なエラーメッセージが表示されること", async () => {
  const spyOnDeleteUserByAdminApi = jest.spyOn(
    jest.requireActual("features/auth/api/deleteUserByAdminApi"),
    "default"
  );
  spyOnDeleteUserByAdminApi.mockImplementation(() => {
    const error = new Error();
    Object.assign(error, {
      isAxiosError: true,
      response: { status: 404 },
    });
    throw error;
  });

  const { result } = renderHook(() => useDeleteUserByAdmin());
  const { handleDeleteUserByAdmin } = result.current;
  await act(async () => {
    await handleDeleteUserByAdmin({ userId });
  });

  expect(mockSetLoading).toHaveBeenCalledWith(true);
  expect(spyOnDeleteUserByAdminApi).toHaveBeenCalledWith(106);
  expect(spyOnDeleteUserByAdminApi).toHaveBeenCalledTimes(1);
  expect(mockUseToast).toHaveBeenCalledWith({
    title: "リソースが見つかりません。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);
});

test("アカウント削除エラー時の処理のテスト", async () => {
  const spyOnDeleteUserByAdminApi = jest.spyOn(
    jest.requireActual("features/auth/api/deleteUserByAdminApi"),
    "default"
  );
  spyOnDeleteUserByAdminApi.mockRejectedValue(new Error());

  const { result } = renderHook(() => useDeleteUserByAdmin());
  const { handleDeleteUserByAdmin } = result.current;
  await act(async () => {
    await handleDeleteUserByAdmin({ userId });
  });

  expect(mockSetLoading).toHaveBeenCalledWith(true);
  expect(spyOnDeleteUserByAdminApi).toHaveBeenCalledWith(106);
  expect(spyOnDeleteUserByAdminApi).toHaveBeenCalledTimes(1);
  expect(mockUseToast).toHaveBeenCalledWith({
    title: "エラーが発生しました。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockUseToast).toHaveBeenCalledTimes(1);
});
