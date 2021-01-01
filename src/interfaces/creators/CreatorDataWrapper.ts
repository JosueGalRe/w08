import CreatorDataContainer from './CreatorDataContainer';

export default interface CreatorDataWrapper {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  data: CreatorDataContainer;
  etag: string;
}
