import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Video from '../Video/Video';

export default function Home() {
  const {
    isLoading,
    error,
    data: playlists,
  } = useQuery(['playlist'], async () => {
    return fetch(`data/list_by_popular_videos.json`).then((res) => res.json());
  });

  return <Video isLoading={isLoading} error={error} playlists={playlists} />;
}
