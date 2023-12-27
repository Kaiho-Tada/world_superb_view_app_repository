import { Wrap } from "@chakra-ui/react";
import WorldViewCard from "components/organisms/worldView/WorldViewCard";
import { FC } from "react";
import { WorldView } from "types/api/worldView";

type Props = {
  currentViews: WorldView[];
};

const WorldViewList: FC<Props> = ({ currentViews }) => (
  <Wrap role="list" aria-label="絶景一覧">
    {currentViews.map((worldView) => (
      <WorldViewCard
        id={worldView.id}
        name={worldView.name}
        imageUrl={worldView.imageUrl}
        bestSeason={worldView.bestSeason}
        countries={worldView.countries}
        categories={worldView.categories}
        characteristics={worldView.characteristics}
        favorites={worldView.worldViewFavorites}
      />
    ))}
  </Wrap>
);

export default WorldViewList;
