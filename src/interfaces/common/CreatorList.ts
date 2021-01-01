import CreatorSummary from './CreatorSummary';

export default interface CreatorList {
  available: number;
  returned: number;
  collectionURI: string;
  items: Array<CreatorSummary>;
}
