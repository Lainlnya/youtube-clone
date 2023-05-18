import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Video from '../../pages/Video/Video';

export default function RelatedVideo({ related }) {
  const relatedId = related;
  const youtubeAPI = process.env.REACT_APP_YOUTUBE_API;

  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(['video', relatedId], async () => {
    return fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&relatedToVideoId=${relatedId}&type=video&key=${youtubeAPI}`
    )
      .then((res) => res.json())
      .then((data) => data.items);
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
