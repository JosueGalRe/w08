import CharacterDataWrapper from 'interfaces/characters/CharacterDataWrapper';
import ComicDataWrapper from 'interfaces/comics/ComicDataWrapper';
import { IMarvelContext, MarvelActionList, MarvelActions } from 'interfaces/reducers/MarvelActionsInterfaces';
import StoryDataWrapper from 'interfaces/stories/StoryDataWrapper';

const MarvelContextInitialState: IMarvelContext = {
  data: null,
  selected: null,
};

const MarvelContextReducer = (
  state: IMarvelContext = MarvelContextInitialState,
  action: MarvelActions<ComicDataWrapper | CharacterDataWrapper | StoryDataWrapper>
) => {
  switch (action.type) {
    case MarvelActionList.SET_DATA: {
      return { ...state, data: JSON.stringify(action.payload.data) };
    }
    case MarvelActionList.SET_SELECTED_DATA: {
      return { ...state, selected: JSON.stringify(action.payload.data) };
    }
    default: {
      return state;
    }
  }
};

export { MarvelContextReducer, MarvelContextInitialState };
