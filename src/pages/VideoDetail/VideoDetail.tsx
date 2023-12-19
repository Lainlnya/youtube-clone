import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import styles from './VideoDetail.module.css';
import RelatedVideo from '../../components/RelatedVideo/RelatedVideo';
import Comments from '../../components/Comments/Comments';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import { useYoutubeApi } from '../../Context/YoutubeApiContext.jsx';

export type VideoProps = {
  commentsId: string;
  channelName: string;
};

export default function VideoDetail() {
  const { detailId } = useParams();
  const { youtube } = useYoutubeApi();
  const videoInfo = useLocation().state;

  const {
    isLoading,
    error,
    data: detail,
  } = useQuery(
    ['detail', detailId],
    () => {
      return youtube.channelInfo(videoInfo.channelId);
    },
    { staleTime: 1000 * 60 * 5 }
  );

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      {detail && (
        <main className={styles.main}>
          <section className={styles.playerSec}>
            <div className={styles.area}>
              <iframe
                className={styles.player}
                id="ytplayer"
                title="ytplayer"
                src={`https://www.youtube.com/embed/${detailId}?autoplay=1&mute=1&origin=http://example.com`}
                frameBorder="0"
              />
            </div>
            <section className={styles.infoSec}>
              <p className={styles.title}>{videoInfo.title}</p>
              <figure className={styles.thumbnailSec}>
                <img
                  className={styles.thumbnail}
                  src={detail.snippet.thumbnails.default.url}
                  alt="channel thumbnail"
                />
                <figcaption>
                  <p className={styles.thumbTitle}>{videoInfo.channelTitle}</p>
                </figcaption>
              </figure>
              <div className={styles.description}>{videoInfo.description}</div>
            </section>
            <section>
              <Comments commentsId={detailId!} />›
            </section>
          </section>
          <section className={styles.related}>
            <RelatedVideo channelName={videoInfo.title} />
          </section>
        </main>
      )}
    </>
  );
}
