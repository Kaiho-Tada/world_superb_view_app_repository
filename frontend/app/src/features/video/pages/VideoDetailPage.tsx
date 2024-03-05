import { Box, Flex, Heading, HStack, Img, Text, Wrap, WrapItem } from "@chakra-ui/react";
import defaultImg from "assets/default.png";
import Loading from "components/ui-elements/Loading";
import useGetModel from "hooks/api/useGetModel";
import { useVideoListContext } from "providers/VideoListProvider";
import { MouseEvent, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useVideoApi from "../api/videoApi";
import Video from "../types/Video";

const VideoDetailPage = () => {
  const { state, dispatch } = useVideoListContext();
  const { videos, loadingSearchVideos } = state;
  const params = useParams();
  const videoId = Number(params.id);
  const { handleGetModel } = useGetModel();
  const { searchVideoApi } = useVideoApi();
  const navigate = useNavigate();

  const currentDetailVideo = videos.find((video) => video.id === videoId);
  const movieDispatch = (responseData: Video[]) => {
    dispatch({ type: "SET_VIDEOS", payload: responseData });
  };
  const loadingSearchMovieDispatch = (payload: boolean) => {
    dispatch({ type: "SET_LOADING_SEARCH_VIDEOS", payload });
  };

  useEffect(() => {
    handleGetModel<Video>({
      modelDispatch: movieDispatch,
      loadingSearchModelDispatch: loadingSearchMovieDispatch,
      searchModelApi: searchVideoApi,
    });
  }, []);

  return loadingSearchVideos || !currentDetailVideo ? (
    <Loading />
  ) : (
    <Box bg="#FFF" pb="10">
      <Box
        bgPosition="center"
        bgSize="cover"
        position="relative"
        backgroundImage={`url(${
          `https://image.tmdb.org/t/p/original${currentDetailVideo.posterPath}` || defaultImg
        })`}
        h={{ base: "900px", sm: "860px", md: "600px" }}
      >
        <Flex
          bg="rgba(0, 0, 0, 0.6)"
          position="absolute"
          top="0"
          right="0"
          left="0"
          bottom="0"
          justifyContent="center"
        >
          <HStack
            py="16"
            style={{ width: "80%" }}
            flexDirection={{ base: "column", md: "row" }}
            align="center"
            spacing="8"
          >
            <Box w={{ base: "90%", sm: "80%", md: "260px" }} boxShadow="2xl">
              <Img
                src={`https://image.tmdb.org/t/p/original${currentDetailVideo.posterPath}`}
                alt={`ポスター画像: ${currentDetailVideo.title}`}
                h={{ base: "210px", sm: "280px", md: "450px" }}
                w="100%"
                mb="4"
              />
            </Box>
            <Box flex="2">
              <Box pb={{ base: 2, md: 4, lg: 6 }}>
                <Heading size={{ base: "lg", sm: "xl" }}>
                  {currentDetailVideo.title}
                  <span style={{ color: "gray.600", fontWeight: "normal" }}>
                    ({new Date(currentDetailVideo.releaseDate).getFullYear()})
                  </span>
                </Heading>
              </Box>
              <Box mb={{ base: 6, lg: 10 }}>
                <Text fontSize="lg" fontWeight="bold" pb="2">
                  概要
                </Text>
                <Text fontSize="sm" fontWeight="bold" noOfLines={14}>
                  {currentDetailVideo.overview}
                </Text>
              </Box>
              <HStack
                justifyContent="space-between"
                w={{ base: "80%", sm: "90%", md: "90%" }}
                flexWrap="wrap"
              >
                <Flex align="center" flexDirection="column">
                  <Text fontSize="md" fontWeight="bold">
                    ジャンル
                  </Text>
                  <Text fontSize="sm">
                    {(() => {
                      const genreNames = currentDetailVideo.genres.map((genre) => genre.name);
                      const genreNameResult =
                        genreNames.length > 1 ? genreNames.join(", ") : genreNames[0];
                      return genreNameResult;
                    })()}
                  </Text>
                </Flex>
                <Flex align="center" flexDirection="column">
                  <Text fontSize="md" fontWeight="bold">
                    公開日
                  </Text>
                  <Text fontSize="sm">{currentDetailVideo.releaseDate}</Text>
                </Flex>
                <Flex align="center" flexDirection="column">
                  <Text fontSize="md" fontWeight="bold">
                    ユーザー評価
                  </Text>
                  <Text fontSize="sm">{currentDetailVideo.voteAverage}</Text>
                </Flex>
                <Flex align="center" flexDirection="column">
                  <Text fontSize="md" fontWeight="bold">
                    ポピュラリティ
                  </Text>
                  <Text fontSize="sm">{currentDetailVideo.popularity}</Text>
                </Flex>
              </HStack>
            </Box>
          </HStack>
        </Flex>
      </Box>
      <Box color="#000" my="8" mx="14">
        <Heading size="lg" mb="6">
          この作品の主な舞台となった場所
        </Heading>
        <Wrap role="list" aria-label="絶景一覧">
          {currentDetailVideo.worldViews.map((worldView) => (
            <WrapItem
              role="listitem"
              aria-label={`絶景一覧: ${worldView.name}`}
              key={worldView.id}
              border="1px solid #000"
              boxShadow="2xl"
              display="flex"
              alignItems="stretch"
              justifyItems="stretch"
              w="190px"
              onClick={(e: MouseEvent<HTMLElement>) => {
                e.preventDefault();
                navigate(`/world_views/${worldView.id}`);
              }}
              _hover={{ cursor: "pointer", opacity: "0.8" }}
            >
              <Box mb="2">
                <Img
                  src={worldView.imgUrl ? worldView.imgUrl : defaultImg}
                  alt={`絶景画像: ${worldView.name}`}
                  mb="2"
                  h="230px"
                  w="190px"
                  borderBottom="1px solid #000"
                />
                <Box textAlign="center">
                  <Text fontSize="md" color="#000">
                    {worldView.name}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    {(() => {
                      const countryNames = worldView.countries.map((country) => country.name);
                      const countryNameResult =
                        countryNames.length > 1 ? countryNames.join(", ") : countryNames[0];
                      return countryNameResult;
                    })()}
                  </Text>
                </Box>
              </Box>
            </WrapItem>
          ))}
        </Wrap>
      </Box>
    </Box>
  );
};

export default VideoDetailPage;
