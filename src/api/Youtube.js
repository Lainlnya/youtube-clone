import axios from 'axios';

export default class Youtube {
  constructor() {
    this.httpClient = axios.create({
      baseURL: 'https://www.googleapis.com/youtube/v3',
      params: { key: process.env.REACT_APP_YOUTUBE_API },
    });
  }
  async hotSearch(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }

  async #searchByKeyword(keyword) {
    return this.httpClient
      .get('search', {
        params: {
          part: 'snippet',
          maxResults: 32,
          q: keyword,
        },
      })
      .then((res) => res.data.items);
  }

  async #mostPopular() {
    return this.httpClient
      .get('videos', {
        params: {
          part: 'snippet',
          chart: 'mostPopular',
          maxResults: 32,
          regionCode: 'kr',
        },
      })
      .then((res) => res.data.items);
  }

  async comment(commentsId) {
    return this.httpClient
      .get('commentThreads', {
        params: {
          part: 'snippet',
          textFormat: 'plainText',
          videoId: commentsId,
          maxResults: 50,
        },
      })
      .then((res) => res.data.items);
  }

  async relatedVideo(relatedId) {
    return this.httpClient
      .get('search', {
        params: {
          part: 'snippet',
          maxResults: 25,
          relatedToVideoId: relatedId,
          type: 'video',
        },
      })
      .then((res) => res.data.items);
  }

  async channelInfo(detailId) {
    return this.httpClient
      .get('channels', {
        params: {
          part: 'snippet',
          id: detailId,
        },
      })
      .then((res) => res.data.items[0]);
  }
}
