import React from 'react';
import { useQuery } from '@tanstack/react-query';
import styles from './Comments.module.css';

export default function Comments({ commentsId }) {
  const {
    isLoading,
    error,
    data: comments,
  } = useQuery(['comments', commentsId], async () => {
    return fetch(
      `https://www.googleapis.com/youtube/v3/commentThreads?key=AIzaSyAzVKlcBxax8v4o-ugCMDz3al41hu_4hXU&textFormat=plainText&part=snippet&videoId=${commentsId}&maxResults=50`
    )
      .then((res) => res.json())
      .then((data) => data.items);
  });

  return (
    <>
      <div className={styles.comments}>Comments</div>
      {comments && (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id} className={styles.comment}>
              <figure className={styles.channel}>
                <img
                  className={styles.channelThumbnail}
                  src={
                    comment.snippet.topLevelComment.snippet
                      .authorProfileImageUrl
                  }
                  alt="channel image"
                />
                <figcaption className={styles.channelCaption}>
                  <p className={styles.title}>
                    {comment.snippet.topLevelComment.snippet.authorDisplayName}
                  </p>
                  <p className={styles.comment}>
                    {comment.snippet.topLevelComment.snippet.textDisplay}
                  </p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
