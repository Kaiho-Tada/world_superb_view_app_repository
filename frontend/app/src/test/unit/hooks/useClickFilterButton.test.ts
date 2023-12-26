import { useBreakpointValue as mockUseBreakpointValue } from "@chakra-ui/react";
import { renderHook } from "@testing-library/react";
import { useWorldViewListContext as mockUseWorldViewListContext } from "hooks/providers/WorldViewListProvider";
import useClickFilterButton from "hooks/useClickFilterButton";

jest.mock("@chakra-ui/react", () => ({
  useBreakpointValue: jest.fn(),
}));

const mockDispatch = jest.fn();
jest.mock("hooks/providers/WorldViewListProvider", () => ({
  useWorldViewListContext: jest.fn(),
}));

const mockContextValueOpenFilterAccordion = {
  dispatch: mockDispatch,
  state: {
    isOpenFilterAccordion: true,
  },
};

const mockContextValueNotOpenFilterAccordion = {
  dispatch: mockDispatch,
  state: {
    isOpenFilterAccordion: false,
  },
};

describe("displayプロパティがlgの場合", () => {
  describe("isOpenFilterAccordionがtrueの場合", () => {
    test("CLOSE_FILTER_ACCODIONがdispatchされること", () => {
      (mockUseBreakpointValue as jest.Mock).mockReturnValue("lg");
      (mockUseWorldViewListContext as jest.Mock).mockImplementation(
        () => mockContextValueOpenFilterAccordion
      );
      const { result } = renderHook(() => useClickFilterButton());
      result.current.handleClickFilterButton();
      expect(mockDispatch).toHaveBeenCalledWith({ type: "CLOSE_FILTER_ACCODION" });
    });
  });

  describe("isOpenFilterAccordionがfalseの場合", () => {
    test("OPEN_FILTER_ACCODIONがdispatchされること", () => {
      (mockUseBreakpointValue as jest.Mock).mockReturnValue("lg");
      (mockUseWorldViewListContext as jest.Mock).mockImplementation(
        () => mockContextValueNotOpenFilterAccordion
      );
      const { result } = renderHook(() => useClickFilterButton());
      result.current.handleClickFilterButton();
      expect(mockDispatch).toHaveBeenCalledWith({ type: "OPEN_FILTER_ACCODION" });
    });
  });
});

describe("displayプロパティがbaseの場合", () => {
  test("OPEN_FILTER_DRAWERがdispatchされること", () => {
    (mockUseBreakpointValue as jest.Mock).mockReturnValue("base");
    (mockUseWorldViewListContext as jest.Mock).mockImplementation(
      () => mockContextValueOpenFilterAccordion
    );
    const { result } = renderHook(() => useClickFilterButton());
    result.current.handleClickFilterButton();
    expect(mockDispatch).toHaveBeenCalledWith({ type: "OPEN_FILTER_DRAWER" });
  });
});
