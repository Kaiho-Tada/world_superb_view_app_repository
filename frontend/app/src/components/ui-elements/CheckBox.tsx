import { Box, Center, Checkbox, Spinner } from "@chakra-ui/react";
import { ChangeEvent, CSSProperties, FC } from "react";
import { CheckBoxItem } from "types/checkBoxItem";
import handleChangeCheckBox from "utils/handleChangeCheckBox";

type Props = {
  checkBoxItems: CheckBoxItem[];
  loadingCheckBoxItems: boolean;
  loadingSearchModel: boolean;
  vertical: boolean;
  checkBoxItemsDispatch: (newCheckBoxItems: CheckBoxItem[]) => void;
};

const CheckBox: FC<Props> = (props) => {
  const {
    checkBoxItems,
    loadingCheckBoxItems,
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

  return loadingCheckBoxItems ? (
    <Center h="10vh">
      <Spinner role="status" aria-label="読み込み中" />
    </Center>
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
};

export default CheckBox;
