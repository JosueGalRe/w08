import Character from './Character';

export default interface CharacterDataContainer {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: Array<Character>;
}
