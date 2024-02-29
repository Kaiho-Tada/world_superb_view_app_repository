import { checkboxAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  checkboxAnatomy.keys
);

const baseStyle = definePartsStyle({
  label: {
    pr: 1,
  },
  control: {
    borderRadius: 0,
    border: "2px",
    borderColor: "#B2B8C0",
  },
});

const checkboxTheme = defineMultiStyleConfig({ baseStyle });
export default checkboxTheme;
