import CharacterList from 'interfaces/common/CharacterList';
import ComicList from 'interfaces/common/ComicList';
import ComicSummary from 'interfaces/common/ComicSummary';
import CreatorList from 'interfaces/common/CreatorList';
import EventList from 'interfaces/common/EventList';
import Image from 'interfaces/common/Image';
import SeriesList from 'interfaces/common/SeriesList';

export default interface Story {
  id: number;
  title: string;
  description: string;
  resourceURI: string;
  type: string;
  modified: Date;
  thumbnail: Image;
  comics: ComicList;
  series: SeriesList;
  events: EventList;
  characters: CharacterList;
  creators: CreatorList;
  originalissue: ComicSummary;
}
