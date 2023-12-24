/** @jsxImportSource @emotion/react */
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import RelatedVideo from '../../components/RelatedVideo/RelatedVideo';
import Comments from '../../components/Comments/Comments';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import { useYoutubeApi } from '../../Context/YoutubeApiContext.tsx';
import { css } from '@emotion/react';

const mainStyle = css({
  backgroundColor: 'var(--color-bg)',
  display: 'flex',
  flexFlow: 'row wrap',
  color: 'var(--color-text)',
});

const playerSecStyle = css({
  marginTop: '1%',
  paddingLeft: '2%',
  paddingRight: '2%',
  flexBasis: '66%',
  flexGrow: 1,
});

const areaStyle = css({
  position: 'relative',
  width: '100%',
  height: 0,
  paddingTop: '56.25%',
});

const playerStyle = css({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
});

const titleStyle = css({
  marginTop: '1rem',
  fontSize: '1.1rem',
  fontWeight: '600',
});

const thumbnailSecStyle = css({
  display: 'flex',
  flexFlow: 'row nowrap',
});

const thumbnailStyle = css({
  margin: '5px 10px 5px 0',
  width: '44px',
  height: '44px',
  borderRadius: '50%',
});

const thumbTitleStyle = css({
  lineHeight: '50px',
  fontWeight: 600,
});

const descriptionStyle = css({
  marginTop: '1rem',
  backgroundColor: 'var(--color-des)',
  color: 'var(--color-des-text)',
  width: '100%',
  padding: '10px',
  borderRadius: '1rem',
  fontSize: '0.9rem',
});

const relatedStyle = css({
  flexBasis: '30%',
  flexGrow: 1,
});

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
        <main css={mainStyle}>
          <section css={playerSecStyle}>
            <div css={areaStyle}>
              <iframe
                css={playerStyle}
                id="ytplayer"
                title="ytplayer"
                src={`https://www.youtube.com/embed/${detailId}?autoplay=1&mute=1&origin=http://example.com`}
                frameBorder="0"
              />
            </div>
            <section>
              <p css={titleStyle}>{videoInfo.title}</p>
              <figure css={thumbnailSecStyle}>
                <img
                  css={thumbnailStyle}
                  src={detail.snippet.thumbnails.default.url}
                  alt="channel thumbnail"
                />
                <figcaption>
                  <p css={thumbTitleStyle}>{videoInfo.channelTitle}</p>
                </figcaption>
              </figure>
              <div css={descriptionStyle}>{videoInfo.description}</div>
            </section>
            <section>
              <Comments commentsId={detailId!} />›
            </section>
          </section>
          <section css={relatedStyle}>
            <RelatedVideo channelName={videoInfo.title} />
          </section>
        </main>
      )}
    </>
  );
}
