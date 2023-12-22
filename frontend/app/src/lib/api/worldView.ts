import { SearchWorldViewsProps } from "types/api/searchWorldViews";
import client from "./client";

export const getAllWorldViewsApi = () => client.get("/world_views");

export const searchWorldViewsApi = (props: SearchWorldViewsProps) => {
  const {
    checkedCategoryLabels,
    checkedCountryLabels,
    checkedCharacteristicLabels,
    checkedRiskLevelLabels,
    checkedMonthLabels,
    checkedBmiLabels,
    keyword,
  } = props;

  return client.get("/world_views/search", {
    params: {
      categoryNames: checkedCategoryLabels,
      countryNames: checkedCountryLabels,
      characteristicNames: checkedCharacteristicLabels,
      riskLevels: checkedRiskLevelLabels,
      months: checkedMonthLabels,
      bmiRanges: checkedBmiLabels,
      keyword,
    },
  });
};
