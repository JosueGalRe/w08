/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPath, ROUTE } from 'utils/Routing';
import Image from 'interfaces/common/Image';
import './Card.scss';
import savedData from 'interfaces/common/SavedData';

type CardProps = {
  image: Image;
  title: string;
  id: number;
  route: ROUTE;
};

const Card = ({ image, title, id, route }: CardProps) => {
  const name = route.match(/\/([a-z]+)\/:id/)?.[1] || '';

  const savedFavorites = localStorage.getItem(`${name}Favorites`) || '[]';
  let favorites: savedData[] = JSON.parse(savedFavorites);

  const savedHidden = localStorage.getItem(`${name}Hidden`) || '[]';
  let hidden: number[] = JSON.parse(savedHidden);

  const [isFavorite, setIsFavorite] = useState(savedFavorites.includes(`"id":${id}`));
  const [isHidden, setIsHidden] = useState(hidden.includes(id));

  const [isOpen, setIsOpen] = useState(false);

  const imageURL = image
    ? `${image.path}${!image.path.includes('image_not_available') ? `.${image.extension}` : '/clean.jpg'}`
    : 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/clean.jpg';

  const handlefavorites = () => {
    if (isFavorite) {
      favorites = favorites.filter((favorite) => id !== favorite.id);
    } else {
      favorites.push({
        image,
        title,
        id,
        route,
      });
    }

    setIsFavorite(favorites.findIndex((favorites) => favorites.id === id) !== -1);
    localStorage.setItem(`${name}Favorites`, JSON.stringify(favorites));
    setIsOpen(false);
  };

  const handleHidden = () => {
    if (isHidden) {
      hidden = hidden.filter((eid) => eid !== id);
    } else {
      hidden.push(id);
    }

    if (isFavorite) {
      favorites = favorites.filter((favorite) => id !== favorite.id);
    }

    setIsFavorite(favorites.findIndex((favorites) => favorites.id === id) !== -1);
    setIsHidden(hidden.findIndex((eid) => eid === id) !== -1);

    localStorage.setItem(`${name}Favorites`, JSON.stringify(favorites));
    localStorage.setItem(`${name}Hidden`, JSON.stringify(hidden));
    setIsOpen(false);
  };

  return !isHidden ? (
    <div className='side__content-card'>
      <button
        className={`post__options${isOpen ? ' active' : ''}`}
        onClick={() => setIsOpen((prevState) => !prevState)}
        type='button'
      >
        <i className='bx bx-dots-vertical-rounded' />
      </button>
      {isOpen && (
        <div className='options__wrapper'>
          <button type='button' onClick={handlefavorites} className='option edit'>
            <i className='bx bxs-heart' /> {!isFavorite ? <span>Add to favorites</span> : <span>Remove from favorites</span>}
          </button>
          <button type='button' onClick={handleHidden} className='option delete'>
            <i className='bx bx-x' /> <span>Hide</span>
          </button>
        </div>
      )}
      <Link to={createPath({ path: route, params: { id } })}>
        <div className='card__content'>
          <div className='game-information__background' style={{ backgroundImage: `url(${imageURL})` }} />
          <img src={imageURL} alt='' srcSet='' className='post__image' />
          <div className='gradient' />
          <p className='side__content-card-title'>{title}</p>
        </div>
      </Link>
    </div>
  ) : null;
};

export default Card;
