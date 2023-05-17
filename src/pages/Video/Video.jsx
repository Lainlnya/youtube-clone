import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Video.module.css';

export default function Video({ isLoading, error, playlists, isRelated }) {
  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>error</p>;

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
  const [day, time] = [date.split('T')];
  const video_time = new Date(day);
  const current = new Date();

  if (current.getDate() !== video_time) {
    if (current.getFullYear() === video_time.getFullYear()) {
      if (current.getMonth() === video_time.getMonth()) {
        if (current.getDay() === video_time.getDay()) {
        } else
          return `${(video_time.getDay() - current.getDay()).toString()}일 전`;
      } else
        return `${(
          video_time.getMonth() - current.getMonth()
        ).toString()}달 전`;
    } else
      return `${(
        video_time.getFullYear() - current.getFullYear()
      ).toString()}년 전`;
  }
};
