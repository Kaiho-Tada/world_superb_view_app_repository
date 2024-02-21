import { useWorldViewListContext } from "providers/WorldViewListProvider";

const useGetCheckedLabels = () => {
  const { state } = useWorldViewListContext();
  const checkBoxItemArray = {
    categoryLabels: state.categoryCheckBoxItems,
    countryLabels: state.countryCheckBoxItems,
    characteristicLabels: state.characteristicCheckItems,
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
  return { checkedLabelObject };
};

export default useGetCheckedLabels;
