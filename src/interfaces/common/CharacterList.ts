import CharacterSummary from './CharacterSummary';

export default interface CharacterList {
  available: number;
  returned: number;
  collectionURI: string;
  items: Array<CharacterSummary>;
}
