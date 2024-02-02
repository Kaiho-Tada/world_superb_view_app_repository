import { renderHook } from "@testing-library/react";
import useGetAllModels from "hooks/api/useGetAllModels";
import { act } from "react-dom/test-utils";

const mockUseToast = jest.fn();
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: () => mockUseToast,
}));

const mockSetModels = jest.fn();
const mockSetLoading = jest.fn();
const mockGetAllModelsApi = jest.fn();

test("全モデル取得成功時の処理のテスト", async () => {
  mockGetAllModelsApi.mockReturnValue({
    data: [
      {
        id: 1,
        name: "name1",
      },
      {
        id: 2,
        name: "name2",
      },
    ],
  });

  const { result } = renderHook(() => useGetAllModels());
  const { handleGetAllModels } = result.current;
  await act(async () => {
    await handleGetAllModels({
      setModels: mockSetModels,
      setLoading: mockSetLoading,
      getAllModelsApi: mockGetAllModelsApi,
    });
  });

  expect(mockSetLoading).toHaveBeenCalledWith(true);
  expect(mockGetAllModelsApi).toHaveBeenCalledTimes(1);
  expect(mockSetModels).toHaveBeenCalledWith([
    {
      id: 1,
      name: "name1",
    },
    {
      id: 2,
      name: "name2",
    },
  ]);
  expect(mockSetLoading).toHaveBeenCalledWith(false);
  expect(mockSetLoading).toHaveBeenCalledTimes(2);
});

test("getAllModelsApi関数がエラーを返した際の処理のテスト", async () => {
  mockGetAllModelsApi.mockImplementation(() => {
    const error = new Error();
    Object.assign(error, {
      isAxiosError: true,
      response: { status: 500, data: { error: "モデルの取得に失敗しました。" } },
    });
    throw error;
  });

  const { result } = renderHook(() => useGetAllModels());
  const { handleGetAllModels } = result.current;
  await act(async () => {
    await handleGetAllModels({
      setModels: mockSetModels,
      setLoading: mockSetLoading,
      getAllModelsApi: mockGetAllModelsApi,
    });
  });

  expect(mockSetLoading).toHaveBeenCalledWith(true);
  expect(mockGetAllModelsApi).toHaveBeenCalledTimes(1);
  expect(mockSetModels).toHaveBeenCalledTimes(0);
  expect(mockUseToast).toHaveBeenCalledWith({
    title: "モデルの取得に失敗しました。",
    status: "error",
    position: "top",
    duration: 5000,
    isClosable: true,
  });
  expect(mockSetLoading).toHaveBeenCalledWith(false);
  expect(mockSetLoading).toHaveBeenCalledTimes(2);
});
