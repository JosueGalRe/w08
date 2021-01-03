import { createContext, Dispatch, useContext } from 'react';
import { IMarvelCharacters, MarvelCharactersActions } from 'interfaces/reducers/MarvelCharactersInterfaces';

interface IMarvelCharactersContext {
  state: IMarvelCharacters | null;
  dispatch: Dispatch<MarvelCharactersActions>;
}

const MarvelCharactersContext = createContext<IMarvelCharactersContext | null>(null);

export function useMarvelContext() {
  const ctx = useContext(MarvelCharactersContext);
  if (!ctx)
    throw new Error('Components using MarvelCharactersContext should be rendered within MarvelCharactersContext.Provider');
  return ctx;
}

export default MarvelCharactersContext;
