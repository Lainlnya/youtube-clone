import { createContext, useContext } from 'react';
import Youtube from '../api/Youtube';

export const YoutubeApiContext = createContext();

export function YoutubeApiProvider({ children }) {
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
