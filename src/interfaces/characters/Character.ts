import ComicList from 'interfaces/common/ComicList';
import EventList from 'interfaces/common/EventList';
import Image from 'interfaces/common/Image';
import SeriesList from 'interfaces/common/SeriesList';
import StoryList from 'interfaces/common/StoryList';
import Url from 'interfaces/common/Url';

export default interface Character {
  id: number;
  name: string;
  description: string;
  modified: Date;
  resourceURI: string;
  urls: Array<Url>;
  thumbnail: Image;
  comics: ComicList;
  stories: StoryList;
  events: EventList;
  series: SeriesList;
}
