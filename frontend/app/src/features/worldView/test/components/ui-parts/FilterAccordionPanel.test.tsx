import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterAccordionPanel from "features/worldView/components/ui-parts/FilterAccordionPanel";
import { useWorldViewListContext as mockUseWorldViewListContext } from "providers/WorldViewListProvider";
import { act } from "react-dom/test-utils";

jest.mock("providers/WorldViewListProvider", () => ({
  useWorldViewListContext: jest.fn(),
}));

const mockDispatch = jest.fn();
const mockContextValue = {
  dispatch: mockDispatch,
  state: {
    categoryCheckBoxItems: [{ label: "滝", parentLabel: "自然", checked: false }],
    countryCheckBoxItems: [{ label: "中国", parentLabel: "アジア", checked: false }],
    characteristicCheckItems: [{ label: "幻想・神秘的", checked: false }],
    riskLevelCheckBoxItems: [{ label: "4", checked: false }],
    monthCheckBoxItems: [{ label: "1月", parentLabel: "冬", checked: false }],
    bmiCheckBoxItems: [{ label: "0%〜10%", checked: false }],
    keyword: "",
    loadingSearchWorldViews: false,
    loadingGetCategory: false,
    loadingGetCountry: false,
    loadingGetCharacteristic: false,
  },
};

const mockContextValueLoadingWorldView = {
  ...mockContextValue,
  state: {
    ...mockContextValue.state,
    loadingSearchWorldViews: true,
  },
};

const mockContextValueLoadingCategory = {
  ...mockContextValue,
  state: {
    ...mockContextValue.state,
    loadingGetCategory: true,
  },
};

const mockContextValueLoadingCountry = {
  ...mockContextValue,
  state: {
    ...mockContextValue.state,
    loadingGetCountry: true,
  },
};

const mockContextValueLoadingCharacteristic = {
  ...mockContextValue,
  state: {
    ...mockContextValue.state,
    loadingGetCharacteristic: true,
  },
};

describe("クリアボタンのテスト", () => {
  describe("Videoモデルのフィルター属性の値が初期値である場合", () => {
    test("クリアボタンが非表示であること", async () => {
      (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
      render(<FilterAccordionPanel />);
      expect(screen.queryByRole("button", { name: "クリア" })).not.toBeInTheDocument();
    });
  });

  describe("Videoモデルのフィルター属性の値が初期値ではない場合", () => {
    const mockContextValueChecked = {
      ...mockContextValue,
      state: {
        ...mockContextValue.state,
        categoryCheckBoxItems: [{ label: "滝", parentLabel: "自然", checked: true }],
      },
    };

    test("クリアボタンがレンダリングされていること", async () => {
      (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValueChecked);
      render(<FilterAccordionPanel />);
      expect(screen.getByRole("button", { name: "クリア" })).toBeInTheDocument();
    });

    test("クリアボタン押下でhandleClear関数が呼び出されること", async () => {
      (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValueChecked);
      const spyOnUseClear = jest.spyOn(
        jest.requireActual("features/worldView/hooks/useClear"),
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

describe("キーワードのテキストボックスのテスト", () => {
  test("textboxがレンダリングされていること", async () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
    render(<FilterAccordionPanel />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("loadingSearchWorldViewsがtrueの場合、textboxが非活性であること", async () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValueLoadingWorldView);
    render(<FilterAccordionPanel />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  test("textboxの入力をトリガーにSET_KEYWORDアクションとSET_SHOULD_DEBOUNCEアクションがディスパッチされること", async () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
    const user = userEvent.setup();
    render(<FilterAccordionPanel />);
    await act(async () => {
      await user.type(screen.getByRole("textbox"), "キ");
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_KEYWORD",
      payload: "キ",
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_SHOULD_DEBOUNCE",
      payload: true,
    });
    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });
});

describe("カテゴリーのCheckBoxのテスト", () => {
  test("CheckBoxがレンダリングされていること", () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
    render(<FilterAccordionPanel />);
    expect(screen.getByRole("checkbox", { name: "自然" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "滝" })).toBeInTheDocument();
  });

  test("loadingGetCategoryがtrueの場合、loadingが表示されていること", () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValueLoadingCategory);
    render(<FilterAccordionPanel />);
    expect(screen.getByRole("img", { name: "loadingアイコン" })).toBeInTheDocument();
  });

  test("loadingSearchWorldViewsがtrueの場合、CheckBoxが非活性であること", () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValueLoadingWorldView);
    render(<FilterAccordionPanel />);
    expect(screen.getByRole("checkbox", { name: "自然" })).toBeDisabled();
    expect(screen.getByRole("checkbox", { name: "滝" })).toBeDisabled();
  });

  test("CheckBoxが押下でcheckItemを更新するdispatch関数が実行されること", async () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
    const user = userEvent.setup();
    render(<FilterAccordionPanel />);
    await act(async () => {
      await user.click(screen.getByRole("checkbox", { name: "滝" }));
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_CATEGORY_CHECKBOX_ITEMS",
      payload: [{ label: "滝", parentLabel: "自然", checked: true }],
    });
  });
});

describe("地域のCheckBoxのテスト", () => {
  test("CheckBoxがレンダリングされていること", () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
    render(<FilterAccordionPanel />);
    expect(screen.getByRole("checkbox", { name: "アジア" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "中国" })).toBeInTheDocument();
  });

  test("loadingGetCountryがtrueの場合、loadingが表示されていること", () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValueLoadingCountry);
    render(<FilterAccordionPanel />);
    expect(screen.getByRole("img", { name: "loadingアイコン" })).toBeInTheDocument();
  });

  test("loadingSearchWorldViewsがtrueの場合、CheckBoxが非活性であること", () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValueLoadingWorldView);
    render(<FilterAccordionPanel />);
    expect(screen.getByRole("checkbox", { name: "アジア" })).toBeDisabled();
    expect(screen.getByRole("checkbox", { name: "中国" })).toBeDisabled();
  });

  test("countryのチェックボックス押下でcountryCheckItemを更新するdispatch関数が実行されること", async () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
    const user = userEvent.setup();
    render(<FilterAccordionPanel />);
    await act(async () => {
      await user.click(screen.getByRole("checkbox", { name: "中国" }));
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_COUNTRY_CHECKBOX_ITEMS",
      payload: [{ label: "中国", parentLabel: "アジア", checked: true }],
    });
  });
});

describe("characteristicのCheckItemBoxのテスト", () => {
  test("CheckItemBoxがレンダリングされていること", () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
    render(<FilterAccordionPanel />);
    expect(screen.getByRole("button", { name: "幻想・神秘的" })).toBeInTheDocument();
  });

  test("loadingGetCharacteristicがtrueの場合、loadingが表示されていること", () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(
      mockContextValueLoadingCharacteristic
    );
    render(<FilterAccordionPanel />);
    expect(screen.getByRole("img", { name: "loadingアイコン" })).toBeInTheDocument();
  });

  test("loadingSearchWorldViewsがtrueの場合、CheckItemBoxが非活性であること", () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValueLoadingWorldView);
    render(<FilterAccordionPanel />);
    expect(screen.getByRole("button", { name: "幻想・神秘的" })).toHaveStyle("opacity: 0.5");
    expect(screen.getByRole("button", { name: "幻想・神秘的" })).toHaveStyle(
      "pointer-events: none"
    );
  });

  test("CheckItemBox押下でcharacteristicCheckItemを更新するdispatch関数が実行されること", async () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
    const user = userEvent.setup();
    render(<FilterAccordionPanel />);
    await act(async () => {
      await user.click(screen.getByRole("button", { name: "幻想・神秘的" }));
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_CHARACTERISTIC_CHECK_ITEMS",
      payload: [{ label: "幻想・神秘的", checked: true }],
    });
  });
});

describe("危険度のCheckBoxのテスト", () => {
  test("CheckBoxがレンダリングされていること", async () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
    render(<FilterAccordionPanel />);
    const riskLevel = screen.getAllByRole("img", { name: "リスクレベル" });
    expect(riskLevel.length).toBe(4);
  });
});

describe("ベストシーズンのCheckBoxがレンダリングされていること", () => {
  test("CheckBoxがレンダリングされていること", async () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
    render(<FilterAccordionPanel />);
    expect(screen.getByRole("checkbox", { name: "冬" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "1月" })).toBeInTheDocument();
  });

  test("loadingSearchWorldViewsがtrueの場合、CheckBoxが非活性であること", () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValueLoadingWorldView);
    render(<FilterAccordionPanel />);
    expect(screen.getByRole("checkbox", { name: "冬" })).toBeDisabled();
    expect(screen.getByRole("checkbox", { name: "1月" })).toBeDisabled();
  });

  test("CheckBox押下でmonthCheckItemを更新するdispatch関数が実行されること", async () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
    const user = userEvent.setup();
    render(<FilterAccordionPanel />);
    await act(async () => {
      await user.click(screen.getByRole("checkbox", { name: "1月" }));
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_MONTH_CHECKBOX_ITEMS",
      payload: [{ label: "1月", parentLabel: "冬", checked: true }],
    });
  });
});

describe("BMIのCheckBoxのテスト", () => {
  test("CheckBoxがレンダリングされていること", async () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
    render(<FilterAccordionPanel />);
    expect(screen.getByRole("checkbox", { name: "0%〜10%" })).toBeInTheDocument();
  });

  test("loadingSearchWorldViewsがtrueの場合、CheckBoxが非活性であること", () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValueLoadingWorldView);
    render(<FilterAccordionPanel />);
    expect(screen.getByRole("checkbox", { name: "0%〜10%" })).toBeDisabled();
  });

  test("CheckBox押下でmonthCheckItemを更新するdispatch関数が実行されること", async () => {
    (mockUseWorldViewListContext as jest.Mock).mockReturnValue(mockContextValue);
    const user = userEvent.setup();
    render(<FilterAccordionPanel />);
    await act(async () => {
      await user.click(screen.getByRole("checkbox", { name: "0%〜10%" }));
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_BMI_CHECKBOX_ITEMS",
      payload: [{ label: "0%〜10%", checked: true }],
    });
  });
});
