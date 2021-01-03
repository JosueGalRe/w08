import { memo } from 'react';
import ReactDOM from 'react-dom';
import './Loading.scss';

function Loading() {
  return ReactDOM.createPortal(
    <div className='loading'>
      <p className='loading__text'>Loading data...</p>
      <div className='spinner'>
        <div className='bounce1' />
        <div className='bounce2' />
        <div className='bounce3' />
      </div>
    </div>,
    document.getElementById('modal')!
  );
}

export default memo(Loading);
