import { useWorldViewListContext } from "providers/WorldViewListProvider";

const useGetCheckedLabels = () => {
  const { state } = useWorldViewListContext();
  const checkItemArray = {
    categoryLabels: state.categoryCheckItems,
    countryLabels: state.countryCheckItems,
    characteristicLabels: state.characteristicCheckItems,
  };
  const checkedLabelObject = Object.fromEntries(
    Object.entries(checkItemArray).map(([key, checkItems]) => [
      key,
      checkItems.filter((item) => item.checked).map((item) => item.label),
    ])
  );
  return { checkedLabelObject };
};

export default useGetCheckedLabels;
