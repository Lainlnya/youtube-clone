import axios, { AxiosInstance, AxiosResponse } from 'axios';

export type YoutubeVideo = {
  id: string | { videoId?: string };
  snippet: {
    thumbnails: {
      medium: {
        url: string;
      };
    };
    title: string;
    channelTitle: string;
    publishedAt: string;
  };
};

export type YoutubeComment = {
  id: string;
  snippet: {
    topLevelComment: {
      snippet: {
        authorProfileImageUrl: string;
        authorDisplayName: string;
        textDisplay: string;
      };
    };
  };
};

type YoutubeChannel = {
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
      };
    };
  };
};

export default class Youtube {
  private httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: 'https://www.googleapis.com/youtube/v3',
      params: { key: process.env.REACT_APP_YOUTUBE_API },
    });
  }

  async hotSearch(keyword: string): Promise<YoutubeVideo[]> {
    return keyword ? this.searchByKeyword(keyword) : this.mostPopular();
  }

  private async searchByKeyword(keyword: string): Promise<YoutubeVideo[]> {
    return this.httpClient
      .get('search', {
        params: {
          part: 'snippet',
          maxResults: 32,
          q: keyword,
        },
      })
      .then((res: AxiosResponse) => res.data.items as YoutubeVideo[]);
  }

  private async mostPopular(): Promise<YoutubeVideo[]> {
    return this.httpClient
      .get('videos', {
        params: {
          part: 'snippet',
          chart: 'mostPopular',
          maxResults: 32,
          regionCode: 'kr',
        },
      })
      .then((res: AxiosResponse) => res.data.items as YoutubeVideo[]);
  }

  async comment(commentsId: string): Promise<YoutubeComment[]> {
    return this.httpClient
      .get('commentThreads', {
        params: {
          part: 'snippet',
          textFormat: 'plainText',
          videoId: commentsId,
          maxResults: 50,
        },
      })
      .then((res: AxiosResponse) => res.data.items as YoutubeComment[]);
  }

  async channelInfo(detailId: string): Promise<YoutubeChannel | undefined> {
    return this.httpClient
      .get('channels', {
        params: {
          part: 'snippet',
          id: detailId,
        },
      })
      .then((res: AxiosResponse) => res.data.items[0] as YoutubeChannel);
  }
}
