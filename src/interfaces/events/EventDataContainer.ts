import Event from './Event';

export default interface EventDataContainer {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: Array<Event>;
}
