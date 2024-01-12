import { Box, Center, Checkbox, Spinner, Stack } from "@chakra-ui/react";
import useCountryHandleChange from "features/worldView/hooks/filter/useCountryHandleChange";
import useGetCheckBoxInfo from "features/worldView/hooks/useGetCheckBoxInfo";
import { CountryCheckBoxItem } from "features/worldView/types/checkBoxItems/CountryCheckBoxItem";
import { useWorldViewListContext } from "providers/WorldViewListProvider";
import { FC } from "react";

const CountryCheckBox: FC = () => {
  const { state } = useWorldViewListContext();
  const { handleChangeCountry } = useCountryHandleChange();
  const { handleChangeState } = useCountryHandleChange();
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
            onChange={handleChangeState}
            colorScheme="teal"
          >
            {information.label}
          </Checkbox>
          <Box pl={6} my={1}>
            {state.countryCheckBoxItems.map((countryCheckBoxItem: CountryCheckBoxItem) =>
              countryCheckBoxItem.stateName === information.label ? (
                <Checkbox
                  aria-hidden="false"
                  key={countryCheckBoxItem.label}
                  size="md"
                  colorScheme="teal"
                  isChecked={countryCheckBoxItem.checked}
                  value={countryCheckBoxItem.label}
                  onChange={handleChangeCountry}
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
