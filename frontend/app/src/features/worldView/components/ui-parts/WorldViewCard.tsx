import { Box, Heading, Image, Stack, Text, useDisclosure, WrapItem } from "@chakra-ui/react";
import { Category } from "features/worldView/types/api/category";
import { Country } from "features/worldView/types/api/country";
import { FC, memo, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import GifModal from "../ui-elements/GifModal";

interface Props {
  id: number;
  name: string;
  imgUrl: string;
  countries: Pick<Country, "name">[];
  categories: Pick<Category, "name">[];
  gifUrl: string | null;
  gifSite: string | null;
}

const WorldViewCard: FC<Props> = memo((props) => {
  const { id, name, imgUrl, countries, categories, gifUrl, gifSite } = props;
  const navigate = useNavigate();
  const countryNames = countries.map((country) => country.name);
  const countryNameResult = countryNames.length > 1 ? countryNames.join(" ") : countryNames[0];
  const categoryNames = categories.map((category) => category.name);
  const categoryNameResult = categoryNames.length > 1 ? categoryNames.join(" ") : categoryNames[0];
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <WrapItem
      role="listitem"
      aria-label={`絶景一覧: ${name}`}
      display="flex"
      alignItems="stretch"
      bg="gray.100"
      color="blue.800"
      w={{ base: "155px", sm: "218px" }}
      onClick={(e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        navigate(`/world_views/${id}`);
      }}
      _hover={{ cursor: "pointer", opacity: "0.7" }}
    >
      <Box w="100%">
        <Box position="relative">
          <Image
            src={imgUrl}
            alt="絶景画像"
            h={{ base: "210px", sm: "280px", md: "280px" }}
            w="100%"
            mb="3"
          />
          {gifUrl && gifSite ? (
            <>
              <GifModal
                name={name}
                categoryNameResult={categoryNameResult}
                gifUrl={gifUrl}
                gifSite={gifSite}
                isOpen={isOpen}
                onClose={onClose}
              />
              <Box
                role="button"
                bg="rgba(0, 0, 0, 0.2)"
                position="absolute"
                top="1"
                right="1"
                color="white"
                px="2"
                py="1"
                borderRadius="10"
                fontWeight="bold"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpen();
                }}
                _hover={{ cursor: "pointer", opacity: "0.7" }}
              >
                GIF
              </Box>
            </>
          ) : null}
        </Box>
        <Stack
          textAlign="center"
          pb={{ base: 1, sm: 2 }}
          spacing="0"
          style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
        >
          <Heading fontSize={{ base: "xs", sm: "sm", md: "md" }}>{name}</Heading>
          <Box>
            <Text fontSize={{ base: "xs", sm: "sm", md: "md" }} color="gray.600">
              {countryNameResult}
            </Text>
          </Box>
        </Stack>
      </Box>
    </WrapItem>
  );
});

export default WorldViewCard;
