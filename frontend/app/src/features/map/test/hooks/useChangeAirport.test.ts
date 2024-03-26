import { renderHook } from "@testing-library/react";
import useChangeAirport from "features/map/hooks/useChangeAirport";
import { ChangeEvent } from "react";
import { act } from "react-dom/test-utils";

const mockDispatch = jest.fn();
jest.mock("providers/MapProvider", () => ({
  useMapContext: () => ({
    dispatch: mockDispatch,
  }),
}));

test("test", () => {
  const { result } = renderHook(() => useChangeAirport());
  act(() => {
    const mockEvent = { target: { value: "羽田空港" } };
    result.current.handleChangeAirport(mockEvent as ChangeEvent<HTMLSelectElement>);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_DEPARTURE_AIRPORT",
      payload: "羽田空港",
    });
  });
});
