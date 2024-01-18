import client from "lib/client";
import { useWorldViewListContext } from "providers/WorldViewListProvider";

const useWorldViewApi = () => {
  const { state } = useWorldViewListContext();

  const checkBoxItemArray = {
    categoryLabels: state.categoryCheckBoxItems,
    countryLabels: state.countryCheckBoxItems,
    characteristicLabels: state.characteristicCheckBoxItems,
    riskLevelLabels: state.riskLevelCheckBoxItems,
    monthLabels: state.monthCheckBoxItems,
    bmiLabels: state.bmiCheckBoxItems,
  };
  const checkedLabelObject = Object.fromEntries(
    Object.entries(checkBoxItemArray).map(([key, checkBoxItems]) => [
      key,
      checkBoxItems.filter((item) => item.checked).map((item) => item.label),
    ])
  );

  const searchWorldViewApi = () =>
    client.get("/world_views/search", {
      params: {
        categoryNames: checkedLabelObject.categoryLabels,
        countryNames: checkedLabelObject.countryLabels,
        characteristicNames: checkedLabelObject.characteristicLabels,
        riskLevels: checkedLabelObject.riskLevelLabels,
        months: checkedLabelObject.monthLabels,
        bmiRanges: checkedLabelObject.bmiLabels,
        keyword: state.keyword,
        sortCriteria: state.sortCriteria,
      },
    });
  return { searchWorldViewApi };
};
export default useWorldViewApi;
