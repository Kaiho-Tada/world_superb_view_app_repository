import { useSuperbViewListContext } from "hooks/providers/SuperbViewListProvider";
import useMessage from "hooks/useMessage";
import { searchSuperbViewsApi } from "lib/api/superbView";
import { ChangeEvent, useCallback } from "react";

const useCharacteristicCheckBoxHandleChange = () => {
  const {
    setLoadingSearchSuperbViews,
    characteristicsWithCheckBoxData,
    setCharacteristicsWithCheckBoxData,
    setCheckedCharacteristicLabels,
    setSuperbViews,
    checkedCategoryLabels,
    checkedCountryLabels,
    checkedRiskLevelLabels,
  } = useSuperbViewListContext();
  const { showMessage } = useMessage();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newcharacteristicsWithCheckBoxData = characteristicsWithCheckBoxData.map(
        (originalCharacteristicWithCheckBoxData) => {
          const CharacteristicWithCheckBoxData = { ...originalCharacteristicWithCheckBoxData };
          if (CharacteristicWithCheckBoxData.label === e.target.value) {
            CharacteristicWithCheckBoxData.checked = !CharacteristicWithCheckBoxData.checked;
          }
          return CharacteristicWithCheckBoxData;
        }
      );
      setCharacteristicsWithCheckBoxData(newcharacteristicsWithCheckBoxData);

      const checkedcharacteristicsWithCheckBoxData = newcharacteristicsWithCheckBoxData.filter(
        (newCharacteristicWithCheckBoxData) => newCharacteristicWithCheckBoxData.checked === true
      );

      const checkedCharacteristicLabels = checkedcharacteristicsWithCheckBoxData.map(
        (checkedCharacteristicWithCheckBoxData) => checkedCharacteristicWithCheckBoxData.label
      );
      setCheckedCharacteristicLabels(checkedCharacteristicLabels);

      const searchSuperbViews = async () => {
        setLoadingSearchSuperbViews(true);

        try {
          const res = await searchSuperbViewsApi({
            checkedCharacteristicLabels,
            checkedCountryLabels,
            checkedCategoryLabels,
            checkedRiskLevelLabels,
          });
          setSuperbViews(res.data);
        } catch (error) {
          showMessage({ title: "絶景一覧の取得に失敗しました。", status: "error" });
        } finally {
          setLoadingSearchSuperbViews(false);
        }
      };
      searchSuperbViews();
    },
    [characteristicsWithCheckBoxData, checkedCategoryLabels, checkedCountryLabels]
  );
  return { handleChange };
};
export default useCharacteristicCheckBoxHandleChange;
