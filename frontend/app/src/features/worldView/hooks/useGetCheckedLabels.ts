import { useWorldViewListContext } from "providers/WorldViewListProvider";

const useGetCheckedLabels = () => {
  const { state } = useWorldViewListContext();
  const checkBoxItemArray = {
    categoryLabels: state.categoryCheckBoxItems,
    countryLabels: state.countryCheckBoxItems,
    characteristicLabels: state.characteristicCheckItems,
    monthLabels: state.monthCheckBoxItems,
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
