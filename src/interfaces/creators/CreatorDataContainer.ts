import Creator from './Creator';

export default interface CreatorDataContainer {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: Array<Creator>;
}
