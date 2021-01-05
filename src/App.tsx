import React, { Suspense, useReducer } from 'react';
import { Switch } from 'react-router';
import { ROUTE } from 'utils/Routing';
import { MarvelContextInitialState, MarvelContextReducer } from 'reducers/MarvelContextReducer';
import Loading from 'components/Loading';
import FullWrapperRoute from 'components/FullWrapperRoute';
import HeaderOnlyRoute from 'components/HeaderOnlyRoute';
import DataContext from 'context/DataContext';

const Home = React.lazy(() => import('pages/HomePage'));
const ComicList = React.lazy(() => import('pages/ComicList'));
const CharacterList = React.lazy(() => import('pages/CharacterList'));
const StoryList = React.lazy(() => import('pages/StoryList'));
const ComicPage = React.lazy(() => import('pages/ComicPage'));
const CharacterPage = React.lazy(() => import('pages/CharacterPage'));
const StoryPage = React.lazy(() => import('pages/StoryPage'));
const Bookmarks = React.lazy(() => import('pages/Bookmarks'));

const App = () => {
  const [state, dispatch] = useReducer(MarvelContextReducer, MarvelContextInitialState);

  const dataContext = {
    state,
    dispatch,
  };

  return (
    <DataContext.Provider value={dataContext}>
      <Suspense fallback={<Loading />}>
        <Switch>
          <HeaderOnlyRoute path={ROUTE.BOOKMARKS}>
            <Bookmarks />
          </HeaderOnlyRoute>
          <FullWrapperRoute path={ROUTE.STORIE}>
            <StoryPage />
          </FullWrapperRoute>
          <FullWrapperRoute path={ROUTE.CHARACTER}>
            <CharacterPage />
          </FullWrapperRoute>
          <FullWrapperRoute path={ROUTE.COMIC}>
            <ComicPage />
          </FullWrapperRoute>
          <FullWrapperRoute path={ROUTE.STORIES}>
            <StoryList />
          </FullWrapperRoute>
          <FullWrapperRoute path={ROUTE.CHARACTERS}>
            <CharacterList />
          </FullWrapperRoute>
          <FullWrapperRoute path={ROUTE.COMICS}>
            <ComicList />
          </FullWrapperRoute>
          <FullWrapperRoute path={ROUTE.HOME} exact>
            <Home />
          </FullWrapperRoute>
        </Switch>
      </Suspense>
    </DataContext.Provider>
  );
};

export default App;
