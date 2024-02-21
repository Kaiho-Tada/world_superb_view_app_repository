import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckBox from "components/ui-elements/CheckBox";
import { act } from "react-dom/test-utils";

const mockCheckBoxItemsDispatch = jest.fn();

test("CheckBoxがレンダリングされていること", () => {
  render(
    <CheckBox
      checkBoxItems={[{ label: "ラベル", checked: false }]}
      loadingGetCheckBoxItems={false}
      loadingSearchModel={false}
      vertical={false}
      checkBoxItemsDispatch={mockCheckBoxItemsDispatch}
    />
  );
  expect(screen.getByRole("checkbox", { name: "ラベル" })).toBeInTheDocument();
});

test("checkBoxItemsのcheckedがtrueの場合、CheckBoxがチェックされていること", () => {
  render(
    <CheckBox
      checkBoxItems={[{ label: "ラベル", checked: true }]}
      loadingGetCheckBoxItems={false}
      loadingSearchModel={false}
      vertical={false}
      checkBoxItemsDispatch={mockCheckBoxItemsDispatch}
    />
  );
  expect(screen.getByRole("checkbox", { name: "ラベル" })).toBeChecked();
});

test("loadingGetCheckBoxItemsがtrueの場合、スピナーが表示されていること", () => {
  render(
    <CheckBox
      checkBoxItems={[{ label: "ラベル", checked: false }]}
      loadingGetCheckBoxItems
      loadingSearchModel={false}
      vertical={false}
      checkBoxItemsDispatch={mockCheckBoxItemsDispatch}
    />
  );
  expect(screen.getByRole("img", { name: "loadingアイコン" })).toBeInTheDocument();
});

test("loadingSearchWorldViewsがtrueの場合、CheckBoxがdisabledになっていること", () => {
  render(
    <CheckBox
      checkBoxItems={[{ label: "ラベル", checked: false }]}
      loadingGetCheckBoxItems={false}
      loadingSearchModel
      vertical={false}
      checkBoxItemsDispatch={mockCheckBoxItemsDispatch}
    />
  );
  expect(screen.getByRole("checkbox", { name: "ラベル" })).toBeDisabled();
});

test("verticalがtrueの場合、CheckBoxが縦並びに配置されていること", () => {
  render(
    <CheckBox
      checkBoxItems={[{ label: "ラベル", checked: false }]}
      loadingGetCheckBoxItems={false}
      loadingSearchModel={false}
      vertical
      checkBoxItemsDispatch={mockCheckBoxItemsDispatch}
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
      checkBoxItems={[{ label: "ラベル", checked: false }]}
      loadingGetCheckBoxItems={false}
      vertical={false}
      checkBoxItemsDispatch={mockCheckBoxItemsDispatch}
      loadingSearchModel={false}
    />
  );
  await act(async () => {
    await user.click(screen.getByRole("checkbox", { name: "ラベル" }));
  });

  expect(spyOnHandleChangeCheckBox).toHaveBeenCalledWith({
    e: expect.objectContaining({ target: expect.objectContaining({ value: "ラベル" }) }),
    checkBoxItems: [{ label: "ラベル", checked: false }],
    checkBoxItemsDispatch: mockCheckBoxItemsDispatch,
  });
});
