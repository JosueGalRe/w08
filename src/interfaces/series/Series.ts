import CharacterList from 'interfaces/common/CharacterList';
import ComicList from 'interfaces/common/ComicList';
import CreatorList from 'interfaces/common/CreatorList';
import EventList from 'interfaces/common/EventList';
import Image from 'interfaces/common/Image';
import SeriesSummary from 'interfaces/common/SeriesSummary';
import StoryList from 'interfaces/common/StoryList';
import Url from 'interfaces/common/Url';

export default interface Series {
  id: number;
  title: string;
  description: string;
  resourceURI: string;
  urls: Array<Url>;
  startYear: number;
  endYear: number;
  rating: string;
  modified: Date;
  thumbnail: Image;
  comics: ComicList;
  stories: StoryList;
  events: EventList;
  characters: CharacterList;
  creators: CreatorList;
  next: SeriesSummary;
  previous: SeriesSummary;
}
