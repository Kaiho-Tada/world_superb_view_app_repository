import { Box, Flex, Heading, HStack, Image, Img, Text, Wrap, WrapItem } from "@chakra-ui/react";
import defaultImg from "assets/default.png";
import FavoriteIcon from "components/ui-elements/FavoriteIcon";
import Loading from "components/ui-elements/Loading";
import useGetModel from "hooks/api/useGetModel";
import { useWorldViewListContext } from "providers/WorldViewListProvider";
import { MouseEvent, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useWorldViewApi from "../api/useWorldViewApi";
import { createFavoriteApi, deleteFavoriteApi } from "../api/worldViewFavoriteApi";
import RiskLevelStar from "../components/ui-elements/RiskLevelStar";
import { WorldView } from "../types/api/worldView";

const WorldViewDetailPage = () => {
  const { state, dispatch } = useWorldViewListContext();
  const params = useParams();
  const worldViewId = Number(params.id);
  const { worldViews, loadingSearchWorldViews } = state;
  const { handleGetModel } = useGetModel();
  const { searchWorldViewApi } = useWorldViewApi();
  const navigate = useNavigate();

  const currentDetailView = worldViews.find((worldView) => worldView.id === worldViewId);

  const loadingSearchWorldViewDispatch = (payload: boolean) => {
    dispatch({ type: "SET_LOADING_GET_WORLDVIEWS", payload });
  };
  const worldViewDispatch = (responseData: WorldView[]) => {
    dispatch({ type: "SET_WORLD_VIEWS", payload: responseData });
  };
  const handleGetWorldView = () => {
    handleGetModel<WorldView>({
      loadingSearchModelDispatch: loadingSearchWorldViewDispatch,
      modelDispatch: worldViewDispatch,
      searchModelApi: searchWorldViewApi,
    });
  };
  useEffect(() => {
    handleGetWorldView();
    dispatch({ type: "SET_IS_SKIP_GET_CHECK_ITEMS_API", payload: true });
    dispatch({ type: "SET_IS_SKIP_SEARCH_API", payload: true });
  }, []);

  return loadingSearchWorldViews || !currentDetailView ? (
    <Loading />
  ) : (
    <Box bg="#FFF" pb="10">
      <Box
        bgPosition="center"
        bgSize="cover"
        position="relative"
        backgroundImage={`url(${currentDetailView.imgUrl || defaultImg})`}
        h={{ base: "900px", sm: "840px", md: "600px" }}
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
            style={{ width: "90%" }}
            flexDirection={{ base: "column", md: "row" }}
            align="center"
            spacing="6"
          >
            <Box
              w={{ base: "90%", sm: "80%", md: "330px" }}
              h={{ base: "300px", md: "400px" }}
              position="relative"
              boxShadow="2xl"
            >
              <Image
                h="100%"
                w="100%"
                src={currentDetailView.imgUrl || defaultImg}
                alt={`絶景画像: ${currentDetailView.name}`}
              />
              <Box position="absolute" top="4" right="4">
                <FavoriteIcon
                  selectedId={currentDetailView.id}
                  favorites={currentDetailView.worldViewFavorites}
                  deleteFavoriteApi={deleteFavoriteApi}
                  createFavoriteApi={createFavoriteApi}
                  handleGetModel={handleGetWorldView}
                />
              </Box>
            </Box>
            <Box flex="2">
              <Heading size={{ base: "lg", sm: "xl" }} pb={{ base: 2, md: 4, lg: 6 }}>
                {currentDetailView.name}
              </Heading>
              <Box mb={{ base: 6, lg: 10 }}>
                <Text fontSize="lg" fontWeight="bold" pb="2">
                  概要
                </Text>
                <Text fontSize="sm" fontWeight="bold" noOfLines={14}>
                  ナイアガラの滝は、北アメリカ大陸に位置する世界でも有数の大瀑布です。ナイアガラ川がカナダとアメリカの国境を流れる地点に位置し、その美しさと迫力で多くの観光客を魅了しています。三つの滝から成り立っており、そのうち最も有名なのはホースシューフォールと呼ばれるカナダ側の滝です。ナイアガラの滝は、年間を通じて観光客を楽しませるだけでなく、周辺地域にも恩恵をもたらしています。周囲には観光施設やアクティビティが豊富にあり、訪れる人々に多彩な体験を提供しています。ただし、その壮大な景観や迫力に魅了される一方で、滝の近くには安全に気をつける必要があります。ナイアガラの滝は、自然の力と美しさを同時に感じられる場所として、世界中から多くの人々を魅了し続けています。
                </Text>
              </Box>
              <HStack spacing={{ base: "2", sm: "4", md: "4", lg: "6", xl: "12" }} flexWrap="wrap">
                <Flex align="center" flexDirection="column">
                  <Text fontSize="md" fontWeight="bold">
                    国
                  </Text>
                  <Text fontSize="sm">
                    {(() => {
                      const countryNames = currentDetailView.countries.map(
                        (country) => country.name
                      );
                      const countryNameResult =
                        countryNames.length > 1 ? countryNames.join(", ") : countryNames[0];
                      return countryNameResult;
                    })()}
                  </Text>
                </Flex>
                <Flex align="center" flexDirection="column">
                  <Text fontSize="md" fontWeight="bold">
                    カテゴリー
                  </Text>
                  <Text fontSize="sm">
                    {(() => {
                      const categoryNames = currentDetailView.categories.map(
                        (category) => category.name
                      );
                      const categoryNameResult =
                        categoryNames.length > 1 ? categoryNames.join(", ") : categoryNames[0];
                      return categoryNameResult;
                    })()}
                  </Text>
                </Flex>
                {(() => {
                  const characteristicNames = currentDetailView.characteristics.map(
                    (characteristic) => characteristic.name
                  );
                  const characteristicNameResult =
                    characteristicNames.length > 1
                      ? characteristicNames.join(" ")
                      : characteristicNames[0];
                  return characteristicNameResult ? (
                    <Flex align="center" flexDirection="column">
                      <Text fontSize="md" fontWeight="bold">
                        ジャンル
                      </Text>
                      <Text fontSize="sm">{characteristicNameResult}</Text>
                    </Flex>
                  ) : null;
                })()}
                <Flex align="center" flexDirection="column">
                  <Text fontSize="md" fontWeight="bold">
                    ベストシーズン
                  </Text>
                  <Text fontSize="sm">{currentDetailView.bestSeason}</Text>
                </Flex>
                <Flex align="center" flexDirection="column">
                  <Text fontSize="md" fontWeight="bold">
                    BMI
                  </Text>
                  <Text fontSize="sm">
                    {(() => {
                      const countryBmi = currentDetailView.countries.map((country) => country.bmi);
                      const countryBmiResult =
                        countryBmi.length > 1 ? countryBmi.join(", ") : countryBmi[0];
                      return countryBmiResult;
                    })()}
                  </Text>
                </Flex>
                <Flex align="center" flexDirection="column">
                  <Text fontSize="md" fontWeight="bold">
                    リスクレベル
                  </Text>
                  {(() => {
                    const riskLevels = currentDetailView.countries.map(
                      (country) => country.riskLevel
                    );
                    const maxRiskLevel = Math.max(...riskLevels);
                    return <RiskLevelStar maxRiskLevel={maxRiskLevel} />;
                  })()}
                </Flex>
              </HStack>
            </Box>
          </HStack>
        </Flex>
      </Box>
      <Box color="#000" my="8" mx="14">
        <Heading size="lg" mb="6">
          この場所が主な舞台となった作品
        </Heading>
        <Wrap role="list" aria-label="ビデオ一覧">
          {currentDetailView.videos.map((video) => (
            <WrapItem
              key={video.id}
              border="1px solid #000"
              boxShadow="2xl"
              role="listitem"
              aria-label={`ビデオ一覧: ${video.title}`}
              display="flex"
              alignItems="stretch"
              justifyItems="stretch"
              w="190px"
              onClick={(e: MouseEvent<HTMLElement>) => {
                e.preventDefault();
                navigate(`/videos/${video.id}`);
              }}
              _hover={{ cursor: "pointer", opacity: "0.8" }}
            >
              <Box>
                <Img
                  src={`https://image.tmdb.org/t/p/original${video.posterPath}`}
                  alt={`ポスター画像: ${video.title}`}
                  mb="4"
                  h="230px"
                  w="190px"
                  borderBottom="1px solid #000"
                />
                <Box textAlign="center">
                  <Text fontSize="md" color="#000">
                    {video.title}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    {video.releaseDate}
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

export default WorldViewDetailPage;
