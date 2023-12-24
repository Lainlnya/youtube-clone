/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../../Context/YoutubeApiContext.tsx';
import { YoutubeComment } from 'api/Youtube.tsx';

type VideoProps = {
  commentsId: string;
};

const commentStyle = css`
  margin-bottom: 10px;
  font-size: 1rem;
`;

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
      <div
        css={{
          fontSize: '1.2rem',
          fontWeight: 600,
          margin: '20px 0',
        }}
      >
        Comments
      </div>
      {comments && (
        <ul>
          {comments.map((comment: YoutubeComment) => (
            <li key={comment.id} css={commentStyle}>
              <figure
                css={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                }}
              >
                <img
                  css={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                  }}
                  src={
                    comment.snippet.topLevelComment.snippet
                      .authorProfileImageUrl
                  }
                  alt="channel thumbnail"
                />
                <figcaption
                  css={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <p
                    css={{
                      fontWeight: 600,
                      fontSize: '1rem',
                    }}
                  >
                    {comment.snippet.topLevelComment.snippet.authorDisplayName}
                  </p>
                  <p css={commentStyle}>
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
