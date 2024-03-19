import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Map from "features/map/components/ui-parts/Map";
import { useMapContext as mockUseMapContext } from "providers/MapProvider";
import { act } from "react-dom/test-utils";

global.ResizeObserver = require("resize-observer-polyfill");

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
  },
};
const mockContextValueWorldView = {
  ...mockContextValue,
  state: {
    ...mockContextValue.state,
    selectedValue: "worldView",
  },
};
const mockContextValueVideo = {
  ...mockContextValue,
  state: {
    ...mockContextValue.state,
    selectedValue: "video",
  },
};
const mockContextValueWorldViewMarker = {
  ...mockContextValue,
  state: {
    ...mockContextValue.state,
    selectedValue: "worldView",
    visibleValue: "marker",
  },
};
const mockContextValueWorldViewImage = {
  ...mockContextValue,
  state: {
    ...mockContextValue.state,
    selectedValue: "worldView",
    visibleValue: "image",
  },
};
const mockContextValueVideoMarker = {
  ...mockContextValue,
  state: {
    ...mockContextValue.state,
    selectedValue: "video",
    visibleValue: "marker",
  },
};
const mockContextValueVideoImage = {
  ...mockContextValue,
  state: {
    ...mockContextValue.state,
    selectedValue: "video",
    visibleValue: "image",
  },
};

test("VisibleRadioが表示されていること", () => {
  (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<Map />);
  expect(screen.getByRole("radiogroup", { name: "表示するコンテンツの選択" }));
});

test("SelectedRadioが表示されていること", () => {
  (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<Map />);
  expect(screen.getByRole("radiogroup", { name: "検索するコンテンツの選択" }));
});

test("MenuButtonが表示されていること", () => {
  (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<Map />);
  expect(screen.getByRole("button", { name: "メニューボタン" })).toBeInTheDocument();
});

test("MenuButtonボタン押下でfilterDrawerが表示されること", async () => {
  const user = userEvent.setup();
  (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValueWorldView);
  render(<Map />);
  await act(async () => {
    await user.click(screen.getByRole("button", { name: "メニューボタン" }));
  });
  expect(screen.getByRole("dialog")).toBeInTheDocument();
});

test("ズームボタンが表示されていること", () => {
  (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<Map />);
  expect(screen.getByRole("button", { name: "Zoom in" }));
});

test("ズームアウトボタンが表示されていること", () => {
  (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<Map />);
  expect(screen.getByRole("button", { name: "Zoom out" }));
});

test("シンプルのradioが表示されていること", () => {
  (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<Map />);
  expect(screen.getByRole("radio", { name: "シンプル" })).toBeInTheDocument();
});

test("シンプルのradio押下でlayerValueが'simple'に更新されること", async () => {
  const user = userEvent.setup();
  (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<Map />);
  await act(async () => {
    await user.click(screen.getByRole("radio", { name: "シンプル" }));
  });
  expect(mockMapDispatch).toHaveBeenCalledWith({ type: "SET_LAYER_VALUE", payload: "simple" });
  expect(mockMapDispatch).toHaveBeenCalledTimes(1);
});

test("詳細のradioが表示されていること", () => {
  (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<Map />);
  expect(screen.getByRole("radio", { name: "詳細" })).toBeInTheDocument();
});

test("詳細のradio押下でlayerValueが'detail'に更新されること", async () => {
  const user = userEvent.setup();
  (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<Map />);
  await act(async () => {
    await user.click(screen.getByRole("radio", { name: "詳細" }));
  });
  expect(mockMapDispatch).toHaveBeenCalledWith({ type: "SET_LAYER_VALUE", payload: "detail" });
  expect(mockMapDispatch).toHaveBeenCalledTimes(1);
});

test("航空写真のradioが表示されていること", () => {
  (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<Map />);
  expect(screen.getByRole("radio", { name: "航空写真" })).toBeInTheDocument();
});

test("航空写真のradio押下でlayerValueが'aerialShot'に更新されること", async () => {
  const user = userEvent.setup();
  (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<Map />);
  await act(async () => {
    await user.click(screen.getByRole("radio", { name: "航空写真" }));
  });
  expect(mockMapDispatch).toHaveBeenCalledWith({ type: "SET_LAYER_VALUE", payload: "aerialShot" });
  expect(mockMapDispatch).toHaveBeenCalledTimes(1);
});

describe("selectedValueが'worldView'の場合", () => {
  test("WorldViewFilterSearchBoxが表示されていること", () => {
    (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValueWorldView);
    render(<Map />);
    expect(screen.getByPlaceholderText("絶景名または国名で絞り込み")).toBeInTheDocument();
  });

  describe("visibleValueが'marker'の場合", () => {
    test("WorldViewMarkerがレコードの数だけ地図上に表示されていること", () => {
      (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValueWorldViewMarker);
      render(<Map />);
      expect(screen.getAllByRole("button", { name: "Marker" }).length).toBe(10);
    });
  });

  describe("visibleValueが'image'の場合", () => {
    test("WorldViewImageOverlaysがレコードの数だけ地図上に表示されていること", () => {
      (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValueWorldViewImage);
      render(<Map />);
      expect(screen.getAllByRole("img").length).toBe(10);
    });
  });
});

describe("selectedValueが'video'の場合", () => {
  test("WorldViewFilterSearchBoxが表示されていること", () => {
    (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValueVideo);
    render(<Map />);
    expect(screen.getByPlaceholderText("作品名で絞り込み")).toBeInTheDocument();
  });

  describe("visibleValueが'marker'の場合", () => {
    test("VideoMarkerがレコードの数だけ地図上に表示されていること", () => {
      (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValueVideoMarker);
      render(<Map />);
      expect(screen.getAllByRole("button", { name: "Marker" }).length).toBe(11);
    });
  });

  describe("visibleValueが'image'の場合", () => {
    test("VideoImageOverlaysがレコードの数だけ地図上に表示されていること", () => {
      (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValueVideoImage);
      render(<Map />);
      expect(screen.getAllByRole("img").length).toBe(11);
    });
  });
});
