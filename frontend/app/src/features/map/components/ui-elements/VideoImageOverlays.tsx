import { useVideoListContext } from "providers/VideoListProvider";
import { FC } from "react";
import ZoomDependentImageOverlay from "./ZoomDependentImageOverlay";

const VideoImageOverlays: FC = () => {
  const { state } = useVideoListContext();
  const { videos } = state;
  return (
    <>
      {videos.map((video) =>
        video.worldViews.map((worldView) => (
          <ZoomDependentImageOverlay
            key={worldView.id}
            latlong={[worldView.latitude, worldView.longitude]}
            url={`https://image.tmdb.org/t/p/original${video.posterPath}`}
          />
        ))
      )}
    </>
  );
};

export default VideoImageOverlays;
