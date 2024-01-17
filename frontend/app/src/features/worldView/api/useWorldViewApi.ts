import client from "lib/client";
import { useWorldViewListContext } from "providers/WorldViewListProvider";

const useWorldViewApi = () => {
  const { state } = useWorldViewListContext();
  const searchWorldViewApi = () =>
    client.get("/world_views/search", {
      params: {
        categoryNames: state.checkedCategoryLabels,
        countryNames: state.checkedCountryLabels,
        characteristicNames: state.checkedCharacteristicLabels,
        riskLevels: state.checkedRiskLevelLabels,
        months: state.checkedMonthLabels,
        bmiRanges: state.checkedBmiLabels,
        keyword: state.keyword,
        sortCriteria: state.sortCriteria,
      },
    });
  return { searchWorldViewApi };
};
export default useWorldViewApi;
