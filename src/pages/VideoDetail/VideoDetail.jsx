import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import styles from './VideoDetail.module.css';

export default function VideoDetail() {
  const { detailId } = useParams();
  const videoInfo = useLocation().state;
  const {
    detailLoading,
    detailError,
    data: detail,
  } = useQuery(['detail', detailId], async () => {
    return fetch(
      '/videos/video_detail.json'
      // `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${detailId}&key=AIzaSyAzVKlcBxax8v4o-ugCMDz3al41hu_4hXU`
    )
      .then((res) => res.json())
      .then((data) => data.items[0]);
  });

  return (
    <>
      {detail && (
        <main className={styles.main}>
          <section className={styles.playerSec}>
            <div className={styles.area}>
              <iframe
                className={styles.player}
                id="ytplayer"
                type="text/html"
                title="ytplayer"
                src={`https://www.youtube.com/embed/${detailId}?autoplay=1&origin=http://example.com`}
              />
            </div>
            <section className={styles.infoSec}>
              <p className={styles.title}>{videoInfo.title}</p>
              <figure className={styles.thumbnailSec}>
                <img
                  className={styles.thumbnail}
                  src={detail.snippet.thumbnails.default.url}
                />
                <figcaption>
                  <p className={styles.thumbTitle}>{detail.snippet.title}</p>
                </figcaption>
              </figure>
              <div className={styles.description}>{videoInfo.description}</div>
            </section>
          </section>
          <section className={styles.related}>
            <p>
              relatedVideodddddddddd relatedVideodddddddddd
              relatedVideodddddddddd relatedVideodddddddddd
              relatedVideodddddddddd relatedVideodddddddddd
              relatedVideodddddddddd relatedVideodddddddddd
              relatedVideodddddddddd relatedVideodddddddddd
              relatedVideodddddddddd
            </p>
          </section>
        </main>
      )}
    </>
  );
}
