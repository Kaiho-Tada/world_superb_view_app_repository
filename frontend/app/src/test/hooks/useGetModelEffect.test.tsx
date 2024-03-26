import { render } from "@testing-library/react";
import useGetModelEffect from "hooks/useGetModelEffect";
import { FC } from "react";

const mockHandleGetModel = jest.fn();
const mockSetShouldDebounceDispatch = jest.fn();
const mockHandleDebounce = jest.fn();
const mockSetIsSkipGetModelDispatch = jest.fn();

jest.mock("hooks/useDebounce", () => ({
  __esModule: true,
  default: () => ({
    handleDebounce: mockHandleDebounce,
  }),
}));

describe("isSkipGetModelがfalseの場合", () => {
  describe("shouldDebounceがfalseの場合", () => {
    test("handleGetModel関数が一度だけ呼び出されること", () => {
      const TestComponent: FC = () => {
        useGetModelEffect({
          handleGetModel: mockHandleGetModel,
          setShouldDebounceDispatch: undefined,
          setIsSkipGetModelDispatch: undefined,
          isSkipGetModel: false,
          shouldDebounce: false,
          dependencyArray: [],
        });
        return null;
      };
      render(<TestComponent />);
      expect(mockHandleGetModel).toHaveBeenCalledTimes(1);
    });
  });
  describe("shouldDebounceがtrueの場合", () => {
    test("handleDebounce関数が一度だけ呼び出されること", () => {
      const TestComponent: FC = () => {
        useGetModelEffect({
          handleGetModel: mockHandleGetModel,
          setShouldDebounceDispatch: mockSetShouldDebounceDispatch,
          setIsSkipGetModelDispatch: undefined,
          isSkipGetModel: false,
          shouldDebounce: true,
          dependencyArray: [],
        });
        return null;
      };
      render(<TestComponent />);
      expect(mockHandleDebounce).toHaveBeenCalledWith(mockHandleGetModel);
      expect(mockHandleDebounce).toHaveBeenCalledTimes(1);
    });

    test("shouldDebounceがflaseに更新されること", () => {
      const TestComponent: FC = () => {
        useGetModelEffect({
          handleGetModel: mockHandleGetModel,
          setShouldDebounceDispatch: mockSetShouldDebounceDispatch,
          setIsSkipGetModelDispatch: undefined,
          isSkipGetModel: false,
          shouldDebounce: true,
          dependencyArray: [],
        });
        return null;
      };
      render(<TestComponent />);
      expect(mockSetShouldDebounceDispatch).toHaveBeenCalledWith(false);
      expect(mockSetShouldDebounceDispatch).toHaveBeenCalledTimes(1);
    });
  });
});

describe("shouldDebounceがtrueの場合", () => {
  test("isSkipGetModelがflaseに更新されること", () => {
    const TestComponent: FC = () => {
      useGetModelEffect({
        handleGetModel: mockHandleGetModel,
        setShouldDebounceDispatch: undefined,
        setIsSkipGetModelDispatch: mockSetIsSkipGetModelDispatch,
        isSkipGetModel: true,
        shouldDebounce: false,
        dependencyArray: [],
      });
      return null;
    };
    render(<TestComponent />);
    expect(mockSetIsSkipGetModelDispatch).toHaveBeenCalledWith(false);
    expect(mockSetIsSkipGetModelDispatch).toHaveBeenCalledTimes(1);
  });
});
