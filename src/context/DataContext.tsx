import { createContext, Dispatch, useContext } from 'react';
import { IMarvelContext, MarvelActions } from 'interfaces/reducers/MarvelActionsInterfaces';
import CharacterDataWrapper from 'interfaces/characters/CharacterDataWrapper';
import ComicDataWrapper from 'interfaces/comics/ComicDataWrapper';
import StoryDataWrapper from 'interfaces/stories/StoryDataWrapper';

interface IDataContext {
  state: IMarvelContext | null;
  dispatch: Dispatch<MarvelActions<CharacterDataWrapper | ComicDataWrapper | StoryDataWrapper>>;
}

const DataContext = createContext<IDataContext | null>(null);

export function useDataContext() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('Components using DataContext should be rendered within DataContext.Provider');
  return ctx;
}

export default DataContext;
