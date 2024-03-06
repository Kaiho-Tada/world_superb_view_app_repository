import { Box, Checkbox } from "@chakra-ui/react";
import { ChangeEvent, CSSProperties, FC, memo } from "react";
import CheckItem from "types/checkItem";
import handleChangeCheckBox from "utils/handleChangeCheckBox";
import Loading from "./Loading";

type Props = {
  checkItems: CheckItem[];
  loadingGetCheckItems: boolean;
  loadingSearchModel: boolean;
  vertical: boolean;
  checkItemsDispatch: (newCheckItems: CheckItem[]) => void;
};

const CheckBox: FC<Props> = memo((props) => {
  const { checkItems, loadingGetCheckItems, loadingSearchModel, vertical, checkItemsDispatch } =
    props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeCheckBox({ checkItems, checkItemsDispatch, e });
  };

  const checkboxStyle: CSSProperties | undefined = vertical
    ? { display: "flex", flexDirection: "column" }
    : undefined;

  return loadingGetCheckItems ? (
    <Loading />
  ) : (
    <Box style={checkboxStyle} data-testid="checkboxContainer">
      {checkItems.map((checkItem) => (
        <Checkbox
          key={checkItem.label}
          size="md"
          colorScheme="teal"
          isChecked={checkItem.checked}
          value={checkItem.label}
          onChange={handleChange}
          isDisabled={loadingSearchModel}
        >
          {checkItem.label}
        </Checkbox>
      ))}
    </Box>
  );
});

export default CheckBox;
