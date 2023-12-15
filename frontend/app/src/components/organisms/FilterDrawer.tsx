import { Drawer, DrawerBody, DrawerContent, DrawerOverlay } from "@chakra-ui/react";
import FilterDrawerAccordion from "components/organisms/FilterDrawerAccordion";
import { useWorldViewListContext } from "hooks/providers/WorldViewListProvider";
import { FC, memo } from "react";

const FilterDrawer: FC = memo(() => {
  const { onCloseFilterDrawer, isOpenFilterDrawer } = useWorldViewListContext();

  return (
    <Drawer placement="right" onClose={onCloseFilterDrawer} isOpen={isOpenFilterDrawer}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody py={3} bg="blue.800">
            <FilterDrawerAccordion />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
});
export default FilterDrawer;
