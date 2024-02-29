import { Box, Checkbox } from "@chakra-ui/react";
import { ChangeEvent, CSSProperties, FC, memo } from "react";
import { CheckBoxItem } from "types/checkBoxItem";
import handleChangeCheckBox from "utils/handleChangeCheckBox";
import Loading from "./Loading";

type Props = {
  checkBoxItems: CheckBoxItem[];
  loadingGetCheckBoxItems: boolean;
  loadingSearchModel: boolean;
  vertical: boolean;
  checkBoxItemsDispatch: (newCheckBoxItems: CheckBoxItem[]) => void;
};

const CheckBox: FC<Props> = memo((props) => {
  const {
    checkBoxItems,
    loadingGetCheckBoxItems,
    loadingSearchModel,
    vertical,
    checkBoxItemsDispatch,
  } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeCheckBox({ checkBoxItems, checkBoxItemsDispatch, e });
  };

  const checkboxStyle: CSSProperties | undefined = vertical
    ? { display: "flex", flexDirection: "column" }
    : undefined;

  return loadingGetCheckBoxItems ? (
    <Loading />
  ) : (
    <Box style={checkboxStyle} data-testid="checkboxContainer">
      {checkBoxItems.map((checkBoxItem) => (
        <Checkbox
          key={checkBoxItem.label}
          size="md"
          colorScheme="teal"
          isChecked={checkBoxItem.checked}
          value={checkBoxItem.label}
          onChange={handleChange}
          isDisabled={loadingSearchModel}
        >
          {checkBoxItem.label}
        </Checkbox>
      ))}
    </Box>
  );
});

export default CheckBox;
