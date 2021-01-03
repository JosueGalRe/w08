import { IMarvelComics, MarvelComicsActions, MarvelComicsActionList } from 'interfaces/reducers/MarvelComicsInterfaces';

const MarvelComicsInitialState: IMarvelComics = {
  data: null,
  selected: null,
  favorites: [],
  disliked: [],
};

const MarvelComicsReducer = (state: IMarvelComics = MarvelComicsInitialState, action: MarvelComicsActions) => {
  switch (action.type) {
    case MarvelComicsActionList.SET_COMICS: {
      return { ...state, data: action.payload.data };
    }
    case MarvelComicsActionList.SET_SELECTED_COMIC: {
      return { ...state, selected: action.payload.data };
    }
    case MarvelComicsActionList.ADD_FAVORITES_COMICS: {
      return { ...state, favorites: [...state.favorites, action.payload.id] };
    }
    case MarvelComicsActionList.DELETE_FAVORITES_COMICS: {
      return { ...state, favorites: state.favorites.filter((favorite) => favorite !== action.payload.id) };
    }
    case MarvelComicsActionList.DELETE_ALL_FAVORITES_COMICS: {
      return { ...state, favorites: [] };
    }
    case MarvelComicsActionList.ADD_DISLIKED_COMICS: {
      return { ...state, disliked: [...state.disliked, action.payload.id] };
    }
    case MarvelComicsActionList.DELETE_DISLIKED_COMICS: {
      return { ...state, disliked: state.disliked.filter((disliked) => disliked !== action.payload.id) };
    }
    case MarvelComicsActionList.DELETE_ALL_DISLIKED_COMICS: {
      return { ...state, disliked: [] };
    }
    default: {
      return state;
    }
  }
};

export { MarvelComicsReducer, MarvelComicsInitialState };
