import StoryDataWrapper from 'interfaces/stories/StoryDataWrapper';

export interface IMarvelStories {
  data: StoryDataWrapper[];
  favorites: number[];
  disliked: number[];
  selected: StoryDataWrapper | null;
}

export enum MarvelStoriesActionList {
  SET_STORIES = 'setStories',
  SET_SELECTED_STORIES = 'setSelectedStory',
  ADD_FAVORITES_STORIES = 'addFavoritesStories',
  DELETE_FAVORITES_STORIES = 'deleteFavoritesStories',
  DELETE_ALL_FAVORITES_STORIES = 'deleteAllFavoritesStories',
  ADD_DISLIKED_STORIES = 'addDislikedStories',
  DELETE_DISLIKED_STORIES = 'deleteDislikedStories',
  DELETE_ALL_DISLIKED_STORIES = 'deleteAllDislikedStories',
}

interface MarvelStoriesSetStories {
  type: MarvelStoriesActionList.SET_STORIES;
  payload: {
    data: StoryDataWrapper[];
  };
}

interface MarvelStoriesSetSelectedStorie {
  type: MarvelStoriesActionList.SET_SELECTED_STORIES;
  payload: {
    data: StoryDataWrapper;
  };
}

interface MarvelStoriesAddDelete {
  type:
    | MarvelStoriesActionList.ADD_FAVORITES_STORIES
    | MarvelStoriesActionList.ADD_DISLIKED_STORIES
    | MarvelStoriesActionList.DELETE_FAVORITES_STORIES
    | MarvelStoriesActionList.DELETE_DISLIKED_STORIES;
  payload: {
    id: number;
  };
}

interface MarvelStoriesDeleteAll {
  type: MarvelStoriesActionList.DELETE_ALL_DISLIKED_STORIES | MarvelStoriesActionList.DELETE_ALL_FAVORITES_STORIES;
}

export type MarvelStoriesActions =
  | MarvelStoriesSetStories
  | MarvelStoriesSetSelectedStorie
  | MarvelStoriesAddDelete
  | MarvelStoriesDeleteAll;
