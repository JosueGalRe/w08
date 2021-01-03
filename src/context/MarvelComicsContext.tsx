import { createContext, Dispatch, useContext } from 'react';
import { IMarvelComics, MarvelComicsActions } from 'interfaces/reducers/MarvelComicsInterfaces';

interface IMarvelComicContext {
  state: IMarvelComics | null;
  dispatch: Dispatch<MarvelComicsActions>;
}

const MarvelComicsContext = createContext<IMarvelComicContext | null>(null);

export function useMarvelContext() {
  const ctx = useContext(MarvelComicsContext);
  if (!ctx) throw new Error('Components using MarvelComicsContext should be rendered within MarvelComicsContext.Provider');
  return ctx;
}

export default MarvelComicsContext;
