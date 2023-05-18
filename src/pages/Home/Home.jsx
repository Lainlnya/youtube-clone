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
      `https://youtube.googleapis.com/youtube/v3/${
        keyword
          ? `search?part=snippet&maxResults=25&q=${keyword}`
          : `videos?part=snippet&chart=mostPopular&maxResults=25`
      }&key=AIzaSyAzVKlcBxax8v4o-ugCMDz3al41hu_4hXU`
    )
      .then((res) => res.json())
      .then((data) => data.items);
  });

  return (
    <Video
      isLoading={isLoading}
      error={error}
      playlists={playlists}
      isRelated={false}
    />
  );
}
