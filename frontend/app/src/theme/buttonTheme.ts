import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const primaryA = defineStyle({
  color: "white",
  bg: "teal.400",
  width: "60",
  _hover: { opacity: 0.6 },
  shadow: "2xl",
  textShadow: "1px 1px 1px #000000",
});
const primaryB = defineStyle({
  color: "white",
  bg: "cyan.400",
  width: "60",
  _hover: { opacity: 0.6 },
  shadow: "2xl",
  textShadow: "1px 1px #000000",
});
const primaryC = defineStyle({
  color: "white",
  bg: "yellow.300",
  width: "60",
  _hover: { opacity: 0.6 },
  shadow: "2xl",
  textShadow: "1px 1px #000000",
});
const secoundary = {
  color: "white",
  bg: "#808080",
  width: "60",
  _hover: { opacity: 0.6 },
  shadow: "2xl",
  textShadow: "1px 1px 1px #000000",
};
const danger = {
  color: "white",
  bg: "red.600",
  width: "60",
  _hover: { opacity: 0.6 },
  shadow: "2xl",
  textShadow: "1px 1px 1px #000000",
};

const buttonTheme = defineStyleConfig({
  variants: { primaryA, primaryB, primaryC, secoundary, danger },
});

export default buttonTheme;
