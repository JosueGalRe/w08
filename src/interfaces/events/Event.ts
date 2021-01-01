import CharacterList from 'interfaces/common/CharacterList';
import ComicList from 'interfaces/common/ComicList';
import CreatorList from 'interfaces/common/CreatorList';
import EventSummary from 'interfaces/common/EventSummary';
import Image from 'interfaces/common/Image';
import SeriesList from 'interfaces/common/SeriesList';
import StoryList from 'interfaces/common/StoryList';
import Url from 'interfaces/common/Url';

export default interface Event {
  id: number;
  title: string;
  description: string;
  resourceURI: string;
  urls: Array<Url>;
  modified: Date;
  start: Date;
  end: Date;
  thumbnail: Image;
  comics: ComicList;
  stories: StoryList;
  series: SeriesList;
  characters: CharacterList;
  creators: CreatorList;
  next: EventSummary;
  previous: EventSummary;
}
