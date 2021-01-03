import React, { useEffect, useState } from 'react';
import useFetch from 'hooks/useFetch';
import Modal from 'components/Modal';
import Loading from 'components/Loading';
import MainContent from 'components/MainContent';
import { MarvelComicsActionList } from 'interfaces/reducers/MarvelComicsInterfaces';
import API_ENDPOINTS from 'utils/API_ENDPOINTS';
import { useMarvelContext } from 'context/MarvelComicsContext';
import ComicDataWrapper from 'interfaces/comics/ComicDataWrapper';
import SideContent from 'components/SideContent';
import { Comic } from 'interfaces/comics/Comic';
import Card from 'components/Card';

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { state, dispatch } = useMarvelContext();
  const [response, error, isLoading] = useFetch<ComicDataWrapper>({
    url: API_ENDPOINTS.COMICS(),
  });

  useEffect(() => {
    if (response) {
      dispatch({ type: MarvelComicsActionList.SET_COMICS, payload: { data: response } });
    }
  }, [response, dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  if (error.error) {
    return <Modal open={isOpen} info={error.body} type='error' onClose={() => setIsOpen(false)} />;
  }

  return (
    <>
      <MainContent />
      <SideContent>
        {state !== null &&
          state.data?.data.results.map(({ id, thumbnail, title }: Comic) => {
            return <Card id={id} image={thumbnail} title={title} key={id} />;
          })}
      </SideContent>
    </>
  );
};

export default HomePage;
