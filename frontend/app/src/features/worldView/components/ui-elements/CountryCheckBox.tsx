import { Box, Center, Checkbox, Spinner, Stack } from "@chakra-ui/react";
import useGetCheckBoxInfo from "features/worldView/hooks/useGetCheckBoxInfo";
import { useWorldViewListContext } from "providers/WorldViewListProvider";
import { ChangeEvent, FC } from "react";
import { NestedCheckBoxItem } from "types/nestedCheckBoxItem";
import handleChangeCheckBox from "utils/handleChangeCheckBox";
import handleChangeParentCheckBox from "utils/handleChangeParentCheckBox";

const CountryCheckBox: FC = () => {
  const { state, dispatch } = useWorldViewListContext();
  const checkBoxItems = state.countryCheckBoxItems;

  const checkBoxItemsDispatch = (newCheckBoxItems: NestedCheckBoxItem[]) => {
    dispatch({ type: "SET_COUNTRY_CHECKBOX_ITEMS", payload: newCheckBoxItems });
  };

  const checkedLabelsDispatch = (newCheckedLabels: string[]) => {
    dispatch({ type: "SET_CHECKED_COUNTRY_LABELS", payload: newCheckedLabels });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeCheckBox<NestedCheckBoxItem[]>({
      checkBoxItems,
      checkBoxItemsDispatch,
      e,
      checkedLabelsDispatch,
    });
  };

  const handleChaneParent = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeParentCheckBox({
      e,
      checkBoxItems: state.countryCheckBoxItems,
      checkBoxItemsDispatch,
      checkedLabelsDispatch,
    });
  };
  const { handleGetCheckBoxInfo } = useGetCheckBoxInfo();
  const checkBoxInfo = [
    handleGetCheckBoxInfo({ parent: "アジア", checkBoxItems: state.countryCheckBoxItems }),
    handleGetCheckBoxInfo({ parent: "大洋州", checkBoxItems: state.countryCheckBoxItems }),
    handleGetCheckBoxInfo({ parent: "北米", checkBoxItems: state.countryCheckBoxItems }),
    handleGetCheckBoxInfo({ parent: "中南米", checkBoxItems: state.countryCheckBoxItems }),
    handleGetCheckBoxInfo({ parent: "ヨーロッパ", checkBoxItems: state.countryCheckBoxItems }),
    handleGetCheckBoxInfo({ parent: "中東", checkBoxItems: state.countryCheckBoxItems }),
    handleGetCheckBoxInfo({ parent: "アフリカ", checkBoxItems: state.countryCheckBoxItems }),
  ];

  return state.loadingCountryCheckBoxItems === true ? (
    <Center h="10vh">
      <Spinner role="status" aria-label="読み込み中" />
    </Center>
  ) : (
    <Stack spacing={2}>
      {checkBoxInfo.map((information) => (
        <Box key={information.label}>
          <Checkbox
            isChecked={information.allChecked}
            isIndeterminate={information.isIndeterminate}
            value={information.label}
            disabled={state.loadingSearchWorldViews}
            onChange={handleChaneParent}
            colorScheme="teal"
          >
            {information.label}
          </Checkbox>
          <Box pl={6} my={1}>
            {state.countryCheckBoxItems.map((countryCheckBoxItem: NestedCheckBoxItem) =>
              countryCheckBoxItem.parentLabel === information.label ? (
                <Checkbox
                  aria-hidden="false"
                  key={countryCheckBoxItem.label}
                  size="md"
                  colorScheme="teal"
                  isChecked={countryCheckBoxItem.checked}
                  value={countryCheckBoxItem.label}
                  onChange={handleChange}
                  isDisabled={state.loadingSearchWorldViews}
                >
                  {countryCheckBoxItem.label}
                </Checkbox>
              ) : null
            )}
          </Box>
        </Box>
      ))}
    </Stack>
  );
};

export default CountryCheckBox;
