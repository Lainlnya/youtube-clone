import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Video from '../Video/Video';
import { useParams } from 'react-router-dom';
import styles from '../Home/Home.module.css';

export default function Home() {
  const youtubeAPI = process.env.REACT_APP_YOUTUBE_API;
  const { keyword } = useParams();
  const {
    isLoading,
    error,
    data: playlists,
  } = useQuery(['video', keyword], async () => {
    return fetch(
      `https://youtube.googleapis.com/youtube/v3/${
        keyword
          ? `search?part=snippet&maxResults=32&q=${keyword}`
          : `videos?part=snippet&chart=mostPopular&maxResults=32&regionCode=kr`
      }&key=${youtubeAPI}`
    )
      .then((res) => res.json())
      .then((data) => data.items);
  });

  return (
    <main className={styles.main}>
      <Video
        isLoading={isLoading}
        error={error}
        playlists={playlists}
        isRelated={false}
      />
    </main>
  );
}
