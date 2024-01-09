import { renderHook } from "@testing-library/react";
import useHandleChangeFavorite from "features/worldView/hooks/api/useHandleChangeFavorite";

const mockUseToast = jest.fn();
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: () => mockUseToast,
}));
const mockSetFavoriteId = jest.fn();
const mockCreateFavoriteApi = jest.fn();
const mockDeleteFavoriteApi = jest.fn();
jest.mock("features/worldView/api/worldViewFavoriteApi", () => ({
  __esModule: true,
  default: () => ({
    createFavoriteApi: mockCreateFavoriteApi,
    deleteFavoriteApi: mockDeleteFavoriteApi,
  }),
}));

describe("handleChangeFavorite関数のテスト", () => {
  describe("favoriteIdが存在する(お気に入り済み)場合", () => {
    test("deleteFavoriteApi関数が成功した場合、favoriteIdがnullに更新されること", async () => {
      const { result } = renderHook(() => useHandleChangeFavorite());
      await result.current.handleChangeFavorite({
        selectedId: 1,
        favoriteId: 1,
        setFavoriteId: mockSetFavoriteId,
      });
      expect(mockDeleteFavoriteApi).toHaveBeenCalledWith(1);
      expect(mockDeleteFavoriteApi).toHaveBeenCalledTimes(1);
      expect(mockSetFavoriteId).toHaveBeenCalledWith(null);
      expect(mockSetFavoriteId).toHaveBeenCalledTimes(1);
    });

    test("deleteFavoriteApi関数が404番のステイタスコードを返した際に、適切なエラーメッセージが表示されること", async () => {
      mockDeleteFavoriteApi.mockImplementation(async () => {
        const error = new Error();
        Object.assign(error, { isAxiosError: true, response: { status: 404 } });
        throw error;
      });
      const { result } = renderHook(() => useHandleChangeFavorite());
      await result.current.handleChangeFavorite({
        selectedId: 1,
        favoriteId: 1,
        setFavoriteId: mockSetFavoriteId,
      });
      expect(mockSetFavoriteId).toHaveBeenCalledTimes(0);
      expect(mockUseToast).toHaveBeenCalledWith({
        title: "削除するリソースが見つかりませんでした。",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    });

    test("deleteFavoriteApi関数が500番のステイタスコードを返した際に、適切なエラーメッセージが表示されること", async () => {
      mockDeleteFavoriteApi.mockImplementation(async () => {
        const error = new Error();
        Object.assign(error, { isAxiosError: true, response: { status: 500 } });
        throw error;
      });
      const { result } = renderHook(() => useHandleChangeFavorite());
      await result.current.handleChangeFavorite({
        selectedId: 1,
        favoriteId: 1,
        setFavoriteId: mockSetFavoriteId,
      });
      expect(mockSetFavoriteId).toHaveBeenCalledTimes(0);
      expect(mockUseToast).toHaveBeenCalledWith({
        title: "サーバーエラーが発生しました。",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    });
  });

  describe("favoriteIdがnull(お気に入り未登録)の場合", () => {
    test("createFavoriteApi関数が成功した場合、favoriteIdが新規作成したfavortieのidに更新されること", async () => {
      mockCreateFavoriteApi.mockResolvedValue({ data: { id: 1 } });

      const { result } = renderHook(() => useHandleChangeFavorite());
      await result.current.handleChangeFavorite({
        selectedId: 1,
        favoriteId: null,
        setFavoriteId: mockSetFavoriteId,
      });
      expect(mockCreateFavoriteApi).toHaveBeenCalledWith(1);
      expect(mockCreateFavoriteApi).toHaveBeenCalledTimes(1);

      expect(mockSetFavoriteId).toHaveBeenCalledWith(1);
      expect(mockSetFavoriteId).toHaveBeenCalledTimes(1);
    });

    test("createFavoriteApi関数が422番のステイタスコードを返した際に、適切なエラーメッセージが表示されること", async () => {
      mockCreateFavoriteApi.mockImplementation(async () => {
        const error = new Error();
        Object.assign(error, { isAxiosError: true, response: { status: 422 } });
        throw error;
      });
      const { result } = renderHook(() => useHandleChangeFavorite());
      await result.current.handleChangeFavorite({
        selectedId: 2,
        favoriteId: null,
        setFavoriteId: mockSetFavoriteId,
      });
      expect(mockSetFavoriteId).toHaveBeenCalledTimes(0);
      expect(mockUseToast).toHaveBeenCalledWith({
        title: "お気に入りの登録に失敗しました。",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    });

    test("createFavoriteApi関数が401番のステイタスコードを返した際に、適切なエラーメッセージが表示されること", async () => {
      mockCreateFavoriteApi.mockImplementation(async () => {
        const error = new Error();
        Object.assign(error, { isAxiosError: true, response: { status: 401 } });
        throw error;
      });
      const { result } = renderHook(() => useHandleChangeFavorite());
      await result.current.handleChangeFavorite({
        selectedId: 2,
        favoriteId: null,
        setFavoriteId: mockSetFavoriteId,
      });
      expect(mockSetFavoriteId).toHaveBeenCalledTimes(0);
      expect(mockUseToast).toHaveBeenCalledWith({
        title: "ユーザーが認証されていません。",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    });

    test("createFavoriteApi関数が500番のステイタスコードを返した際に、適切なエラーメッセージが表示されること", async () => {
      mockCreateFavoriteApi.mockImplementation(async () => {
        const error = new Error();
        Object.assign(error, { isAxiosError: true, response: { status: 500 } });
        throw error;
      });
      const { result } = renderHook(() => useHandleChangeFavorite());
      await result.current.handleChangeFavorite({
        selectedId: 2,
        favoriteId: null,
        setFavoriteId: mockSetFavoriteId,
      });
      expect(mockSetFavoriteId).toHaveBeenCalledTimes(0);
      expect(mockUseToast).toHaveBeenCalledWith({
        title: "サーバーエラーが発生しました。",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    });
  });
});
