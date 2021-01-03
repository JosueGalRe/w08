import './MainContent.scss';
import BackgroundImage from 'assets/marvel.svg';
import { memo } from 'react';

const MainContent = () => {
  return (
    <div className='main__content'>
      <img src={BackgroundImage} alt='Main Background' className='post__image' />
      <div className='gradient' />
      <div className='main__content-text'>
        <p className='main__content-title'>Welcome to Marvel Comics</p>
        <p className='main__content-description'>Search all Marvel Comics, Characters & Stories</p>
      </div>
    </div>
  );
};

export default memo(MainContent);
