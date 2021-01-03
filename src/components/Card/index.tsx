import { Link } from 'react-router-dom';
import './Card.scss';
import { createPath, ROUTE } from 'utils/Routing';
import Image from 'interfaces/common/Image';

type CardProps = {
  image: Image;
  title: string;
  id: number;
};

const Card = ({ image, title, id }: CardProps) => {
  const imageURL = !image.path.includes('image_not_available')
    ? `${image.path}.${image.extension}`
    : 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/clean.jpg';

  return (
    <div className='side__content-card'>
      <Link to={createPath({ path: ROUTE.COMIC, params: { id } })}>
        <div className='card__content'>
          <img src={imageURL} alt='' srcSet='' className='post__image' />
          <div className='gradient' />
          <p className='side__content-card-title'>{title}</p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
