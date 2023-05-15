import React from 'react';
import Video from '../Video/Video';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function Search() {
  const { videoId } = useParams();
  const {
    videoLoading,
    videoError,
    data: videoData,
  } = useQuery(['video'], async () => {
    return fetch(`data/videos/list_by_keyword.json`).then((res) => res.json());
  });

  return (
    videoData !== undefined && (
      <Video
        isLoading={videoLoading}
        error={videoError}
        playlists={videoData}
      />
    )
  );
}
