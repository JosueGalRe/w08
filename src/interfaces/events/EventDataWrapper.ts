import EventDataContainer from './EventDataContainer';

export default interface EventDataWrapper {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  data: EventDataContainer;
  etag: string;
}
