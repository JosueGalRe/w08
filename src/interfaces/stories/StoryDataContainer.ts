import Story from './Story';

export default interface StoryDataContainer {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: Array<Story>;
}
