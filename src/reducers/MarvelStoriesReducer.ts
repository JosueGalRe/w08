import { IMarvelStories, MarvelStoriesActionList, MarvelStoriesActions } from 'interfaces/reducers/MarvelStoriesInterfaces';

const MarvelStoriesInitialState: IMarvelStories = {
  data: [],
  selected: null,
  favorites: [],
  disliked: [],
};

const MarvelStoriesReducer = (state: IMarvelStories = MarvelStoriesInitialState, action: MarvelStoriesActions) => {
  switch (action.type) {
    case MarvelStoriesActionList.SET_STORIES: {
      return { ...state, data: action.payload.data };
    }
    case MarvelStoriesActionList.SET_SELECTED_STORIES: {
      return { ...state, selected: action.payload.data };
    }
    case MarvelStoriesActionList.ADD_FAVORITES_STORIES: {
      return { ...state, favorites: [...state.favorites, action.payload.id] };
    }
    case MarvelStoriesActionList.DELETE_FAVORITES_STORIES: {
      return { ...state, favorites: state.favorites.map((favorite) => favorite !== action.payload.id) };
    }
    case MarvelStoriesActionList.DELETE_ALL_FAVORITES_STORIES: {
      return { ...state, favorites: [] };
    }
    case MarvelStoriesActionList.ADD_DISLIKED_STORIES: {
      return { ...state, disliked: [...state.disliked, action.payload.id] };
    }
    case MarvelStoriesActionList.DELETE_DISLIKED_STORIES: {
      return { ...state, disliked: state.disliked.map((disliked) => disliked !== action.payload.id) };
    }
    case MarvelStoriesActionList.DELETE_ALL_DISLIKED_STORIES: {
      return { ...state, disliked: [] };
    }
    default: {
      return state;
    }
  }
};

export { MarvelStoriesReducer, MarvelStoriesInitialState };
