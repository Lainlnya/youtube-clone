import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Video.module.css';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';

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
                      {changeDate(playlist.snippet.publishedAt)}
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

const changeDate = (date) => {
  const [day] = [date.split('T')];
  const video_time = new Date(day);
  const current = new Date();

  if (current.getDate() !== video_time) {
    if (current.getFullYear() === video_time.getFullYear()) {
      if (current.getMonth() === video_time.getMonth()) {
        if (current.getDay() === video_time.getDay()) {
        } else
          return `${current.getDay() - video_time.getDay().toString()}일 전`;
      } else
        return `${(
          current.getMonth() - video_time.getMonth()
        ).toString()}달 전`;
    } else
      return `${(
        current.getFullYear() - video_time.getFullYear()
      ).toString()}년 전`;
  }
};
