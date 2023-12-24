/** @jsxImportSource @emotion/react */

import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import { formatAgo } from '../../util/date';
import { YoutubeVideo } from 'api/Youtube';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const listStyle = css({
  backgroundColor: 'var(--color-bg)',
  color: 'var(--color-text)',
  padding: '24px 24px 0 24px',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'stretch',
});

const listItemStyle = css({
  flexBasis: '320px',
  flexGrow: 1,
  maxWidth: '360px',
  minWidth: '320px',
  listStyleType: 'none',
  marginBottom: '24px',
  '&:hover': { cursor: 'pointer' },
});

const figureStyle = styled('figure')`
  width: 320px;
`;

const figureInnerStyle = styled(figureStyle)`
  width: 360px;
  height: 90px;
  display: flex;
  flex-flow: row nowrap;
`;

const imgStyle = styled('img')`
  width: 100%;
  height: 180px;
  text-align: center;
  border-radius: 1rem;
`;

const relatedStyle = css({
  width: '50%',
  height: '100%',
});

const figcaptionStyle = styled('figcaption')`
  margin-left: 2%;
  font-size: 0.7rem;
  width: 90%;
`;

const titleStyle = css({
  fontSize: '0.8rem',
  fontWeight: 600,
});

export type VideoInfos = {
  isLoading: boolean;
  isError: boolean;
  playlists: YoutubeVideo[] | undefined;
  isRelated: boolean;
};

export type ErrorType<T> = {
  error: T | unknown;
};

export default function Video(
  { isLoading, isError, playlists, isRelated }: VideoInfos,
  { error }: ErrorType<object>
) {
  if (isLoading) return <Loading />;
  if (isError || playlists === undefined) return <Error />;

  return (
    <>
      {playlists && (
        <ul css={listStyle}>
          {playlists.map((playlist) => (
            <Link
              to={
                typeof playlist.id === 'string'
                  ? `/videos/detail/${playlist.id}`
                  : `/videos/detail/${playlist.id.videoId || ''}`
              }
              state={playlist.snippet}
            >
              <li
                key={typeof playlist.id === 'string' ? playlist.id : ''}
                css={listItemStyle}
              >
                <figure
                  css={`
                    ${isRelated ? figureInnerStyle : ''}
                  `}
                >
                  <img
                    css={`
                      ${isRelated ? relatedStyle : ''}
                    `}
                    src={playlist.snippet.thumbnails.medium.url}
                    alt="thumbnail"
                  />
                  <figcaption css={figcaptionStyle}>
                    <p css={titleStyle}>{playlist.snippet.title}</p>
                    <p style>{playlist.snippet.channelTitle}</p>
                    <p css={styles.day}>
                      {formatAgo(playlist.snippet.publishedAt)}
                    </p>
                  </figcaption>
                </figure>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </>
  );
}
