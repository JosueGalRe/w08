import CharacterDataWrapper from 'interfaces/characters/CharacterDataWrapper';

export interface IMarvelCharacters {
  data: CharacterDataWrapper[];
  favorites: number[];
  disliked: number[];
  selected: CharacterDataWrapper | null;
}

export enum MarvelCharactersActionList {
  SET_CHARACTERS = 'setCharacters',
  SET_SELECTED_CHARACTER = 'setSelectedCharacter',
  ADD_FAVORITES_CHARACTERS = 'addFavoritesCharacters',
  DELETE_FAVORITES_CHARACTERS = 'deleteFavoritesCharacters',
  DELETE_ALL_FAVORITES_CHARACTERS = 'deleteAllFavoritesCharacters',
  ADD_DISLIKED_CHARACTERS = 'addDislikedCharacters',
  DELETE_DISLIKED_CHARACTERS = 'deleteDislikedCharacters',
  DELETE_ALL_DISLIKED_CHARACTERS = 'deleteAllDislikedCharacters',
}

interface MarvelCharactersSetCharacters {
  type: MarvelCharactersActionList.SET_CHARACTERS;
  payload: {
    data: CharacterDataWrapper[];
  };
}

interface MarvelCharactersSetSelectedComic {
  type: MarvelCharactersActionList.SET_SELECTED_CHARACTER;
  payload: {
    data: CharacterDataWrapper;
  };
}

interface MarvelCharactersAddDelete {
  type:
    | MarvelCharactersActionList.ADD_FAVORITES_CHARACTERS
    | MarvelCharactersActionList.ADD_DISLIKED_CHARACTERS
    | MarvelCharactersActionList.DELETE_FAVORITES_CHARACTERS
    | MarvelCharactersActionList.DELETE_DISLIKED_CHARACTERS;
  payload: {
    id: number;
  };
}

interface MarvelCharactersDeleteAll {
  type: MarvelCharactersActionList.DELETE_ALL_DISLIKED_CHARACTERS | MarvelCharactersActionList.DELETE_ALL_FAVORITES_CHARACTERS;
}

export type MarvelCharactersActions =
  | MarvelCharactersSetCharacters
  | MarvelCharactersSetSelectedComic
  | MarvelCharactersAddDelete
  | MarvelCharactersDeleteAll;
