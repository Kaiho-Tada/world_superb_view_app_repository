import client from "lib/client";
import { useWorldViewListContext } from "providers/WorldViewListProvider";
import useGetCheckedLabels from "../hooks/useGetCheckedLabels";

const useWorldViewApi = () => {
  const { state } = useWorldViewListContext();
  const { bmiRange, riskLevel, monthRange } = state;
  const { checkedLabelObject } = useGetCheckedLabels();

  const searchWorldViewApi = () =>
    client.get("/world_views/search", {
      params: {
        categoryNames: checkedLabelObject.categoryLabels,
        countryNames: checkedLabelObject.countryLabels,
        characteristicNames: checkedLabelObject.characteristicLabels,
        riskLevel,
        monthRange,
        bmiRange,
        keyword: state.keyword,
        sortCriteria: state.sortCriteria,
      },
    });
  return { searchWorldViewApi };
};
export default useWorldViewApi;
