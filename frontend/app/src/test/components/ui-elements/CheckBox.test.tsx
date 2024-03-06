import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckBox from "components/ui-elements/CheckBox";
import { act } from "react-dom/test-utils";

const mockCheckItemsDispatch = jest.fn();

test("CheckBoxがレンダリングされていること", () => {
  render(
    <CheckBox
      checkItems={[{ label: "ラベル", checked: false }]}
      loadingGetCheckItems={false}
      loadingSearchModel={false}
      vertical={false}
      checkItemsDispatch={mockCheckItemsDispatch}
    />
  );
  expect(screen.getByRole("checkbox", { name: "ラベル" })).toBeInTheDocument();
});

test("checkItemsのcheckedがtrueの場合、CheckBoxがチェックされていること", () => {
  render(
    <CheckBox
      checkItems={[{ label: "ラベル", checked: true }]}
      loadingGetCheckItems={false}
      loadingSearchModel={false}
      vertical={false}
      checkItemsDispatch={mockCheckItemsDispatch}
    />
  );
  expect(screen.getByRole("checkbox", { name: "ラベル" })).toBeChecked();
});

test("loadingGetCheckItemsがtrueの場合、スピナーが表示されていること", () => {
  render(
    <CheckBox
      checkItems={[{ label: "ラベル", checked: false }]}
      loadingGetCheckItems
      loadingSearchModel={false}
      vertical={false}
      checkItemsDispatch={mockCheckItemsDispatch}
    />
  );
  expect(screen.getByRole("img", { name: "loadingアイコン" })).toBeInTheDocument();
});

test("loadingSearchWorldViewsがtrueの場合、CheckBoxがdisabledになっていること", () => {
  render(
    <CheckBox
      checkItems={[{ label: "ラベル", checked: false }]}
      loadingGetCheckItems={false}
      loadingSearchModel
      vertical={false}
      checkItemsDispatch={mockCheckItemsDispatch}
    />
  );
  expect(screen.getByRole("checkbox", { name: "ラベル" })).toBeDisabled();
});

test("verticalがtrueの場合、CheckBoxが縦並びに配置されていること", () => {
  render(
    <CheckBox
      checkItems={[{ label: "ラベル", checked: false }]}
      loadingGetCheckItems={false}
      loadingSearchModel={false}
      vertical
      checkItemsDispatch={mockCheckItemsDispatch}
    />
  );
  expect(screen.getByTestId("checkboxContainer")).toHaveStyle({
    display: "flex",
    flexDirection: "column",
  });
});

test("checkbox押下でhandleChangeCheckBox関数が実行されること", async () => {
  const spyOnHandleChangeCheckBox = jest.spyOn(
    jest.requireActual("utils/handleChangeCheckBox"),
    "default"
  );

  const user = userEvent.setup();
  render(
    <CheckBox
      checkItems={[{ label: "ラベル", checked: false }]}
      loadingGetCheckItems={false}
      vertical={false}
      checkItemsDispatch={mockCheckItemsDispatch}
      loadingSearchModel={false}
    />
  );
  await act(async () => {
    await user.click(screen.getByRole("checkbox", { name: "ラベル" }));
  });

  expect(spyOnHandleChangeCheckBox).toHaveBeenCalledWith({
    e: expect.objectContaining({ target: expect.objectContaining({ value: "ラベル" }) }),
    checkItems: [{ label: "ラベル", checked: false }],
    checkItemsDispatch: mockCheckItemsDispatch,
  });
});
