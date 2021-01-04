import { ROUTE } from 'utils/Routing';
import Image from './Image';

export default interface savedData {
  image: Image;
  title: string;
  id: number;
  route: ROUTE;
}
