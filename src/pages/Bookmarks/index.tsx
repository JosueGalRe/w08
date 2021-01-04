import Card from 'components/Card';
import Modal from 'components/Modal';
import savedData from 'interfaces/common/SavedData';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { createPath, ROUTE } from 'utils/Routing';
import './Bookmarks.scss';

const Bookmarks = () => {
  const history = useHistory();
  const [, setIsOpen] = useState(true);

  const comicFavorites = localStorage.getItem('comicFavorites') || '[]';
  const comicFavoritesArray: savedData[] = JSON.parse(comicFavorites);

  const charactersFavorites = localStorage.getItem('characterFavorites') || '[]';
  const charactersFavoritesArray: savedData[] = JSON.parse(charactersFavorites);

  const storyFavorites = localStorage.getItem('storieFavorites') || '[]';
  const storyFavoritesArray: savedData[] = JSON.parse(storyFavorites);

  const cleanHiddenItems = () => {
    const onClose = () => {
      ['comic', 'character', 'storie'].forEach((value) => {
        localStorage.setItem(`${value}Hidden`, '[]');
      });
      setIsOpen(false);
      history.push(createPath({ path: ROUTE.BOOKMARKS }));
      return true;
    };
    return <Modal open info='Are you sure you want to reset the hidden items?' type='info' onClose={onClose} />;
  };

  const cleanFavorites = (type: string) => {
    const onClose = () => {
      localStorage.setItem(`${type}Favorites`, '[]');
      setIsOpen(false);
      history.push(createPath({ path: ROUTE.BOOKMARKS }));
      return true;
    };
    return <Modal open info={`Are you sure you want to reset your favorite ${type}?`} type='info' onClose={onClose} />;
  };

  return (
    <div className='bookmarks__wrapper'>
      <p className='bookmarks__title'>My bookmarks</p>

      <div className='bookmarks__container'>
        <div className='bookmarks__header'>
          <p className='bookmarks__sub-title'>Comics</p>
          <button type='button' className='bookmarks-list__button' onClick={() => cleanFavorites('comic')}>
            Delete all favorite comics.
          </button>
        </div>
        <div className='bookmarks-list__wrapper'>
          {comicFavoritesArray.length ? (
            comicFavoritesArray.map((comic) => (
              <Card key={comic.id} id={comic.id} title={comic.title} image={comic.image} route={comic.route} />
            ))
          ) : (
            <div className='bookmarks__not-found-wrapper'>
              <p className='bookmarks__not-found '>You don&apos;t have favorite comics.</p>
              <button
                type='button'
                className='bookmarks-list__button'
                onClick={() => history.push(createPath({ path: ROUTE.COMICS, params: { page: 1 } }))}
              >
                Go to comics
              </button>
            </div>
          )}
        </div>
      </div>

      <div className='bookmarks__container'>
        <div className='bookmarks__header'>
          <p className='bookmarks__sub-title'>Characters</p>
          <button type='button' className='bookmarks-list__button' onClick={() => cleanFavorites('character')}>
            Delete all favorite characters.
          </button>
        </div>
        <div className='bookmarks-list__wrapper'>
          {charactersFavoritesArray.length ? (
            charactersFavoritesArray.map((comic) => (
              <Card key={comic.id} id={comic.id} title={comic.title} image={comic.image} route={comic.route} />
            ))
          ) : (
            <div className='bookmarks__not-found-wrapper'>
              <p className='bookmarks__not-found '>You don&apos;t have favorite characters.</p>
              <button
                type='button'
                className='bookmarks-list__button'
                onClick={() => history.push(createPath({ path: ROUTE.CHARACTERS, params: { page: 1 } }))}
              >
                Go to characters
              </button>
            </div>
          )}
        </div>
      </div>

      <div className='bookmarks__container'>
        <div className='bookmarks__header'>
          <p className='bookmarks__sub-title'>Stories</p>
          <button type='button' className='bookmarks-list__button' onClick={() => cleanFavorites('storie')}>
            Delete all favorite stories.
          </button>
        </div>
        <div className='bookmarks-list__wrapper'>
          {storyFavoritesArray.length ? (
            storyFavoritesArray.map((comic) => (
              <Card key={comic.id} id={comic.id} title={comic.title} image={comic.image} route={comic.route} />
            ))
          ) : (
            <div className='bookmarks__not-found-wrapper'>
              <p className='bookmarks__not-found'>You don&apos;t have favorite stories.</p>
              <button
                type='button'
                className='bookmarks-list__button'
                onClick={() => history.push(createPath({ path: ROUTE.STORIES, params: { page: 1 } }))}
              >
                Go to stories
              </button>
            </div>
          )}
        </div>
      </div>

      <p className='bookmarks__title'>Reset hidden items?</p>
      <button type='button' className='bookmarks-list__button' onClick={cleanHiddenItems}>
        Clean hidden items
      </button>
    </div>
  );
};

export default Bookmarks;
