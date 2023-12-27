/** @jsxImportSource @emotion/react */
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Video from '../Video/Video';
import { useParams } from 'react-router-dom';
import { useYoutubeApi } from '../../Context/YoutubeApiContext.tsx';
import { YoutubeVideo } from 'api/Youtube.tsx';
import { css } from '@emotion/react';

const mainStyle = css({
  backgroundColor: `var(--color-bg)`,
});

export default function Home() {
  const { keyword } = useParams();
  const { youtube } = useYoutubeApi();
  const {
    isLoading,
    isError,
    data: playlists,
  } = useQuery<YoutubeVideo[]>(
    ['video', keyword],
    () => {
      return youtube.hotSearch(keyword!);
    },
    { staleTime: 1000 * 60 * 1 }
  );

  return (
    <main css={mainStyle}>
      <Video
        isLoading={isLoading}
        isError={isError}
        playlists={playlists}
        isRelated={false}
      />
    </main>
  );
}
