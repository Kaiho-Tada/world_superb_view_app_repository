import { Box, Checkbox } from "@chakra-ui/react";
import useSeasonHandleChange from "features/worldView/hooks/filter/useSeasonHandleChange";
import useGetCheckBoxInfo from "features/worldView/hooks/useGetCheckBoxInfo";
import { useWorldViewListContext } from "providers/WorldViewListProvider";

const SeasonCheckBox = () => {
  const { state } = useWorldViewListContext();
  const { handleChangeSeason, handleChangeMonth } = useSeasonHandleChange();
  const { handleGetCheckBoxInfo } = useGetCheckBoxInfo();
  const checkBoxInfo = [
    handleGetCheckBoxInfo({ parent: "春", checkBoxItems: state.monthCheckBoxItems }),
    handleGetCheckBoxInfo({ parent: "夏", checkBoxItems: state.monthCheckBoxItems }),
    handleGetCheckBoxInfo({ parent: "秋", checkBoxItems: state.monthCheckBoxItems }),
    handleGetCheckBoxInfo({ parent: "冬", checkBoxItems: state.monthCheckBoxItems }),
  ];

  return (
    <>
      {checkBoxInfo.map((information) => (
        <Box key={information.label}>
          <Checkbox
            isChecked={information.allChecked}
            isIndeterminate={information.isIndeterminate}
            value={information.label}
            disabled={state.loadingSearchWorldViews}
            onChange={handleChangeSeason}
            colorScheme="teal"
          >
            {information.label}
          </Checkbox>
          <Box pl={6} my={1}>
            {state.monthCheckBoxItems.map((checkBoxItem) =>
              checkBoxItem.season === information.label ? (
                <Checkbox
                  key={checkBoxItem.label}
                  isChecked={checkBoxItem.checked}
                  value={checkBoxItem.label}
                  disabled={state.loadingSearchWorldViews}
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
