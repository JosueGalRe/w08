import ComicDataWrapper from 'interfaces/comics/ComicDataWrapper';

export interface IMarvelComics {
  data: ComicDataWrapper[];
  favorites: number[];
  disliked: number[];
  selected: ComicDataWrapper | null;
}

export enum MarvelComicsActionList {
  SET_COMICS = 'setComics',
  SET_SELECTED_COMIC = 'setSelectedComic',
  ADD_FAVORITES_COMICS = 'addFavoritesComics',
  DELETE_FAVORITES_COMICS = 'deleteFavoritesComics',
  DELETE_ALL_FAVORITES_COMICS = 'deleteAllFavoritesComics',
  ADD_DISLIKED_COMICS = 'addDislikedComics',
  DELETE_DISLIKED_COMICS = 'deleteDislikedComics',
  DELETE_ALL_DISLIKED_COMICS = 'deleteAllDislikedComics',
}

interface MarvelComicsSetComics {
  type: MarvelComicsActionList.SET_COMICS;
  payload: {
    data: ComicDataWrapper[];
  };
}

interface MarvelComicsSetSelectedComic {
  type: MarvelComicsActionList.SET_SELECTED_COMIC;
  payload: {
    data: ComicDataWrapper;
  };
}

interface MarvelComicsAddDelete {
  type:
    | MarvelComicsActionList.ADD_FAVORITES_COMICS
    | MarvelComicsActionList.ADD_DISLIKED_COMICS
    | MarvelComicsActionList.DELETE_FAVORITES_COMICS
    | MarvelComicsActionList.DELETE_DISLIKED_COMICS;
  payload: {
    id: number;
  };
}

interface MarvelComicsDeleteAll {
  type: MarvelComicsActionList.DELETE_ALL_DISLIKED_COMICS | MarvelComicsActionList.DELETE_ALL_FAVORITES_COMICS;
}

export type MarvelComicsActions =
  | MarvelComicsSetComics
  | MarvelComicsSetSelectedComic
  | MarvelComicsAddDelete
  | MarvelComicsDeleteAll;
