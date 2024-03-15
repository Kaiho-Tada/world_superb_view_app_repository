import defaultImg from "assets/default.png";
import { useWorldViewListContext } from "providers/WorldViewListProvider";
import { FC } from "react";
import ZoomDependentImageOverlay from "./ZoomDependentImageOverlay";

const WorldViewImageOverlays: FC = () => {
  const { state } = useWorldViewListContext();
  const { worldViews } = state;

  return (
    <>
      {worldViews.map((worldView) => (
        <ZoomDependentImageOverlay
          key={worldView.id}
          latlong={[worldView.latitude, worldView.longitude]}
          url={worldView.imgUrl || defaultImg}
        />
      ))}
    </>
  );
};

export default WorldViewImageOverlays;
