import React from 'react';
import { useQuery } from '@tanstack/react-query';
import styles from './Comments.module.css';
import { useYoutubeApi } from '../../Context/YoutubeApiContext.tsx';
import { YoutubeComment } from 'api/Youtube.tsx';

type VideoProps = {
  commentsId: string;
};

export default function Comments({ commentsId }: VideoProps) {
  const { youtube } = useYoutubeApi();
  const { data: comments } = useQuery(
    ['comments', commentsId],
    () => {
      return youtube.comment(commentsId);
    },
    { staleTime: 1000 * 60 * 1 }
  );

  return (
    <>
      <div className={styles.comments}>Comments</div>
      {comments && (
        <ul>
          {comments.map((comment: YoutubeComment) => (
            <li key={comment.id} className={styles.comment}>
              <figure className={styles.channel}>
                <img
                  className={styles.channelThumbnail}
                  src={
                    comment.snippet.topLevelComment.snippet
                      .authorProfileImageUrl
                  }
                  alt="channel thumbnail"
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
