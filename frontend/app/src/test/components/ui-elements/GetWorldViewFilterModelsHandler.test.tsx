import { render } from "@testing-library/react";
import GetWorldViewFilterModelsHandler from "components/ui-elements/GetWorldViewFilterModelsHandler";
import mockGetAllCategoriesApi from "features/worldView/api/categoryApi";
import mockGetAllCharacteristicsApi from "features/worldView/api/characteristicApi";
import mockGetAllCountriesApi from "features/worldView/api/countryApi";
import { useWorldViewListContext as mockUseWorldViewListContext } from "providers/WorldViewListProvider";
import { act } from "react-dom/test-utils";

global.ResizeObserver = require("resize-observer-polyfill");

jest.mock("providers/WorldViewListProvider", () => ({
  ...jest.requireActual("providers/WorldViewListProvider"),
  useWorldViewListContext: jest.fn(),
}));

const mockDispatch = jest.fn();
const mockContextValue = {
  dispatch: mockDispatch,
  state: {
    isSkipGetCheckItmes: false,
    isVisitedDetailPage: false,
  },
};

const mockContextValueSkipGetCheckItems = {
  ...mockContextValue,
  state: {
    ...mockContextValue.state,
    isSkipGetCheckItmes: true,
  },
};

const mockContextValueVisitDetailPage = {
  ...mockContextValue,
  state: {
    ...mockContextValue.state,
    isVisitedDetailPage: true,
  },
};

jest.mock("features/worldView/api/categoryApi", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("features/worldView/api/countryApi", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("features/worldView/api/characteristicApi", () => ({
  __esModule: true,
  default: jest.fn(),
}));

test("isSkipGetCheckItmesがtrueの場合、falseに更新され、handleGetCheckItemsとhandleGetNestedCheckItems関数が呼び出されないこと", async () => {
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValueSkipGetCheckItems);

  // handleGetCheckItems関数をモック化
  const spyOnUseGetCheckItems = jest.spyOn(
    jest.requireActual("hooks/api/useGetCheckItems"),
    "default"
  );
  const mockHandleGetCheckItems = jest.fn();
  spyOnUseGetCheckItems.mockReturnValue({
    handleGetCheckItems: mockHandleGetCheckItems,
  });

  // handleGetNestedCheckItems関数をモック化
  const spyOnUseGetNestedCheckItems = jest.spyOn(
    jest.requireActual("hooks/api/useGetNestedCheckItems"),
    "default"
  );
  const mockHandleGetNestedCheckItems = jest.fn();
  spyOnUseGetNestedCheckItems.mockReturnValue({
    handleGetNestedCheckItems: mockHandleGetNestedCheckItems,
  });

  await act(async () => {
    render(<GetWorldViewFilterModelsHandler />);
  });
  expect(mockHandleGetCheckItems).not.toHaveBeenCalled();
  expect(mockHandleGetNestedCheckItems).not.toHaveBeenCalled();
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_IS_SKIP_GET_CHECK_ITEMS",
    payload: false,
  });
  spyOnUseGetCheckItems.mockRestore();
  spyOnUseGetNestedCheckItems.mockRestore();
});

test("isVisitedDetailPageがtrueの場合、falseに更新され、handleGetCheckItemsとhandleGetNestedCheckItems関数が呼び出されないこと", async () => {
  (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValueVisitDetailPage);

  // handleGetCheckItems関数をモック化
  const spyOnUseGetCheckItems = jest.spyOn(
    jest.requireActual("hooks/api/useGetCheckItems"),
    "default"
  );
  const mockHandleGetCheckItems = jest.fn();
  spyOnUseGetCheckItems.mockReturnValue({
    handleGetCheckItems: mockHandleGetCheckItems,
  });

  // handleGetNestedCheckItems関数をモック化
  const spyOnUseGetNestedCheckItems = jest.spyOn(
    jest.requireActual("hooks/api/useGetNestedCheckItems"),
    "default"
  );
  const mockHandleGetNestedCheckItems = jest.fn();
  spyOnUseGetNestedCheckItems.mockReturnValue({
    handleGetNestedCheckItems: mockHandleGetNestedCheckItems,
  });

  await act(async () => {
    render(<GetWorldViewFilterModelsHandler />);
  });
  expect(mockHandleGetCheckItems).not.toHaveBeenCalled();
  expect(mockHandleGetNestedCheckItems).not.toHaveBeenCalled();
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_IS_VISIT_DETAIL_PAGE",
    payload: false,
  });
  spyOnUseGetCheckItems.mockRestore();
  spyOnUseGetNestedCheckItems.mockRestore();
});

describe("handleGetCheckItems関数のテスト", () => {
  test("handleGetCheckItems関数が実行されること", async () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);

    // handleGetCheckItems関数をモック化
    const spyOnUseGetCheckItems = jest.spyOn(
      jest.requireActual("hooks/api/useGetCheckItems"),
      "default"
    );
    const mockHandleGetCheckItems = jest.fn();
    spyOnUseGetCheckItems.mockReturnValue({
      handleGetCheckItems: mockHandleGetCheckItems,
    });

    await act(async () => {
      render(<GetWorldViewFilterModelsHandler />);
    });
    expect(mockHandleGetCheckItems).toHaveBeenCalledWith({
      loadingGetModelDispatch: expect.any(Function),
      checkItemsDispatch: expect.any(Function),
      getModelApi: mockGetAllCharacteristicsApi,
    });
    spyOnUseGetCheckItems.mockRestore();
  });

  test("handleGetCheckItems関数内でloadingGetCharacteristicDispatch関数が呼び出されること", async () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);

    await act(async () => {
      render(<GetWorldViewFilterModelsHandler />);
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_LOADING_GET_CHARACTERISTIC",
      payload: true,
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_LOADING_GET_CHARACTERISTIC",
      payload: false,
    });
  });

  test("handleGetCheckItems関数内でcharacteristicCheckItemsDispatch関数が呼び出されること", async () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
    (mockGetAllCharacteristicsApi as jest.Mock).mockReturnValue({
      data: [{ id: 1, name: "name" }],
    });

    await act(async () => {
      render(<GetWorldViewFilterModelsHandler />);
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_CHARACTERISTIC_CHECK_ITEMS",
      payload: [
        {
          label: "name",
          checked: false,
        },
      ],
    });
  });
});

describe("handleGetNestedCheckItems関数のテスト", () => {
  test("handleGetNestedCheckItems関数が2回実行されること", async () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);

    // handleGetNestedCheckItems関数をモック化
    const spyOnUseGetNestedCheckItems = jest.spyOn(
      jest.requireActual("hooks/api/useGetNestedCheckItems"),
      "default"
    );
    const mockHandleGetNestedCheckItems = jest.fn();
    spyOnUseGetNestedCheckItems.mockReturnValue({
      handleGetNestedCheckItems: mockHandleGetNestedCheckItems,
    });

    await act(async () => {
      render(<GetWorldViewFilterModelsHandler />);
    });
    expect(mockHandleGetNestedCheckItems).toHaveBeenCalledWith({
      loadingGetModelDispatch: expect.any(Function),
      checkItemsDispatch: expect.any(Function),
      getAllModelApi: mockGetAllCategoriesApi,
    });
    expect(mockHandleGetNestedCheckItems).toHaveBeenCalledWith({
      loadingGetModelDispatch: expect.any(Function),
      checkItemsDispatch: expect.any(Function),
      getAllModelApi: mockGetAllCountriesApi,
    });
    expect(mockHandleGetNestedCheckItems).toHaveBeenCalledTimes(2);
    spyOnUseGetNestedCheckItems.mockRestore();
  });

  describe("handleGetNestedCheckItems関数内で呼び出される関数のテスト", () => {
    test("loadingGetCategoryDispatch関数が呼び出されること", async () => {
      (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);

      await act(async () => {
        render(<GetWorldViewFilterModelsHandler />);
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "SET_LOADING_GET_CATEGORY",
        payload: true,
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "SET_LOADING_GET_CATEGORY",
        payload: false,
      });
    });

    test("categoryCheckItemsDispatch関数が呼び出されること", async () => {
      (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
      (mockGetAllCategoriesApi as jest.Mock).mockReturnValue({
        data: [{ id: 1, name: "name", parent: "parentName" }],
      });

      await act(async () => {
        render(<GetWorldViewFilterModelsHandler />);
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "SET_CATEGORY_CHECK_ITEMS",
        payload: [
          {
            label: "name",
            parentLabel: "parentName",
            checked: false,
            isVisible: false,
          },
        ],
      });
    });

    test("loadingGetCountryDispatch関数が呼び出されること", async () => {
      (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);

      await act(async () => {
        render(<GetWorldViewFilterModelsHandler />);
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "SET_LOADING_GET_COUNTRY",
        payload: true,
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "SET_LOADING_GET_COUNTRY",
        payload: false,
      });
    });

    test("countryCheckItemsDispatch関数が呼び出されること", async () => {
      (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
      (mockGetAllCountriesApi as jest.Mock).mockReturnValue({
        data: [{ id: 1, name: "name", parent: "parentName" }],
      });

      await act(async () => {
        render(<GetWorldViewFilterModelsHandler />);
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "SET_COUNTRY_CHECK_ITEMS",
        payload: [
          {
            label: "name",
            parentLabel: "parentName",
            checked: false,
            isVisible: false,
          },
        ],
      });
    });
  });
});
