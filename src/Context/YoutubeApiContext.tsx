import { ReactElement, createContext, useContext } from 'react';
import Youtube from '../api/Youtube';

export type YoutubeProps = {
  youtube: Youtube;
};

export const YoutubeApiContext = createContext<YoutubeProps>(null!);

export function YoutubeApiProvider({ children }: { children: ReactElement }) {
  const youtube = new Youtube();

  return (
    <YoutubeApiContext.Provider value={{ youtube }}>
      {children}
    </YoutubeApiContext.Provider>
  );
}

export function useYoutubeApi() {
  return useContext(YoutubeApiContext);
}
