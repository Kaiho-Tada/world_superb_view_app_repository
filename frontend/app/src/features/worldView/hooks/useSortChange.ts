import { useWorldViewListContext } from "providers/WorldViewListProvider";
import { ChangeEvent } from "react";

const useSortChange = () => {
  const { dispatch } = useWorldViewListContext();

  const handleChangeSort = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    switch (value) {
      case "BMI値が低い順":
        dispatch({ type: "SET_SORT_CRITERIA", payload: "bmi" });
        break;
      case "新しい順":
        dispatch({ type: "SET_SORT_CRITERIA", payload: "latest" });
        break;
      case "いいね順":
        dispatch({ type: "SET_SORT_CRITERIA", payload: "favorite" });
        break;
      case "RISKLEVELが低い順":
        dispatch({ type: "SET_SORT_CRITERIA", payload: "riskLevel" });
        break;
      default:
    }
  };
  return { handleChangeSort };
};

export default useSortChange;
