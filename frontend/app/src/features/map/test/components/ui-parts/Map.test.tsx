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

const mockContextValue = {
  state: {
    visibleValue: "",
  },
};
const mockContextValueWorldView = {
  state: {
    visibleValue: "worldView",
  },
};
const mockContextValueVideo = {
  state: {
    visibleValue: "video",
  },
};

test("MapRadioButtonが表示されていること", () => {
  (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValue);
  render(<Map />);
  expect(screen.getByRole("radiogroup"));
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

describe("visibleValueが'worldView'の場合", () => {
  test("WorldViewFilterSearchBoxが表示されていること", () => {
    (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValueWorldView);
    render(<Map />);
    expect(screen.getByPlaceholderText("絶景名または国名で絞り込み")).toBeInTheDocument();
  });

  test("WorldViewImageOverlaysがレコードの数だけ地図上に表示されていること", () => {
    (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValueWorldView);
    render(<Map />);
    expect(screen.getAllByRole("img").length).toBe(12);
  });
});

describe("visibleValueが'video'の場合", () => {
  test("WorldViewFilterSearchBoxが表示されていること", () => {
    (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValueVideo);
    render(<Map />);
    expect(screen.getByPlaceholderText("作品名で絞り込み")).toBeInTheDocument();
  });

  test("VideoImageOverlaysがレコードの数だけ地図上に表示されていること", () => {
    (mockUseMapContext as jest.Mock).mockReturnValue(mockContextValueVideo);
    render(<Map />);
    expect(screen.getAllByRole("img").length).toBe(13);
  });
});
