import React, { useEffect, useState } from 'react';
import { createPath, ROUTE } from 'utils/Routing';
import { useHistory, useParams } from 'react-router-dom';
import useFetch from 'hooks/useFetch';
import Loading from 'components/Loading/';
import Card from 'components/Card/';
import Modal from 'components/Modal/';
import Pagination from 'react-js-pagination';
import API_ENDPOINTS from 'utils/API_ENDPOINTS';
import ComicDataWrapper from 'interfaces/comics/ComicDataWrapper';
import { useMarvelContext } from 'context/MarvelComicsContext';
import { MarvelComicsActionList } from 'interfaces/reducers/MarvelComicsInterfaces';
import { Comic } from 'interfaces/comics/Comic';
import './List.scss';

const GameListPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const history = useHistory();
  const { page }: { page: string } = useParams();
  const { state, dispatch } = useMarvelContext();

  const limit = 20;
  const offset = Number.parseInt(page, 10) * limit - limit;

  const [response, error, loading] = useFetch<ComicDataWrapper>({
    url: API_ENDPOINTS.COMICS({ offset, limit }),
  });

  useEffect(() => {
    if (response) {
      dispatch({ type: MarvelComicsActionList.SET_COMICS, payload: { data: response } });
    }
  }, [response, dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (error.error) {
    return <Modal open={isOpen} info={error.body} type='error' onClose={() => setIsOpen(false)} />;
  }

  return (
    <>
      {loading && <Loading />}
      {state?.data && (
        <>
          <div className='game-list__wrapper'>
            {state?.data?.data.results.map((result: Comic) => {
              return <Card id={result.id} image={result.thumbnail} title={result.title} key={result.id} />;
            })}
          </div>
          <Pagination
            innerClass='pagination'
            activeClass='active'
            prevPageText='<'
            nextPageText='>'
            firstPageText='<<'
            lastPageText='>>'
            activePage={Number.parseInt(page, 10)}
            itemsCountPerPage={limit}
            getPageUrl={(pageNumber) => createPath({ path: ROUTE.COMICS, params: { page: pageNumber } })}
            totalItemsCount={state?.data.data.total}
            pageRangeDisplayed={10}
            onChange={(pageNumber) => history.push(createPath({ path: ROUTE.COMICS, params: { page: pageNumber } }))}
          />
        </>
      )}
    </>
  );
};

export default React.memo(GameListPage);
