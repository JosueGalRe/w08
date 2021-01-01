import StoryDataContainer from './StoryDataContainer';

export default interface StoryDataWrapper {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  data: StoryDataContainer;
  etag: string;
}
