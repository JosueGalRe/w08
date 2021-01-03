import { createContext, Dispatch, useContext } from 'react';
import { IMarvelStories, MarvelStoriesActions } from 'interfaces/reducers/MarvelStoriesInterfaces';

interface IMarvelStoryContext {
  state: IMarvelStories | null;
  dispatch: Dispatch<MarvelStoriesActions>;
}

const MarvelStoriesContext = createContext<IMarvelStoryContext | null>(null);

export function useMarvelContext() {
  const ctx = useContext(MarvelStoriesContext);
  if (!ctx) throw new Error('Components using MarvelStoriesContext should be rendered within MarvelStoriesContext.Provider');
  return ctx;
}

export default MarvelStoriesContext;
