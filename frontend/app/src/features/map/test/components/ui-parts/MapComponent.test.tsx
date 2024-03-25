import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MapComponent from "features/map/components/ui-parts/MapComponent";
import { useMapContext as mockUseMapContext } from "providers/MapProvider";
import { act } from "react-dom/test-utils";

global.ResizeObserver = require("resize-observer-polyfill");

jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useBreakpointValue: () => "sm",
}));

// filterDrawerのOpen時に呼びだされるapiclient関数をモック化
jest.mock("lib/client", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockWorldViews = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  imgUrl: "画像URL",
  countries: [{ id: index + 1, name: `country${index + 1}`, riskLevel: 1, bmi: 1 }],
  latitude: 0,
  longitude: 0,
}));
const mockDispatch = jest.fn();
jest.mock("providers/WorldViewListProvider", () => ({
  ...jest.requireActual("providers/WorldViewListProvider"),
  useWorldViewListContext: () => ({
    dispatch: mockDispatch,
    state: {
      worldViews: mockWorldViews,
      categoryCheckItems: [],
      countryCheckItems: [],
      characteristicCheckItems: [],
      monthRange: [1, 12],
      bmiRange: [-40, 30],
      isSkipGetCheckItmes: false,
      isVisitedDetailPage: false,
    },
  }),
}));

const mockVideos = Array.from({ length: 11 }, (_, index) => {
  const id = index + 1;
  return {
    id,
    posterPath: `posterPath${id}`,
    worldViews: [
      {
        id: 1,
        latitude: 0,
        longitude: 0,
      },
    ],
    genres: [{ id, name: `genre${id}` }],
  };
});
jest.mock("providers/VideoListProvider", () => ({
  ...jest.requireActual("providers/VideoListProvider"),
  useVideoListContext: () => ({
    dispatch: mockDispatch,
    state: {
      videos: mockVideos,
      genreCheckItems: [
        { label: "ラベルA", checked: false },
        { label: "ラベルB", checked: false },
      ],
      keyword: "",
      voteAverageRange: [0, 10],
      isSkipGetCheckItems: false,
      isVisitedDetailPage: false,
    },
  }),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useParams: jest.fn(),
}));

jest.mock("providers/MapProvider", () => ({
  useMapContext: jest.fn(),
}));

const mockMapDispatch = jest.fn();
const mockContextValue = {
  dispatch: mockMapDispatch,
  state: {
    visibleValue: "",
    selectedValue: "",
    layerValue: "",
    mapCenter: [30, 0],
    zoom: 2,
    destinationLatlong: [0, 0],
    isDirectionMap: false,
  },
};

describe("isDirectionMapがfalseの場合", () => {
  test("マップ操作アイコンが表示されていること", () => {
    (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
    render(<MapComponent />);
    expect(screen.getByRole("img", { name: "マップ操作アイコン" })).toBeInTheDocument();
  });

  test("マップ操作パネルが表示されていること", () => {
    (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
    render(<MapComponent />);
    expect(screen.getByRole("region", { name: "マップ操作パネル" })).toBeInTheDocument();
  });

  test("マップ操作パネルが表示されていること", () => {
    (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
    render(<MapComponent />);
    expect(screen.getByRole("region", { name: "マップ操作パネル" })).toBeInTheDocument();
  });

  test("MenuButtonが表示されていること", () => {
    (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
    render(<MapComponent />);
    expect(screen.getByRole("button", { name: "メニューボタン" })).toBeInTheDocument();
  });

  test("MenuButtonボタン押下でfilterDrawerが表示されること", async () => {
    const user = userEvent.setup();
    (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
    render(<MapComponent />);
    await act(async () => {
      await user.click(screen.getByRole("button", { name: "メニューボタン" }));
    });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  test("ズームボタンが表示されていること", () => {
    (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
    render(<MapComponent />);
    expect(screen.getByRole("button", { name: "Zoom in" }));
  });

  test("ズームアウトボタンが表示されていること", () => {
    (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
    render(<MapComponent />);
    expect(screen.getByRole("button", { name: "Zoom out" }));
  });

  test("シンプルのradioが表示されていること", () => {
    (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
    render(<MapComponent />);
    expect(screen.getByRole("radio", { name: "シンプル" })).toBeInTheDocument();
  });

  test("シンプルのradio押下でlayerValueが'simple'に更新されること", async () => {
    const user = userEvent.setup();
    (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
    render(<MapComponent />);
    await act(async () => {
      await user.click(screen.getByRole("radio", { name: "シンプル" }));
    });
    expect(mockMapDispatch).toHaveBeenCalledWith({ type: "SET_LAYER_VALUE", payload: "simple" });
  });

  test("詳細のradioが表示されていること", () => {
    (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
    render(<MapComponent />);
    expect(screen.getByRole("radio", { name: "詳細" })).toBeInTheDocument();
  });

  test("詳細のradio押下でlayerValueが'detail'に更新されること", async () => {
    const user = userEvent.setup();
    (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
    render(<MapComponent />);
    await act(async () => {
      await user.click(screen.getByRole("radio", { name: "詳細" }));
    });
    expect(mockMapDispatch).toHaveBeenCalledWith({ type: "SET_LAYER_VALUE", payload: "detail" });
  });

  test("衛星写真のradioが表示されていること", () => {
    (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
    render(<MapComponent />);
    expect(screen.getByRole("radio", { name: "衛星写真" })).toBeInTheDocument();
  });

  test("衛星写真のradio押下でlayerValueが'satellite'に更新されること", async () => {
    const user = userEvent.setup();
    (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
    render(<MapComponent />);
    await act(async () => {
      await user.click(screen.getByRole("radio", { name: "衛星写真" }));
    });
    expect(mockMapDispatch).toHaveBeenCalledWith({ type: "SET_LAYER_VALUE", payload: "satellite" });
  });

  describe("selectedValueが'worldView'の場合", () => {
    test("WorldViewFilterSearchBoxが表示されていること", () => {
      const mockContextValueWorldView = {
        ...mockContextValue,
        state: {
          ...mockContextValue.state,
          selectedValue: "worldView",
        },
      };
      (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValueWorldView);
      render(<MapComponent />);
      expect(screen.getByPlaceholderText("絶景名または国名で絞り込み")).toBeInTheDocument();
    });

    describe("visibleValueが'marker'の場合", () => {
      test("WorldViewMarkerがレコードの数だけ地図上に表示されていること", () => {
        const mockContextValueWorldViewMarker = {
          ...mockContextValue,
          state: {
            ...mockContextValue.state,
            selectedValue: "worldView",
            visibleValue: "marker",
          },
        };
        (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValueWorldViewMarker);
        render(<MapComponent />);
        expect(screen.getAllByRole("button", { name: "Marker" }).length).toBe(10);
      });
    });

    describe("visibleValueが'image'の場合", () => {
      test("WorldViewImageOverlaysがレコードの数だけ地図上に表示されていること", () => {
        const mockContextValueWorldViewImage = {
          ...mockContextValue,
          state: {
            ...mockContextValue.state,
            selectedValue: "worldView",
            visibleValue: "image",
          },
        };
        (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValueWorldViewImage);
        render(<MapComponent />);
        expect(screen.getAllByRole("img").length).toBe(11);
      });
    });
  });

  describe("selectedValueが'video'の場合", () => {
    test("WorldViewFilterSearchBoxが表示されていること", () => {
      const mockContextValueVideo = {
        ...mockContextValue,
        state: {
          ...mockContextValue.state,
          selectedValue: "video",
        },
      };
      (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValueVideo);
      render(<MapComponent />);
      expect(screen.getByPlaceholderText("作品名で絞り込み")).toBeInTheDocument();
    });

    describe("visibleValueが'marker'の場合", () => {
      test("VideoMarkerがレコードの数だけ地図上に表示されていること", () => {
        const mockContextValueVideoMarker = {
          ...mockContextValue,
          state: {
            ...mockContextValue.state,
            selectedValue: "video",
            visibleValue: "marker",
          },
        };
        (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValueVideoMarker);
        render(<MapComponent />);
        expect(screen.getAllByRole("button", { name: "Marker" }).length).toBe(11);
      });
    });

    describe("visibleValueが'image'の場合", () => {
      test("VideoImageOverlaysがレコードの数だけ地図上に表示されていること", () => {
        const mockContextValueVideoImage = {
          ...mockContextValue,
          state: {
            ...mockContextValue.state,
            selectedValue: "video",
            visibleValue: "image",
          },
        };
        (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValueVideoImage);
        render(<MapComponent />);
        expect(screen.getAllByRole("img").length).toBe(12);
      });
    });
  });
});

describe("isDirectionMapがtrueの場合", () => {
  const mockContextValueIsDirectionMap = {
    ...mockContextValue,
    state: {
      ...mockContextValue.state,
      isDirectionMap: true,
    },
  };
  test("ReturnMapButtonが表示されていること", () => {
    (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValueIsDirectionMap);
    render(<MapComponent />);
    expect(screen.getByRole("button", { name: "マップに戻る" })).toBeInTheDocument();
  });
});

describe("useEfectのテスト", () => {
  test("初回レンダリング時にclickedWorldView,destination,destinationLatlongが初期値に更新されること", async () => {
    (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
    await act(async () => {
      render(<MapComponent />);
    });
    expect(mockMapDispatch).toHaveBeenCalledWith({
      type: "SET_CLICKED_WORLD_VIEW",
      payload: null,
    });
    expect(mockMapDispatch).toHaveBeenCalledWith({
      type: "SET_CLICKED_WORLD_VIEW",
      payload: null,
    });
    expect(mockMapDispatch).toHaveBeenCalledWith({
      type: "SET_DESTINATION_LATLONG",
      payload: [],
    });
  });

  test("visibleValue更新時にclickedWorldView,destination,destinationLatlongが初期値に更新されること", async () => {
    (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
    const user = userEvent.setup();
    render(<MapComponent />);
    await act(async () => {
      await user.click(screen.getByRole("radio", { name: "マーカーを表示" }));
    });
    expect(mockMapDispatch).toHaveBeenCalledWith({
      type: "SET_CLICKED_WORLD_VIEW",
      payload: null,
    });
    expect(mockMapDispatch).toHaveBeenCalledWith({
      type: "SET_CLICKED_WORLD_VIEW",
      payload: null,
    });
    expect(mockMapDispatch).toHaveBeenCalledWith({
      type: "SET_DESTINATION_LATLONG",
      payload: [],
    });
  });

  test("selectedValue更新時にclickedWorldView,destination,destinationLatlongが初期値に更新されること", async () => {
    (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
    const user = userEvent.setup();
    render(<MapComponent />);
    await act(async () => {
      await user.click(screen.getByRole("radio", { name: "世界の舞台を探す" }));
    });
    expect(mockMapDispatch).toHaveBeenCalledWith({
      type: "SET_CLICKED_WORLD_VIEW",
      payload: null,
    });
    expect(mockMapDispatch).toHaveBeenCalledWith({
      type: "SET_CLICKED_WORLD_VIEW",
      payload: null,
    });
    expect(mockMapDispatch).toHaveBeenCalledWith({
      type: "SET_DESTINATION_LATLONG",
      payload: [],
    });
  });
});
