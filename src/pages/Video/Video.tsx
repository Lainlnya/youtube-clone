import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Video.module.css';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import { formatAgo } from '../../util/date';
import { YoutubeVideo } from 'api/Youtube';

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
        <ul className={styles.list}>
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
                className={styles.list_item}
              >
                <figure className={`${isRelated ? styles.figure : ''}`}>
                  <img
                    className={`${isRelated ? styles.related : ''}`}
                    src={playlist.snippet.thumbnails.medium.url}
                    alt="thumbnail"
                  />
                  <figcaption
                    className={`${isRelated ? styles.relatedFig : ''}`}
                  >
                    <p className={styles.title}>{playlist.snippet.title}</p>
                    <p className={styles.channel}>
                      {playlist.snippet.channelTitle}
                    </p>
                    <p className={styles.day}>
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
