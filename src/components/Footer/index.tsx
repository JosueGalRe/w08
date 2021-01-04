import { memo } from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <div className='footer__wrapper'>
      <div className='footer'>
        <p className='footer__title'>
          <span className='header__title'>Marvel Entertainment, LLC,</span> a wholly-owned subsidiary of The Walt Disney
          Company, is one of the world&apos;s most prominent character-based entertainment companies, built on a proven library
          of more than 8,000 characters featured in a variety of media over seventy-five years. Marvel utilizes its character
          franchises in entertainment, licensing and publishing. For more information visit{' '}
          <a href='http://marvel.com' target='_blank' rel='noreferrer'>
            marvel.com
          </a>
          .
        </p>
        <div className='footer__social-networks'>
          <a href='https://www.facebook.com/marvel' target='_blank' rel='noreferrer'>
            <i className='bx bxl-facebook-circle' />
          </a>
          <a href='https://twitter.com/marvel' target='_blank' rel='noreferrer'>
            <i className='bx bxl-twitter' />
          </a>
          <a href='https://www.instagram.com/marvel' target='_blank' rel='noreferrer'>
            <i className='bx bxl-instagram' />
          </a>
        </div>
        <p className='footer-copyright'>©2021 MARVEL.</p>
      </div>
    </div>
  );
};

export default memo(Footer);
