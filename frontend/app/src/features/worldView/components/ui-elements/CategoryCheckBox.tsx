import { Box, Center, Checkbox, Spinner, Stack } from "@chakra-ui/react";
import useCategoryHandleChange from "features/worldView/hooks/filter/useCategoryHandleChange";
import useGetCheckBoxInfo from "features/worldView/hooks/useGetCheckBoxInfo";
import useHandleChangeCheckBox from "features/worldView/hooks/useHandleChangeCheckBox";
import { CategoryCheckBoxItem } from "features/worldView/types/checkBoxItems/categoryCheckBoxItem";
import { useWorldViewListContext } from "providers/WorldViewListProvider";
import { ChangeEvent, FC, memo } from "react";

const CategoryCheckBox: FC = memo(() => {
  const { state, dispatch } = useWorldViewListContext();
  const { handleChangeCheckBox } = useHandleChangeCheckBox();

  const checkBoxItemsDispatch = (newCheckBoxItems: CategoryCheckBoxItem[]) => {
    dispatch({ type: "SET_CATEGORY_CHECKBOX_ITEMS", payload: newCheckBoxItems });
  };

  const checkedLabelsDispatch = (newCheckedLabels: string[]) => {
    dispatch({ type: "SET_CHECKED_CATEGORY_LABELS", payload: newCheckedLabels });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeCheckBox<CategoryCheckBoxItem[]>({
      e,
      checkBoxItems: state.categoryCheckBoxItems,
      checkBoxItemsDispatch,
      checkedLabelsDispatch,
    });
  };

  const { handleChangeClassification } = useCategoryHandleChange();
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
            onChange={handleChangeClassification}
            colorScheme="teal"
          >
            {information.label}
          </Checkbox>
          <Box pl={6} my={1}>
            {state.categoryCheckBoxItems.map((categoryCheckBoxItem: CategoryCheckBoxItem) =>
              categoryCheckBoxItem.classification === information.label ? (
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
