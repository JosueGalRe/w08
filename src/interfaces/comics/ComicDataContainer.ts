import { Comic } from './Comic';

export default interface ComicDataContainer {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: Array<Comic>;
}
