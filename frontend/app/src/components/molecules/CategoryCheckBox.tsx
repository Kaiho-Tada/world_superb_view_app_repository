import { Center, Checkbox, Spinner } from "@chakra-ui/react";
import useCategoryHandleChange from "hooks/api/category/useCategoryHandleChange";
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
  } = useSuperbViewListContext();
  useEffect(() => {
    getAllCategoriesWithCheckBoxData();
  }, []);
  const { handleChangeCategory } = useCategoryHandleChange();

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
            onChange={handleChangeCategory}
            isDisabled={loadingSearchSuperbViews}
          >
            {categoryWithCheckBoxData.label}
          </Checkbox>
        ) : null
      )}
    </>
  );
});

export default CategoryCheckBox;
