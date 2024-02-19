import { Wrap } from "@chakra-ui/react";
import Video from "features/video/types/Video";
import { FC } from "react";
import MovieCard from "./VideoCard";

type Props = { currentVideos: Video[] };

const VideoList: FC<Props> = (props) => {
  const { currentVideos } = props;
  return (
    <Wrap role="list" aria-label="ビデオ一覧">
      {currentVideos.map((currentVideo: Video) => (
        <MovieCard
          key={currentVideo.id}
          title={currentVideo.title}
          posterPath={currentVideo.posterPath}
          releaseDate={currentVideo.releaseDate}
        />
      ))}
    </Wrap>
  );
};

export default VideoList;
