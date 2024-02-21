import { Box, Checkbox, Stack } from "@chakra-ui/react";
import { ChangeEvent, FC, memo } from "react";
import { NestedCheckBoxItem } from "types/nestedCheckBoxItem";
import handleChangeCheckBox from "utils/handleChangeCheckBox";
import handleChangeParentCheckBox from "utils/handleChangeParentCheckBox";
import handleGetNestedCheckBoxInfo from "utils/handleGetNestedCheckBoxInfo";
import Loading from "./Loading";

type Props = {
  checkBoxItems: NestedCheckBoxItem[];
  loadingGetCheckBoxItems: boolean;
  loadingSearchModel: boolean;
  checkBoxItemsDispatch: (newCheckBoxItems: NestedCheckBoxItem[]) => void;
};

const NestedCheckBox: FC<Props> = memo((props) => {
  const { checkBoxItems, loadingSearchModel, loadingGetCheckBoxItems, checkBoxItemsDispatch } =
    props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeCheckBox<NestedCheckBoxItem[]>({ e, checkBoxItems, checkBoxItemsDispatch });
  };

  const handleChangeParent = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeParentCheckBox({ e, checkBoxItems, checkBoxItemsDispatch });
  };

  const checkBoxInfo = handleGetNestedCheckBoxInfo({ checkBoxItems });
  return loadingGetCheckBoxItems ? (
    <Loading />
  ) : (
    <Stack spacing={2}>
      {checkBoxInfo.map((information) => (
        <Box key={information.parentLabel}>
          <Checkbox
            isChecked={information.allChecked}
            isIndeterminate={information.isIndeterminate}
            value={information.parentLabel}
            disabled={loadingSearchModel}
            onChange={handleChangeParent}
            colorScheme="teal"
          >
            {information.parentLabel}
          </Checkbox>
          <Box pl={6} my={1}>
            {checkBoxItems.map((checkBoxItem) =>
              checkBoxItem.parentLabel === information.parentLabel ? (
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
              ) : null
            )}
          </Box>
        </Box>
      ))}
    </Stack>
  );
});

export default NestedCheckBox;
