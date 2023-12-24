import { Box, Center, Checkbox, Spinner, Stack } from "@chakra-ui/react";
import useCountryHandleChange from "hooks/api/country/useCountryHandleChange";
import useGetCountryCheckBoxInfo from "hooks/country/useGetCountryCheckBoxInfo";
import { useWorldViewListContext } from "hooks/providers/WorldViewListProvider";
import { FC } from "react";
import { CountryCheckBoxItem } from "types/api/country/CountryCheckBoxItem";

const CountryCheckBox: FC = () => {
  const { state } = useWorldViewListContext();
  const { handleChangeCountry } = useCountryHandleChange();
  const { handleChangeState } = useCountryHandleChange();
  const { handleGetCountryCheckBoxInfo } = useGetCountryCheckBoxInfo();
  const checkBoxInfo = [
    handleGetCountryCheckBoxInfo("アジア"),
    handleGetCountryCheckBoxInfo("大洋州"),
    handleGetCountryCheckBoxInfo("北米"),
    handleGetCountryCheckBoxInfo("中南米"),
    handleGetCountryCheckBoxInfo("ヨーロッパ"),
    handleGetCountryCheckBoxInfo("中東"),
    handleGetCountryCheckBoxInfo("アフリカ"),
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
