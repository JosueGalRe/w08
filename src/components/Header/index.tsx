import { memo } from 'react';
import { Link } from 'react-router-dom';
import { createPath, ROUTE } from 'utils/Routing';
import logo from 'assets/marvel.svg';
import './Header.scss';

const Header = () => {
  return (
    <div className='header__container'>
      <Link type='button' className='header__title' to={ROUTE.HOME}>
        <img src={logo} alt='Marvel logo' />
      </Link>
      <Link type='button' className='header__title' to={createPath({ path: ROUTE.CHARACTERS, params: { page: 1 } })}>
        <p>Characters</p>
      </Link>
      <Link type='button' className='header__title' to={createPath({ path: ROUTE.COMICS, params: { page: 1 } })}>
        <p>Comics</p>
      </Link>
      <Link type='button' className='header__title' to={createPath({ path: ROUTE.STORIES, params: { page: 1 } })}>
        <p>Stories</p>
      </Link>
    </div>
  );
};

export default memo(Header);
