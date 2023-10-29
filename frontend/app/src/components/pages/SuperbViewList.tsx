import { Box, Wrap, WrapItem } from "@chakra-ui/react";
import Loading from "components/atoms/Loading";
import SuperbViewCard from "components/organisms/superbView/SuperbViewCard";
import useGetAllSuperbViews from "hooks/api/superbView/useGetAllSuperbViews";
import { memo, useEffect } from "react";

const SuperbViewList = memo(() => {
  const { getAllSuperbViews, SuperbViews, loadingSuperbViews } = useGetAllSuperbViews();
  useEffect(() => {
    getAllSuperbViews();
  }, []);

  return (
    <>
      {(() => {
        if (loadingSuperbViews === true) {
          return <Loading />;
        }
        return (
          <Box my="9" mx="5">
            <Wrap>
              {SuperbViews.map((SuperbView) => (
                <WrapItem w={{ sm: "100%", md: "49%" }} key={SuperbView.id}>
                  <SuperbViewCard
                    name={SuperbView.name}
                    imageUrl={SuperbView.imageUrl}
                    bestSeason={SuperbView.bestSeason}
                  />
                </WrapItem>
              ))}
            </Wrap>
          </Box>
        );
      })()}
    </>
  );
});

export default SuperbViewList;
