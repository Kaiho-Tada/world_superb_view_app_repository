import { renderHook } from "@testing-library/react";
import useMessage from "hooks/useMessage";

const mockUseToast = jest.fn();

jest.mock("@chakra-ui/react", () => ({
  useToast: () => mockUseToast,
}));

describe("useMessageのテスト", () => {
  test("showMessage関数が正しく呼び出されること", () => {
    const { result } = renderHook(() => useMessage());

    result.current.showMessage({
      title: "success message",
      status: "success",
    });

    expect(mockUseToast).toHaveBeenCalledWith({
      title: "success message",
      status: "success",
      position: "top",
      duration: 5000,
      isClosable: true,
    });
  });
});
