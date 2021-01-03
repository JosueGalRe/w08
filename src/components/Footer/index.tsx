import { memo } from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <div className='footer__wrapper'>
      <div className='footer'>
        <p className='footer__title'>
          <span className='header__title'>Videogames Nation</span> is your trusted source of videogames news.
        </p>
        <div className='footer__social-networks'>
          <a href='https://www.facebook.com' target='_blank' rel='noreferrer'>
            <i className='bx bxl-facebook-circle' />
          </a>
          <a href='https://twitter.com' target='_blank' rel='noreferrer'>
            <i className='bx bxl-twitter' />
          </a>
          <a href='https://www.instagram.com' target='_blank' rel='noreferrer'>
            <i className='bx bxl-instagram' />
          </a>
        </div>
        <p className='footer-copyright'>©2020 All rights reserved.</p>
      </div>
    </div>
  );
};

export default memo(Footer);
