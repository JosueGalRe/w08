import { ReactNode } from 'react';
import './Container.scss';

type ContainerTypes = {
  children: ReactNode;
};

const Container = ({ children }: ContainerTypes) => {
  return <div className='container'>{children}</div>;
};

export default Container;
