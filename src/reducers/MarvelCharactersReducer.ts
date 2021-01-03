import {
  IMarvelCharacters,
  MarvelCharactersActions,
  MarvelCharactersActionList,
} from 'interfaces/reducers/MarvelCharactersInterfaces';

const MarvelCharactersInitialState: IMarvelCharacters = {
  data: null,
  selected: null,
  favorites: [],
  disliked: [],
};
const MarvelCharactersReducer = (state: IMarvelCharacters = MarvelCharactersInitialState, action: MarvelCharactersActions) => {
  switch (action.type) {
    case MarvelCharactersActionList.SET_CHARACTERS: {
      return { ...state, data: action.payload.data };
    }
    case MarvelCharactersActionList.SET_SELECTED_CHARACTER: {
      return { ...state, selected: action.payload.data };
    }
    case MarvelCharactersActionList.ADD_FAVORITES_CHARACTERS: {
      return { ...state, favorites: [...state.favorites, action.payload.id] };
    }
    case MarvelCharactersActionList.DELETE_FAVORITES_CHARACTERS: {
      return { ...state, favorites: state.favorites.filter((favorite) => favorite !== action.payload.id) };
    }
    case MarvelCharactersActionList.DELETE_ALL_FAVORITES_CHARACTERS: {
      return { ...state, favorites: [] };
    }
    case MarvelCharactersActionList.ADD_DISLIKED_CHARACTERS: {
      return { ...state, disliked: [...state.disliked, action.payload.id] };
    }
    case MarvelCharactersActionList.DELETE_DISLIKED_CHARACTERS: {
      return { ...state, disliked: state.disliked.filter((disliked) => disliked !== action.payload.id) };
    }
    case MarvelCharactersActionList.DELETE_ALL_DISLIKED_CHARACTERS: {
      return { ...state, disliked: [] };
    }
    default: {
      return state;
    }
  }
};

export { MarvelCharactersReducer, MarvelCharactersInitialState };
