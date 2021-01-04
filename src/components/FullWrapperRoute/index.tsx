/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { Route } from 'react-router-dom';
import Container from 'components/Container';
import Header from 'components/Header';
import Footer from 'components/Footer';

const FullWrapperRoute = ({ component: Component, ...rest }: any) => {
  return (
    <>
      <Header />
      <Container>
        <Route
          {...rest}
          render={() => {
            <Component />;
          }}
        />
      </Container>
      <Footer />
    </>
  );
};

export default FullWrapperRoute;
