import { Box, Checkbox } from "@chakra-ui/react";
import { useSuperbViewListContext } from "hooks/providers/SuperbViewListProvider";
import useGetSeasonCheckBoxInfo from "hooks/season/useGetSeasonCheckBoxInfo";
import useSeasonHandleChange from "hooks/season/useSeasonHandleChange";

const SeasonCheckBox = () => {
  const { monthCheckBoxItems, loadingSearchSuperbViews } = useSuperbViewListContext();
  const { handleChangeSeason, handleChangeMonth } = useSeasonHandleChange();
  const { handleGetSeasonCheckBoxInfo } = useGetSeasonCheckBoxInfo();
  const checkBoxInfo = [
    handleGetSeasonCheckBoxInfo("春"),
    handleGetSeasonCheckBoxInfo("夏"),
    handleGetSeasonCheckBoxInfo("秋"),
    handleGetSeasonCheckBoxInfo("冬"),
  ];

  return (
    <>
      {checkBoxInfo.map((information) => (
        <Box key={information.label}>
          <Checkbox
            isChecked={information.allChecked}
            isIndeterminate={information.isIndeterminate}
            value={information.label}
            disabled={loadingSearchSuperbViews}
            onChange={handleChangeSeason}
            colorScheme="teal"
          >
            {information.label}
          </Checkbox>
          <Box pl={6} my={1}>
            {monthCheckBoxItems.map((checkBoxItem) =>
              checkBoxItem.season === information.label ? (
                <Checkbox
                  key={checkBoxItem.label}
                  isChecked={checkBoxItem.checked}
                  value={checkBoxItem.label}
                  disabled={loadingSearchSuperbViews}
                  onChange={handleChangeMonth}
                  colorScheme="teal"
                >
                  {checkBoxItem.label}
                </Checkbox>
              ) : null
            )}
          </Box>
        </Box>
      ))}
    </>
  );
};
export default SeasonCheckBox;
