export interface IMarvelContext {
  data: string | null;
  selected: string | null;
}

export enum MarvelActionList {
  SET_DATA = 'setData',
  SET_SELECTED_DATA = 'setSelectedData',
}

interface MarvelSetData<T> {
  type: MarvelActionList.SET_DATA;
  payload: {
    data: T;
  };
}

interface MarvelSetSelectedData<T> {
  type: MarvelActionList.SET_SELECTED_DATA;
  payload: {
    data: T;
  };
}

export type MarvelActions<T> = MarvelSetData<T> | MarvelSetSelectedData<T>;
