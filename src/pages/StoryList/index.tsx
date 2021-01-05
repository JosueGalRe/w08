import React, { useEffect, useState } from 'react';
import { createPath, ROUTE } from 'utils/Routing';
import { useHistory, useParams } from 'react-router-dom';
import useFetch from 'hooks/useFetch';
import Loading from 'components/Loading/';
import Card from 'components/Card/';
import Modal from 'components/Modal/';
import Pagination from 'react-js-pagination';
import API_ENDPOINTS, { urlParams } from 'utils/API_ENDPOINTS';
import StoryDataWrapper from 'interfaces/stories/StoryDataWrapper';
import Story from 'interfaces/stories/Story';
import './StoryList.scss';
import { MarvelActionList } from 'interfaces/reducers/MarvelActionsInterfaces';
import { useDataContext } from 'context/DataContext';
import Calendar from 'components/Calendar';

const StoryList = () => {
  const [isOpen, setIsOpen] = useState(true);
  const history = useHistory();
  const { page }: { page: string } = useParams();
  const { state, dispatch } = useDataContext();

  const limit = 20;
  const offset = Number.parseInt(page, 10) * limit - limit;

  const windowSearch = window.location.search.substring(1);
  let apiParams: urlParams | null = null;

  if (windowSearch) {
    const urlParams = windowSearch.split('&');

    urlParams.map((param) => {
      if (param.includes('modifiedSince=')) {
        const modifiedSince = param.split('=')[1];
        apiParams = { ...apiParams, modifiedSince };
      }

      apiParams = { ...apiParams, limit, offset };
      return true;
    });
  }

  const initialParams = {
    offset,
    limit,
    orderBy: 'id',
  };

  const defaultParams: urlParams = apiParams || initialParams;

  const [params, setParams] = useState(defaultParams);

  const [response, error, loading] = useFetch<StoryDataWrapper>({
    url: API_ENDPOINTS.STORIES(params),
  });

  useEffect(() => {
    if (response) {
      dispatch({ type: MarvelActionList.SET_DATA, payload: { data: response } });
    }
  }, [response, dispatch, params]);

  const redirect = (data: urlParams, page: number) => {
    setParams({ ...data, offset: page * limit - limit });
    const customParams: string[] = [];
    Object.entries(data).forEach(
      ([name, value]) => name !== 'offset' && name !== 'limit' && value !== undefined && customParams.push(`${name}=${value}`)
    );

    history.push(`${createPath({ path: ROUTE.STORIES, params: { page } })}?${customParams.join('&')}`);
  };

  const searchFunction = ({ modifiedSince }: urlParams) => {
    let savedParams: urlParams = { ...params };

    if (modifiedSince) {
      if (modifiedSince !== 'reset') {
        setParams({ ...params, modifiedSince });
        savedParams = { ...savedParams, modifiedSince };
      } else {
        delete params.modifiedSince;
        setParams(initialParams);
        redirect(params, 1);
      }
    }

    return redirect(savedParams, 1);
  };

  if (error.error) {
    return <Modal open={isOpen} info={error.body} type='error' onClose={() => setIsOpen(false)} />;
  }

  const stateData: StoryDataWrapper = state?.data ? JSON.parse(state.data) : null;

  return (
    <>
      {loading && <Loading />}
      <div className='list__wrapper-params'>
        <p className='list__title'>Total stories: {stateData?.data?.total ?? 0}</p>
        <Calendar input={searchFunction} />
      </div>
      {stateData?.data?.results?.length ? (
        <>
          <div className='game-list__wrapper'>
            {stateData.data.results.map((result: Story) => {
              return <Card id={result.id} image={result.thumbnail} title={result.title} key={result.id} route={ROUTE.STORIE} />;
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
            getPageUrl={(pageNumber) => createPath({ path: ROUTE.STORIES, params: { page: pageNumber } })}
            totalItemsCount={stateData.data.total}
            pageRangeDisplayed={10}
            onChange={(pageNumber) => redirect(params, pageNumber)}
          />
        </>
      ) : (
        <div className='no-results'>
          <p>No results found.</p>
          <button
            type='button'
            className='params__date-picker-button'
            onClick={() => searchFunction({ modifiedSince: 'reset' })}
          >
            Reset
          </button>
        </div>
      )}
    </>
  );
};

export default React.memo(StoryList);
