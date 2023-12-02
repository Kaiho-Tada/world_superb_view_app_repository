import { Center, Checkbox, Spinner } from "@chakra-ui/react";
import useCountryHandleChange from "hooks/api/country/useCountryHandleChange";
import { useSuperbViewListContext } from "hooks/providers/SuperbViewListProvider";
import { FC, useEffect } from "react";
import { CountryWithCheckBoxData } from "types/api/country/countryWithCheckBoxData";

type CountryCheckBoxProps = {
  countryState: string;
};

const CountryCheckBox: FC<CountryCheckBoxProps> = (props) => {
  const { countryState } = props;
  const {
    loadingSearchSuperbViews,
    countriesWithCheckBoxData,
    getAllCountriesWithCheckBoxData,
    loadingCountriesWithCheckBoxData,
    loadingSuperbViews,
  } = useSuperbViewListContext();

  useEffect(() => {
    getAllCountriesWithCheckBoxData();
  }, []);

  const { handleChangeCountry } = useCountryHandleChange();

  return loadingCountriesWithCheckBoxData === true ? (
    <Center h="10vh">
      <Spinner />
    </Center>
  ) : (
    <>
      {countriesWithCheckBoxData.map((countryWithCheckBoxData: CountryWithCheckBoxData) =>
        countryWithCheckBoxData.stateName === countryState ? (
          <Checkbox
            aria-hidden="false"
            key={countryWithCheckBoxData.label}
            size="md"
            colorScheme="green"
            isChecked={countryWithCheckBoxData.checked}
            value={countryWithCheckBoxData.label}
            onChange={handleChangeCountry}
            isDisabled={loadingSuperbViews || loadingSearchSuperbViews}
          >
            {countryWithCheckBoxData.label}
          </Checkbox>
        ) : null
      )}
    </>
  );
};

export default CountryCheckBox;
