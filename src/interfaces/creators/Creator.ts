import ComicList from 'interfaces/common/ComicList';
import EventList from 'interfaces/common/EventList';
import Image from 'interfaces/common/Image';
import SeriesList from 'interfaces/common/SeriesList';
import StoryList from 'interfaces/common/StoryList';
import Url from 'interfaces/common/Url';

export default interface Creator {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  fullName: string;
  modified: Date;
  resourceURI: string;
  urls: Array<Url>;
  thumbnail: Image;
  series: SeriesList;
  stories: StoryList;
  comics: ComicList;
  events: EventList;
}
