import { memo } from 'react';
import BackgroundImage from 'assets/marvel_background.jpg';
import './MainContent.scss';

const MainContent = () => {
  return (
    <div className='main__content'>
      <img src={BackgroundImage} alt='Main Background' className='background__image' />
      <div className='gradient' />
      <div className='main__content-text'>
        <p className='main__content-title'>Welcome to Marvel Comics</p>
        <p className='main__content-description'>Search all Marvel Comics, Characters & Stories</p>
      </div>
    </div>
  );
};

export default memo(MainContent);
