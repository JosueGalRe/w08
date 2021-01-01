import Series from './Series';

export default interface SeriesDataContainer {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: Array<Series>;
}
