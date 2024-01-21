import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CategoryCheckBox from "components/ui-elements/NestedCheckBox";
import { act } from "react-dom/test-utils";

const mockCheckBoxItemsDispatch = jest.fn();

test("CheckBoxがレンダリングされていること", () => {
  render(
    <CategoryCheckBox
      checkBoxItems={[
        { label: "ラベル1", parentLabel: "親ラベルA", checked: true },
        { label: "ラベル2", parentLabel: "親ラベルA", checked: true },
        { label: "ラベル3", parentLabel: "親ラベルB", checked: true },
      ]}
      loadinCheckBoxItems={false}
      loadingSearchModel={false}
      checkBoxItemsDispatch={mockCheckBoxItemsDispatch}
    />
  );
  expect(screen.getByRole("checkbox", { name: "親ラベルA" })).toBeInTheDocument();
  expect(screen.getByRole("checkbox", { name: "親ラベルB" })).toBeInTheDocument();
  expect(screen.getByRole("checkbox", { name: "ラベル1" })).toBeInTheDocument();
  expect(screen.getByRole("checkbox", { name: "ラベル2" })).toBeInTheDocument();
  expect(screen.getByRole("checkbox", { name: "ラベル3" })).toBeInTheDocument();
});

test("categoryCheckBoxItemsのcheckedがtrueの場合、CheckBoxがチェックされていること", () => {
  render(
    <CategoryCheckBox
      checkBoxItems={[
        { label: "ラベル1", parentLabel: "親ラベルA", checked: false },
        { label: "ラベル2", parentLabel: "親ラベルA", checked: true },
        { label: "ラベル3", parentLabel: "親ラベルB", checked: true },
      ]}
      loadinCheckBoxItems={false}
      loadingSearchModel={false}
      checkBoxItemsDispatch={mockCheckBoxItemsDispatch}
    />
  );
  expect(screen.getByRole("checkbox", { name: "ラベル1" })).not.toBeChecked();
  expect(screen.getByRole("checkbox", { name: "ラベル2" })).toBeChecked();
  expect(screen.getByRole("checkbox", { name: "ラベル3" })).toBeChecked();
});

test("子のCheckboxが全てチェックされている場合、親のCheckboxがチェックされていること", () => {
  render(
    <CategoryCheckBox
      checkBoxItems={[
        { label: "ラベル1", parentLabel: "親ラベルA", checked: true },
        { label: "ラベル2", parentLabel: "親ラベルA", checked: true },
        { label: "ラベル3", parentLabel: "親ラベルB", checked: true },
      ]}
      loadinCheckBoxItems={false}
      loadingSearchModel={false}
      checkBoxItemsDispatch={mockCheckBoxItemsDispatch}
    />
  );
  expect(screen.getByRole("checkbox", { name: "親ラベルA" })).toBeChecked();
  expect(screen.getByRole("checkbox", { name: "親ラベルB" })).toBeChecked();
});

test("loadingCategoryCheckBoxItemsがtrueの場合、スピナーが表示されていること", () => {
  render(
    <CategoryCheckBox
      checkBoxItems={[{ label: "ラベル1", parentLabel: "親ラベル", checked: true }]}
      loadinCheckBoxItems
      loadingSearchModel={false}
      checkBoxItemsDispatch={mockCheckBoxItemsDispatch}
    />
  );
  expect(screen.getByRole("status", { name: "読み込み中" })).toBeInTheDocument();
});

test("loadingSearchWorldViewsがfalseの場合、CheckBoxが有効になっていること", () => {
  render(
    <CategoryCheckBox
      checkBoxItems={[
        { label: "ラベル1", parentLabel: "親ラベルA", checked: true },
        { label: "ラベル2", parentLabel: "親ラベルA", checked: true },
        { label: "ラベル3", parentLabel: "親ラベルB", checked: true },
      ]}
      loadinCheckBoxItems={false}
      loadingSearchModel={false}
      checkBoxItemsDispatch={mockCheckBoxItemsDispatch}
    />
  );
  expect(screen.getByRole("checkbox", { name: "親ラベルA" })).not.toBeDisabled();
  expect(screen.getByRole("checkbox", { name: "親ラベルB" })).not.toBeDisabled();
  expect(screen.getByRole("checkbox", { name: "ラベル1" })).not.toBeDisabled();
  expect(screen.getByRole("checkbox", { name: "ラベル2" })).not.toBeDisabled();
  expect(screen.getByRole("checkbox", { name: "ラベル3" })).not.toBeDisabled();
});

test("loadingSearchWorldViewsがtrueの場合、CheckBoxがdisabledになっていること", () => {
  render(
    <CategoryCheckBox
      checkBoxItems={[
        { label: "ラベル1", parentLabel: "親ラベルA", checked: true },
        { label: "ラベル2", parentLabel: "親ラベルA", checked: true },
        { label: "ラベル3", parentLabel: "親ラベルB", checked: true },
      ]}
      loadinCheckBoxItems={false}
      loadingSearchModel
      checkBoxItemsDispatch={mockCheckBoxItemsDispatch}
    />
  );
  expect(screen.getByRole("checkbox", { name: "親ラベルA" })).toBeDisabled();
  expect(screen.getByRole("checkbox", { name: "親ラベルB" })).toBeDisabled();
  expect(screen.getByRole("checkbox", { name: "ラベル1" })).toBeDisabled();
  expect(screen.getByRole("checkbox", { name: "ラベル2" })).toBeDisabled();
  expect(screen.getByRole("checkbox", { name: "ラベル3" })).toBeDisabled();
});

test("親のCheckBox押下でhandleChangeParentCheckBox関数が実行されること", async () => {
  const spyOnHandleChangeParentCheckBox = jest.spyOn(
    jest.requireActual("utils/handleChangeParentCheckBox"),
    "default"
  );
  const user = userEvent.setup();
  render(
    <CategoryCheckBox
      checkBoxItems={[{ label: "ラベル1", parentLabel: "親ラベル", checked: true }]}
      loadinCheckBoxItems={false}
      loadingSearchModel={false}
      checkBoxItemsDispatch={mockCheckBoxItemsDispatch}
    />
  );
  await act(async () => {
    await user.click(screen.getByRole("checkbox", { name: "親ラベル" }));
  });
  expect(spyOnHandleChangeParentCheckBox).toHaveBeenCalledWith({
    e: expect.objectContaining({ target: expect.objectContaining({ value: "親ラベル" }) }),
    checkBoxItems: [{ label: "ラベル1", parentLabel: "親ラベル", checked: true }],
    checkBoxItemsDispatch: mockCheckBoxItemsDispatch,
  });
});

test("子のCheckBox押下でhandleChangeCheckBox関数が実行されること", async () => {
  const spyOnHandleChangeCheckBox = jest.spyOn(
    jest.requireActual("utils/handleChangeCheckBox"),
    "default"
  );
  const user = userEvent.setup();
  render(
    <CategoryCheckBox
      checkBoxItems={[{ label: "ラベル1", parentLabel: "親ラベル", checked: true }]}
      loadinCheckBoxItems={false}
      loadingSearchModel={false}
      checkBoxItemsDispatch={mockCheckBoxItemsDispatch}
    />
  );
  await act(async () => {
    await user.click(screen.getByRole("checkbox", { name: "ラベル1" }));
  });
  expect(spyOnHandleChangeCheckBox).toHaveBeenCalledWith({
    e: expect.objectContaining({ target: expect.objectContaining({ value: "ラベル1" }) }),
    checkBoxItems: [{ label: "ラベル1", parentLabel: "親ラベル", checked: true }],
    checkBoxItemsDispatch: mockCheckBoxItemsDispatch,
  });
});
