import { Center, Checkbox, Spinner } from "@chakra-ui/react";
import useCategoryCheckBoxHandleChange from "hooks/api/category/useCategoryCheckBoxHandleChange";
import { useSuperbViewListContext } from "hooks/providers/SuperbViewListProvider";
import { FC, memo, useEffect } from "react";
import { CategoryWithCheckBoxData } from "types/api/category/categoryWithCheckBoxData";

type CategoryCheckBoxProps = {
  categoryClassification: string;
};

const CategoryCheckBox: FC<CategoryCheckBoxProps> = memo((props) => {
  const { categoryClassification } = props;
  const {
    loadingSearchSuperbViews,
    categoriesWithCheckBoxData,
    getAllCategoriesWithCheckBoxData,
    loadingCategoriesWithCheckBoxData,
    loadingSuperbViews,
  } = useSuperbViewListContext();
  useEffect(() => {
    getAllCategoriesWithCheckBoxData();
  }, []);

  const { handleChange } = useCategoryCheckBoxHandleChange();

  return loadingCategoriesWithCheckBoxData === true ? (
    <Center h="10vh">
      <Spinner />
    </Center>
  ) : (
    <>
      {categoriesWithCheckBoxData.map((categoryWithCheckBoxData: CategoryWithCheckBoxData) =>
        categoryWithCheckBoxData.classification === categoryClassification ? (
          <Checkbox
            key={categoryWithCheckBoxData.label}
            size="md"
            colorScheme="green"
            isChecked={categoryWithCheckBoxData.checked}
            value={categoryWithCheckBoxData.label}
            onChange={handleChange}
            isDisabled={loadingSuperbViews || loadingSearchSuperbViews}
          >
            {categoryWithCheckBoxData.label}
          </Checkbox>
        ) : null
      )}
    </>
  );
});

export default CategoryCheckBox;
