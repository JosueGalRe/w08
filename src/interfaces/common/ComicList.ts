import ComicSummary from './ComicSummary';

export default interface ComicList {
  available: number;
  returned: number;
  collectionURI: string;
  items: Array<ComicSummary>;
}
