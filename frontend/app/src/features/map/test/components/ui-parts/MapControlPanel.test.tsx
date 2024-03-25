import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MapControlPanel from "features/map/components/ui-parts/MapControlPanel";
import { useMapContext as mockUseMapContext } from "providers/MapProvider";
import { act } from "react-dom/test-utils";

jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useBreakpointValue: () => "xs",
}));

jest.mock("providers/MapProvider", () => ({
  useMapContext: jest.fn(),
}));

const mockDispatch = jest.fn();
const mockInitContextValue = {
  dispatch: mockDispatch,
  state: {
    visibleValue: "marker",
    selectedValue: "worldView",
    isHoveredMapControlIcon: false,
  },
};

const mockContextValue = {
  ...mockInitContextValue,
  state: {
    ...mockInitContextValue.state,
    isHoveredMapControlIcon: true,
  },
};

describe("isHoveredMapControlIconがfalseでscreenSizeが'sm'ではない場合", () => {
  test("MapControlPanelが非表示になっていること", () => {
    (mockUseMapContext as jest.Mock).mockReturnValue(mockInitContextValue);
    render(<MapControlPanel />);
    expect(screen.queryByRole("region", { name: "マップ操作パネル" })).not.toBeInTheDocument();
  });
});

describe("isHoveredMapControlIconがtrueでscreenSizeが'sm'ではない場合", () => {
  test("MapControlPanelが表示されていること", () => {
    (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
    render(<MapControlPanel />);
    expect(screen.queryByRole("region", { name: "マップ操作パネル" })).toBeInTheDocument();
  });

  test("MapControlPanelからのホバーアウトでisHoveredMapControlIconがfalseに更新されること", async () => {
    const user = userEvent.setup();
    (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
    render(<MapControlPanel />);
    await act(async () => {
      await user.hover(screen.getByRole("region", { name: "マップ操作パネル" }));
      await user.unhover(screen.getByRole("region", { name: "マップ操作パネル" }));
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_IS_HOVERED_MAP_CONTROL_ICON",
      payload: false,
    });
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });

  test("VisibleRadioが表示されていること", () => {
    (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
    render(<MapControlPanel />);
    expect(screen.getByRole("radiogroup", { name: "表示するコンテンツの選択" }));
  });

  test("SelectedRadioが表示されていること", () => {
    (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
    render(<MapControlPanel />);
    expect(screen.getByRole("radiogroup", { name: "検索するコンテンツの選択" }));
  });

  describe("visibleValueが'marker'でselectedValue'workdView'である場合", () => {
    test("DepartureAirportSelectが表示されていること", () => {
      (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
      render(<MapControlPanel />);
      expect(screen.getByRole("combobox", { name: "出発する空港を選択" })).toBeInTheDocument();
    });

    test("テキストボックスが表示されていること", () => {
      (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
      render(<MapControlPanel />);
      expect(screen.getByRole("textbox", { name: "目的地を入力" })).toBeInTheDocument();
    });

    test("DirectionButtonが表示されていること", () => {
      (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
      render(<MapControlPanel />);
      expect(screen.getByRole("button", { name: "経路を表示" })).toBeInTheDocument();
    });
  });

  describe("visibleValueが'image'でselectedValue'video'の場合", () => {
    const mockContextValueImageVideo = {
      ...mockInitContextValue,
      state: {
        ...mockInitContextValue.state,
        visibleValue: "image",
        でselectedValue: "video",
      },
    };

    test("DepartureAirportSelectが非表示であること", () => {
      (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValueImageVideo);
      render(<MapControlPanel />);
      expect(
        screen.queryByRole("combobox", { name: "出発する空港を選択" })
      ).not.toBeInTheDocument();
    });

    test("テキストボックスが非表示であること", () => {
      (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValueImageVideo);
      render(<MapControlPanel />);
      expect(screen.queryByRole("textbox", { name: "目的地を入力" })).not.toBeInTheDocument();
    });

    test("DirectionButtonが非表示であること", () => {
      (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValueImageVideo);
      render(<MapControlPanel />);
      expect(screen.queryByRole("button", { name: "経路を表示" })).not.toBeInTheDocument();
    });
  });
});
