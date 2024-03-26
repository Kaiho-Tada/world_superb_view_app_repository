import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DepartureAirportSelect from "features/map/components/ui-elements/DepartureAirportSelect";
import { act } from "react-dom/test-utils";

jest.mock("providers/MapProvider", () => ({
  useMapContext: () => ({
    state: {
      departureAirport: undefined,
    },
  }),
}));

test("selectBoxが表示されていること", () => {
  render(<DepartureAirportSelect />);
  expect(screen.getByRole("combobox", { name: "出発する空港を選択" })).toBeInTheDocument();
});

test("optionが表示されていること", () => {
  render(<DepartureAirportSelect />);
  expect(screen.getByRole("option", { name: "新千歳空港" })).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "羽田空港" })).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "成田国際空港" })).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "中部国際空港" })).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "関西国際空港" })).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "福岡空港" })).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "那覇空港" })).toBeInTheDocument();
});

test("optionの選択でhandleChangeAirport関数が呼び出されること", async () => {
  const spyOnUseChangeAirport = jest.spyOn(
    jest.requireActual("features/map/hooks/useChangeAirport"),
    "default"
  );
  const mockHandleChangeAirport = jest.fn();
  spyOnUseChangeAirport.mockReturnValue({
    handleChangeAirport: mockHandleChangeAirport,
  });

  const user = userEvent.setup();
  render(<DepartureAirportSelect />);
  await act(async () => {
    await user.selectOptions(
      screen.getByRole("combobox", { name: "出発する空港を選択" }),
      "羽田空港"
    );
  });
  expect(mockHandleChangeAirport).toHaveBeenCalledTimes(1);
});
