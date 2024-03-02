import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterAccordionPanel from "features/video/components/ui-parts/FilterAccordionPanel";
import { act } from "react-dom/test-utils";

global.ResizeObserver = require("resize-observer-polyfill");

const spyOnUseVideoListContext = jest.spyOn(
  jest.requireActual("providers/VideoListProvider"),
  "useVideoListContext"
);

const mockDispatch = jest.fn();
const mockContextValue = {
  dispatch: mockDispatch,
  state: {
    genreCheckItems: [
      { label: "ラベルA", checked: false },
      { label: "ラベルB", checked: false },
    ],
    loadingGetGenres: false,
    loadingSearchVideos: false,
    keyword: "",
    voteAverageRange: [0, 10],
    isDisabled: false,
  },
};

const mockContextValueLoadingVideo = {
  ...mockContextValue,
  state: {
    ...mockContextValue.state,
    loadingSearchVideos: true,
  },
};

const mockContextValueLoadingGenre = {
  ...mockContextValue,
  state: {
    ...mockContextValue.state,
    loadingGetGenres: true,
  },
};

const mockContextValueDisabled = {
  ...mockContextValue,
  state: {
    ...mockContextValue.state,
    isDisabled: true,
  },
};

describe("クリアボタンのテスト", () => {
  describe("Videoモデルのフィルター属性の値が初期値の場合", () => {
    test("クリアボタンが非表示であること", async () => {
      spyOnUseVideoListContext.mockReturnValue(mockContextValue);
      render(<FilterAccordionPanel />);
      expect(screen.queryByRole("button", { name: "クリア" })).not.toBeInTheDocument();
    });
  });

  describe("Videoモデルのフィルター属性の値が初期値ではない場合", () => {
    const mockContextValueChecked = {
      ...mockContextValue,
      state: {
        ...mockContextValue.state,
        genreCheckItems: [{ label: "ラベルA", checked: true }],
      },
    };

    test("クリアボタンがレンダリングされていること", async () => {
      spyOnUseVideoListContext.mockReturnValue(mockContextValueChecked);
      render(<FilterAccordionPanel />);
      expect(screen.getByRole("button", { name: "クリア" })).toBeInTheDocument();
    });

    test("クリアボタン押下でhandleClear関数が呼び出されること", async () => {
      spyOnUseVideoListContext.mockReturnValue(mockContextValueChecked);
      const spyOnUseClear = jest.spyOn(
        jest.requireActual("features/video/hooks/useClear"),
        "default"
      );
      const mockHandleClear = jest.fn();
      spyOnUseClear.mockReturnValue({ handleClear: mockHandleClear });
      const user = userEvent.setup();
      render(<FilterAccordionPanel />);
      await act(async () => {
        await user.click(screen.getByRole("button", { name: "クリア" }));
      });
      expect(mockHandleClear).toHaveBeenCalledTimes(1);
      spyOnUseClear.mockRestore();
    });
  });
});

describe("FilterSearchBoxのテスト", () => {
  test("textboxがレンダリングされていること", async () => {
    spyOnUseVideoListContext.mockReturnValue(mockContextValue);
    render(<FilterAccordionPanel />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("loadingSearchVideosがtrueの場合、textboxが非活性であること", async () => {
    spyOnUseVideoListContext.mockReturnValue(mockContextValueLoadingVideo);
    render(<FilterAccordionPanel />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  test("textboxの入力をトリガーにSET_KEYWORDアクションとSET_SHOULD_DEBOUNCEアクションがディスパッチされること", async () => {
    spyOnUseVideoListContext.mockReturnValue(mockContextValue);
    const user = userEvent.setup();
    render(<FilterAccordionPanel />);
    await act(async () => {
      await user.type(screen.getByRole("textbox"), "キ");
    });
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_KEYWORD", payload: "キ" });
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_SHOULD_DEBOUNCE", payload: true });
    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });
});

describe("ジャンルのCheckItemBoxのテスト", () => {
  test("CheckItemBoxがレンダリングされること", async () => {
    spyOnUseVideoListContext.mockReturnValue(mockContextValue);
    render(<FilterAccordionPanel />);
    expect(screen.getByRole("button", { name: "ラベルA" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "ラベルB" })).toBeInTheDocument();
  });

  test("loadingGetGenresがtrueの場合、loadingが表示されていること", async () => {
    spyOnUseVideoListContext.mockReturnValue(mockContextValueLoadingGenre);
    render(<FilterAccordionPanel />);
    expect(screen.getByRole("status", { name: "読み込み中" })).toBeInTheDocument();
  });

  test("loadingSearchVideosがtrueの場合、CheckItemBoxが非活性であること", async () => {
    spyOnUseVideoListContext.mockReturnValue(mockContextValueLoadingVideo);
    render(<FilterAccordionPanel />);
    expect(screen.getByRole("button", { name: "ラベルA" })).toHaveStyle("opacity: 0.5");
    expect(screen.getByRole("button", { name: "ラベルA" })).toHaveStyle("pointer-events: none");
    expect(screen.getByRole("button", { name: "ラベルB" })).toHaveStyle("opacity: 0.5");
    expect(screen.getByRole("button", { name: "ラベルB" })).toHaveStyle("pointer-events: none");
  });
});

describe("FilterRangeSliderのテスト", () => {
  test("RangeSliderがレンダリングされること", async () => {
    spyOnUseVideoListContext.mockReturnValue(mockContextValue);
    render(<FilterAccordionPanel />);
    expect(screen.getAllByRole("slider").length).toBe(2);
  });

  test("isDisabledがtureの場合、スライダーのクリック時ににisDisabledがfalseに更新され、SET_VOTE_AVERAGE_RENGEアクションがdispatchされること", async () => {
    spyOnUseVideoListContext.mockReturnValue(mockContextValueDisabled);
    const user = userEvent.setup();
    render(<FilterAccordionPanel />);
    const sliders = screen.getAllByRole("slider");
    await act(async () => {
      await user.click(sliders[0]);
    });
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_IS_DISABLED", payload: false });
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_VOTE_AVERAGE_RENGE", payload: [0, 10] });
    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });
});

describe("SearchButtonのテスト", () => {
  test("SearchButtonがレンダリングされていること", async () => {
    spyOnUseVideoListContext.mockReturnValue(mockContextValue);
    render(<FilterAccordionPanel />);
    expect(screen.getByRole("button", { name: "検索" })).toBeInTheDocument();
  });

  test("isDisabledがfalseの場合、SearchButton押下でisDisabledがtrueに更新され、handleGetModel関数が呼び出されること", async () => {
    spyOnUseVideoListContext.mockReturnValue(mockContextValue);
    const spyOnUseGetModel = jest.spyOn(jest.requireActual("hooks/api/useGetModel"), "default");
    const mockHandleGetModel = jest.fn();
    spyOnUseGetModel.mockReturnValue({
      handleGetModel: mockHandleGetModel,
    });
    const spyOnUseVideoApi = jest.spyOn(
      jest.requireActual("features/video/api/videoApi"),
      "default"
    );
    const mockSearchVideoApi = jest.fn();
    spyOnUseVideoApi.mockReturnValue({ searchVideoApi: mockSearchVideoApi });
    const user = userEvent.setup();
    render(<FilterAccordionPanel />);
    await act(async () => {
      await user.click(screen.getByRole("button", { name: "検索" }));
    });
    expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_IS_DISABLED", payload: true });
    expect(mockHandleGetModel).toHaveBeenCalledWith({
      modelDispatch: expect.any(Function),
      loadingSearchModelDispatch: expect.any(Function),
      searchModelApi: mockSearchVideoApi,
    });
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockHandleGetModel).toHaveBeenCalledTimes(1);
    spyOnUseGetModel.mockRestore();
    spyOnUseVideoApi.mockRestore();
  });
});
