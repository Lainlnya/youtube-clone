import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Video.module.css';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import { formatAgo } from '../../util/date';

export default function Video({ isLoading, error, playlists, isRelated }) {
  if (isLoading) return <Loading />;

  if (error) return <Error />;

  return (
    <>
      {playlists && (
        <ul className={styles.list}>
          {playlists.map((playlist) => (
            <Link
              to={
                playlist.id.length
                  ? `/videos/detail/${playlist.id}`
                  : `/videos/detail/${playlist.id.videoId}`
              }
              state={playlist.snippet}
            >
              <li key={playlist.id} className={styles.list_item}>
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
