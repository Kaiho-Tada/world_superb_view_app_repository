import {
  Box,
  CloseButton,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
} from "@chakra-ui/react";
import { FC, memo, ReactNode } from "react";

interface Props {
  onClose: () => void;
  isOpen: boolean;
  children: ReactNode;
}
const FilterDrawer: FC<Props> = memo(({ onClose, isOpen, children }) => (
  <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
    <DrawerOverlay>
      <DrawerContent>
        <DrawerBody color="black">
          <Box>
            <Flex justify="center" w="100%" onClick={onClose} py="1" _hover={{ cursor: "pointer" }}>
              <CloseButton size="md" _hover={{ bg: "white" }} />
            </Flex>
            <Box border="1px solid #00008B" p="2">
              {children}
            </Box>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </DrawerOverlay>
  </Drawer>
));
export default FilterDrawer;
