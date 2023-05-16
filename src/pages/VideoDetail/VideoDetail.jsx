import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export default function VideoDetail() {
  const { detailId } = useParams();
  const {
    detailLoading,
    detailError,
    data: detail,
  } = useQuery(['detail'], async () => {
    return fetch(`data/videos/video_detail.json`).then((res) => res.json());
  });

  return (
    <>
      {detail !== undefined && (
        <main>
          <iframe
            id="ytplayer"
            type="text/html"
            title="ytplayer"
            src={`https://www.youtube.com/embed/${detailId}?autoplay=1&origin=http://example.com`}
          />
          <p>{detail.items.snippet.title}</p>
        </main>
      )}
    </>
  );
}
