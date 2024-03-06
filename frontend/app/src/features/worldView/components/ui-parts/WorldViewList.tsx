import { Wrap } from "@chakra-ui/react";
import defaultImg from "assets/default.png";
import WorldViewCard from "features/worldView/components/ui-parts/WorldViewCard";
import { WorldView } from "features/worldView/types/api/worldView";
import { FC, memo } from "react";

type Props = {
  currentViews: WorldView[];
};

const WorldViewList: FC<Props> = memo(({ currentViews }) => (
  <Wrap role="list" aria-label="絶景一覧">
    {currentViews.map((worldView) => (
      <WorldViewCard
        key={worldView.id}
        id={worldView.id}
        name={worldView.name}
        imgUrl={worldView.imgUrl || defaultImg}
        countries={worldView.countries}
        categories={worldView.categories}
        gifUrl={worldView.gifUrl || null}
        gifSite={worldView.gifSite || null}
      />
    ))}
  </Wrap>
));

export default WorldViewList;
