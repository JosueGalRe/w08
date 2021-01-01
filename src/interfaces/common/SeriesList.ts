import SeriesSummary from './SeriesSummary';

export default interface SeriesList {
  available: number;
  returned: number;
  collectionURI: string;
  items: Array<SeriesSummary>;
}
