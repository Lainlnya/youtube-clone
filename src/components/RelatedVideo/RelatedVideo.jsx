import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Video from '../../pages/Video/Video';
import { useYoutubeApi } from '../../Context/YoutubeApiContext.jsx';

export default function RelatedVideo({ related }) {
  const relatedId = related;
  const { youtube } = useYoutubeApi();

  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(['video', relatedId], () => {
    return youtube.relatedVideo(relatedId);
  });

  return (
    <Video
      isLoading={isLoading}
      error={error}
      playlists={videos}
      isRelated={true}
    />
  );
}
