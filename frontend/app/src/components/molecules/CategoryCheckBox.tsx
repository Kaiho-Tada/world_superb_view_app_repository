import { Box, Center, Checkbox, Spinner, Stack } from "@chakra-ui/react";
import useCategoryHandleChange from "hooks/api/category/useCategoryHandleChange";
import useGetCategoryCheckBoxInfo from "hooks/category/useGetCategoryCheckBoxInfo";
import { useWorldViewListContext } from "hooks/providers/WorldViewListProvider";
import { FC, memo } from "react";
import { CategoryCheckBoxItem } from "types/api/category/categoryCheckBoxItem";

const CategoryCheckBox: FC = memo(() => {
  const { loadingSearchWorldViews, categoryCheckBoxItems, loadingCategoryCheckBoxItems } =
    useWorldViewListContext();
  const { handleChangeCategory } = useCategoryHandleChange();
  const { handleChangeClassification } = useCategoryHandleChange();
  const { handleGetCategoryCheckBoxInfo } = useGetCategoryCheckBoxInfo();

  const checkBoxInfo = [
    handleGetCategoryCheckBoxInfo("自然"),
    handleGetCategoryCheckBoxInfo("人工"),
  ];

  return loadingCategoryCheckBoxItems === true ? (
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
            disabled={loadingSearchWorldViews}
            onChange={handleChangeClassification}
            colorScheme="teal"
          >
            {information.label}
          </Checkbox>
          <Box pl={6} my={1}>
            {categoryCheckBoxItems.map((categoryCheckBoxItem: CategoryCheckBoxItem) =>
              categoryCheckBoxItem.classification === information.label ? (
                <Checkbox
                  key={categoryCheckBoxItem.label}
                  size="md"
                  colorScheme="teal"
                  isChecked={categoryCheckBoxItem.checked}
                  value={categoryCheckBoxItem.label}
                  onChange={handleChangeCategory}
                  isDisabled={loadingSearchWorldViews}
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
