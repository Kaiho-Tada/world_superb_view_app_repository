import { Center, Checkbox, Spinner } from "@chakra-ui/react";
import useCategoryHandleChange from "hooks/api/category/useCategoryHandleChange";
import { useSuperbViewListContext } from "hooks/providers/SuperbViewListProvider";
import { FC, memo } from "react";
import { CategoryCheckBoxItem } from "types/api/category/categoryCheckBoxItem";

type CategoryCheckBoxProps = {
  categoryClassification: string;
};

const CategoryCheckBox: FC<CategoryCheckBoxProps> = memo((props) => {
  const { categoryClassification } = props;
  const { loadingSearchSuperbViews, categoryCheckBoxItems, loadingCategoryCheckBoxItems } =
    useSuperbViewListContext();
  const { handleChangeCategory } = useCategoryHandleChange();

  return loadingCategoryCheckBoxItems === true ? (
    <Center h="10vh">
      <Spinner role="status" aria-label="読み込み中" />
    </Center>
  ) : (
    <>
      {categoryCheckBoxItems.map((categoryCheckBoxItem: CategoryCheckBoxItem) =>
        categoryCheckBoxItem.classification === categoryClassification ? (
          <Checkbox
            key={categoryCheckBoxItem.label}
            size="md"
            colorScheme="green"
            isChecked={categoryCheckBoxItem.checked}
            value={categoryCheckBoxItem.label}
            onChange={handleChangeCategory}
            isDisabled={loadingSearchSuperbViews}
          >
            {categoryCheckBoxItem.label}
          </Checkbox>
        ) : null
      )}
    </>
  );
});

export default CategoryCheckBox;
