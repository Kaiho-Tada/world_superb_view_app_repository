import { Box, Center, Checkbox, Spinner, Stack } from "@chakra-ui/react";
import useGetCheckBoxInfo from "features/worldView/hooks/useGetCheckBoxInfo";
import { ChangeEvent, FC, memo } from "react";
import { NestedCheckBoxItem } from "types/nestedCheckBoxItem";
import handleChangeCheckBox from "utils/handleChangeCheckBox";
import handleChangeParentCheckBox from "utils/handleChangeParentCheckBox";

type Props = {
  checkBoxItems: NestedCheckBoxItem[];
  loadinCheckBoxItems: boolean;
  loadingSearchWorldViews: boolean;
  checkBoxItemsDispatch: (newCheckBoxItems: NestedCheckBoxItem[]) => void;
  checkedLabelsDispatch: (newCheckedLabels: string[]) => void;
};

const NestedCheckBox: FC<Props> = memo((props) => {
  const {
    checkBoxItems,
    loadingSearchWorldViews,
    loadinCheckBoxItems,
    checkBoxItemsDispatch,
    checkedLabelsDispatch,
  } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeCheckBox<NestedCheckBoxItem[]>({
      e,
      checkBoxItems,
      checkBoxItemsDispatch,
      checkedLabelsDispatch,
    });
  };

  const handleChangeParent = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeParentCheckBox({
      e,
      checkBoxItems,
      checkBoxItemsDispatch,
      checkedLabelsDispatch,
    });
  };
  const { handleGetCheckBoxInfo } = useGetCheckBoxInfo();

  const parentLabels = checkBoxItems.map((checkBoxItem) => checkBoxItem.parentLabel);
  const uniqueParentLabels = [...new Set(parentLabels)];
  const checkBoxInfo = uniqueParentLabels.map((parentLabel) =>
    handleGetCheckBoxInfo({
      parentLabel,
      checkBoxItems: checkBoxItems.filter(
        (checkBoxItem) => checkBoxItem.parentLabel === parentLabel
      ),
    })
  );

  return loadinCheckBoxItems ? (
    <Center h="10vh">
      <Spinner role="status" aria-label="読み込み中" />
    </Center>
  ) : (
    <Stack spacing={2}>
      {checkBoxInfo.map((information) => (
        <Box key={information.parentLabel}>
          <Checkbox
            isChecked={information.allChecked}
            isIndeterminate={information.isIndeterminate}
            value={information.parentLabel}
            disabled={loadingSearchWorldViews}
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
                  isDisabled={loadingSearchWorldViews}
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
