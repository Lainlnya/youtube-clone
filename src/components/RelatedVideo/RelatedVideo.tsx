import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Video from '../../pages/Video/Video';
import { useYoutubeApi } from '../../Context/YoutubeApiContext.tsx';

type VideoProps = {
  channelName: string;
};

export default function RelatedVideo({ channelName }: VideoProps) {
  const channelTitle = channelName;
  const { youtube } = useYoutubeApi();

  const {
    isLoading,
    isError,
    data: videos,
  } = useQuery(
    ['video', channelTitle],
    () => {
      return youtube.hotSearch(channelTitle);
    },
    { staleTime: 1000 * 60 * 5 }
  );

  return (
    <Video
      isLoading={isLoading}
      isError={isError}
      playlists={videos}
      isRelated={true}
    />
  );
}
