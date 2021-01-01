import SeriesDataContainer from './SeriesDataContainer';

export default interface SeriesDataWrapper {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  data: SeriesDataContainer;
  etag: string;
}
