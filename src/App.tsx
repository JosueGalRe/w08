import MarvelComicsContext from 'context/MarvelComicsContext';
import React, { Suspense, useReducer } from 'react';
import { Switch } from 'react-router';
import { ROUTE } from 'utils/Routing';
import { MarvelComicsInitialState, MarvelComicsReducer } from 'reducers/MarvelComicsReducer';
import Loading from 'components/Loading';
import HeaderRoute from 'components/HeaderRoute';

const Home = React.lazy(() => import('pages/HomePage'));
const List = React.lazy(() => import('pages/List'));

const App = () => {
  const [state, dispatch] = useReducer(MarvelComicsReducer, MarvelComicsInitialState);

  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <HeaderRoute path={ROUTE.COMICS}>
          <MarvelComicsContext.Provider value={{ state, dispatch }}>
            <List />
          </MarvelComicsContext.Provider>
        </HeaderRoute>
        <HeaderRoute path={ROUTE.HOME} exact>
          <MarvelComicsContext.Provider value={{ state, dispatch }}>
            <Home />
          </MarvelComicsContext.Provider>
        </HeaderRoute>
      </Switch>
    </Suspense>
  );
};

export default App;
