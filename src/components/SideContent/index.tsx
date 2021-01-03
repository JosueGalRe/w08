import { ReactNode } from 'react';
import './SideContent.scss';

type SideContainerTypes = {
  children: ReactNode;
};

const SideContainer = ({ children }: SideContainerTypes) => {
  return (
    <div className='side__content'>
      <p className='side__content-title'>Last added games</p>
      <div className='side__content-wrapper'>{children}</div>
    </div>
  );
};

export default SideContainer;
