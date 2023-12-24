import { useWorldViewListContext } from "hooks/providers/WorldViewListProvider";
import client from "./client";

const worldViewApi = () => {
  const { state } = useWorldViewListContext();
  const getAllWorldViewsApi = () => client.get("/world_views");
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
      },
    });
  return { searchWorldViewApi, getAllWorldViewsApi };
};
export default worldViewApi;
