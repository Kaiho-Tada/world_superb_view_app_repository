import { Box, Center, Checkbox, Spinner, Stack } from "@chakra-ui/react";
import useGetCheckBoxInfo from "features/worldView/hooks/useGetCheckBoxInfo";
import { useWorldViewListContext } from "providers/WorldViewListProvider";
import { ChangeEvent, FC, memo } from "react";
import { NestedCheckBoxItem } from "types/nestedCheckBoxItem";
import handleChangeCheckBox from "utils/handleChangeCheckBox";
import handleChangeParentCheckBox from "utils/handleChangeParentCheckBox";

const CategoryCheckBox: FC = memo(() => {
  const { state, dispatch } = useWorldViewListContext();

  const checkBoxItemsDispatch = (newCheckBoxItems: NestedCheckBoxItem[]) => {
    dispatch({ type: "SET_CATEGORY_CHECKBOX_ITEMS", payload: newCheckBoxItems });
  };

  const checkedLabelsDispatch = (newCheckedLabels: string[]) => {
    dispatch({ type: "SET_CHECKED_CATEGORY_LABELS", payload: newCheckedLabels });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeCheckBox<NestedCheckBoxItem[]>({
      e,
      checkBoxItems: state.categoryCheckBoxItems,
      checkBoxItemsDispatch,
      checkedLabelsDispatch,
    });
  };

  const handleChaneParent = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeParentCheckBox({
      e,
      checkBoxItems: state.categoryCheckBoxItems,
      checkBoxItemsDispatch,
      checkedLabelsDispatch,
    });
  };
  const { handleGetCheckBoxInfo } = useGetCheckBoxInfo();
  const checkBoxInfo = [
    handleGetCheckBoxInfo({
      parent: "自然",
      checkBoxItems: state.categoryCheckBoxItems,
    }),
    handleGetCheckBoxInfo({
      parent: "人工",
      checkBoxItems: state.categoryCheckBoxItems,
    }),
  ];

  return state.loadingCategoryCheckBoxItems === true ? (
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
            {state.categoryCheckBoxItems.map((categoryCheckBoxItem: NestedCheckBoxItem) =>
              categoryCheckBoxItem.parentLabel === information.label ? (
                <Checkbox
                  key={categoryCheckBoxItem.label}
                  size="md"
                  colorScheme="teal"
                  isChecked={categoryCheckBoxItem.checked}
                  value={categoryCheckBoxItem.label}
                  onChange={handleChange}
                  isDisabled={state.loadingSearchWorldViews}
                >
                  {categoryCheckBoxItem.label}
                </Checkbox>
              ) : null
            )}
          </Box>
        </Box>
      ))}
    </Stack>
  );
});

export default CategoryCheckBox;
