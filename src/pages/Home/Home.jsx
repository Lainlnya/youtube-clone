import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Video from '../Video/Video';
import { useParams } from 'react-router-dom';

export default function Home() {
  const { keyword } = useParams();
  const {
    isLoading,
    error,
    data: playlists,
  } = useQuery(['video', keyword], async () => {
    return fetch(
      `/videos/${keyword ? 'list_by_keyword' : 'list_by_popular_videos'}.json`
    )
      .then((res) => res.json())
      .then((data) => data.items);
  });

  return <Video isLoading={isLoading} error={error} playlists={playlists} />;
}
