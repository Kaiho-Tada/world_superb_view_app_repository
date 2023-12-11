import { Center, Checkbox, Spinner } from "@chakra-ui/react";
import useCountryHandleChange from "hooks/api/country/useCountryHandleChange";
import { useSuperbViewListContext } from "hooks/providers/SuperbViewListProvider";
import { FC } from "react";
import { CountryCheckBoxItem } from "types/api/country/CountryCheckBoxItem";

type CountryCheckBoxProps = {
  countryState: string;
};

const CountryCheckBox: FC<CountryCheckBoxProps> = (props) => {
  const { countryState } = props;
  const { loadingSearchSuperbViews, countryCheckBoxItems, loadingCountryCheckBoxItems } =
    useSuperbViewListContext();
  const { handleChangeCountry } = useCountryHandleChange();

  return loadingCountryCheckBoxItems === true ? (
    <Center h="10vh">
      <Spinner role="status" aria-label="読み込み中" />
    </Center>
  ) : (
    <>
      {countryCheckBoxItems.map((countryCheckBoxItem: CountryCheckBoxItem) =>
        countryCheckBoxItem.stateName === countryState ? (
          <Checkbox
            aria-hidden="false"
            key={countryCheckBoxItem.label}
            size="md"
            colorScheme="green"
            isChecked={countryCheckBoxItem.checked}
            value={countryCheckBoxItem.label}
            onChange={handleChangeCountry}
            isDisabled={loadingSearchSuperbViews}
          >
            {countryCheckBoxItem.label}
          </Checkbox>
        ) : null
      )}
    </>
  );
};

export default CountryCheckBox;
