import { Flex, Image, Select } from "@chakra-ui/react";
import sortIcon from "assets/sortIcon.png";
import useSortChange from "features/video/hooks/useSortChange";
import { useVideoListContext } from "providers/VideoListProvider";

const SelectBoxWithIcon = () => {
  const { handleChangeSort } = useSortChange();
  const { state } = useVideoListContext();

  const { loadingSearchVideos } = state;
  return (
    <Flex
      bg="gray.100"
      color="black"
      align="center"
      _hover={{ cursor: "pointer", opacity: "0.8" }}
      pl="3"
      py="0.3"
    >
      <Image boxSize={{ base: "16px", sm: "19px" }} src={sortIcon} />
      <Select
        border="none"
        textShadow="0.5px 0.5px #00008B"
        fontSize={{ base: "sm", sm: "md" }}
        _focus={{ boxShadow: "none" }}
        size="md"
        _hover={{ cursor: "pointer" }}
        onChange={handleChangeSort}
        aria-label="並び替えのセレクトボックス"
        disabled={loadingSearchVideos}
      >
        <option value="人気が高い順">人気が高い順</option>
        <option value="評価が高い順">評価が高い順</option>
        <option value="公開日が早い順">公開日が早い順</option>
      </Select>
    </Flex>
  );
};

export default SelectBoxWithIcon;
