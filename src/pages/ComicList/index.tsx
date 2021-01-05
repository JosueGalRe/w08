import React, { useEffect, useState } from 'react';
import { createPath, ROUTE } from 'utils/Routing';
import { useHistory, useParams } from 'react-router-dom';
import useFetch from 'hooks/useFetch';
import Loading from 'components/Loading/';
import Card from 'components/Card/';
import Modal from 'components/Modal/';
import Pagination from 'react-js-pagination';
import ComicDataWrapper from 'interfaces/comics/ComicDataWrapper';
import { Comic } from 'interfaces/comics/Comic';
import './ComicList.scss';
import API_ENDPOINTS, { Format, urlParams } from 'utils/API_ENDPOINTS';
import { MarvelActionList } from 'interfaces/reducers/MarvelActionsInterfaces';
import { useDataContext } from 'context/DataContext';
import Select from 'components/Select';
import Search from 'components/Search';

const ComicList = () => {
  const [isOpen, setIsOpen] = useState(true);
  const history = useHistory();
  const { page }: { page: string } = useParams();
  const fixedPage = Number.parseInt(page, 10);
  const { state, dispatch } = useDataContext();

  const limit = 20;
  const offset = Number.parseInt(page, 10) * limit - limit;

  const windowSearch = window.location.search.substring(1);
  let apiParams: urlParams | null = null;

  if (windowSearch) {
    const urlParams = windowSearch.split('&');

    urlParams.map((param) => {
      if (param.includes('format=')) {
        const format = param.split('=')[1];
        apiParams = { ...apiParams, format };
      }

      if (param.includes('title=')) {
        const title = param.split('=')[1];
        if (title !== undefined) {
          apiParams = { ...apiParams, title };
        }
      }

      apiParams = { ...apiParams, limit, offset };
      return true;
    });
  }

  const initialParams = {
    offset,
    limit,
    format: 'comic',
    orderBy: 'title',
  };

  const defaultParams: urlParams = apiParams || initialParams;

  const [params, setParams] = useState(defaultParams);

  const [response, error, loading] = useFetch<ComicDataWrapper>({
    url: API_ENDPOINTS.COMICS(params),
  });

  const redirect = (data: urlParams, page: number) => {
    setParams({ ...data, offset: page * limit - limit });
    const customParams: string[] = [];
    Object.entries(data).forEach(
      ([name, value]) => name !== 'offset' && name !== 'limit' && value !== undefined && customParams.push(`${name}=${value}`)
    );

    history.push(`${createPath({ path: ROUTE.COMICS, params: { page } })}?${customParams.join('&')}`);
  };

  const searchFunction = ({ title, format }: urlParams) => {
    let savedParams: urlParams = { ...params };
    if (title !== null || title !== undefined) {
      setParams({ ...params, title });
      savedParams = { ...savedParams, title };
    }

    if (format) {
      setParams({ ...params, format });
      savedParams = { ...savedParams, format };
    }
    return redirect(savedParams, 1);
  };

  useEffect(() => {
    if (response) {
      dispatch({ type: MarvelActionList.SET_DATA, payload: { data: response } });
    }
  }, [response, dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (error.error) {
    return <Modal open={isOpen} info={error.body} type='error' onClose={() => setIsOpen(false)} />;
  }

  const formatList = Object.entries(Format).map(([, value], index) => {
    return { id: index, title: value };
  });

  const stateData: ComicDataWrapper = state?.data ? JSON.parse(state.data) : null;

  const cleanFunction = (complete: boolean) => {
    delete params.title;
    if (complete) {
      delete params.format;
      setParams(initialParams);
    }
    redirect(params, 1);
  };

  return (
    <>
      {loading && <Loading />}
      <div className='list__wrapper-params'>
        <div className='list__title'>
          <p>Total characters: {stateData?.data?.total ?? 0}</p>
          <button type='button' className='params__date-picker-button accept' onClick={() => cleanFunction(true)}>
            Reset
          </button>
        </div>
        <Search input={searchFunction} cleaning={() => cleanFunction(false)} />
        <Select
          info={{ name: 'Filter by format:', icon: 'bx bx-menu-alt-left', type: 'title' }}
          list={formatList}
          setParams={searchFunction}
        />
      </div>
      {stateData.data.results.length ? (
        <>
          <div className='game-list__wrapper'>
            {stateData.data.results.map((result: Comic) => {
              return <Card id={result.id} image={result.thumbnail} title={result.title} key={result.id} route={ROUTE.COMIC} />;
            })}
          </div>
          <Pagination
            innerClass='pagination'
            activeClass='active'
            prevPageText='<'
            nextPageText='>'
            firstPageText='<<'
            lastPageText='>>'
            activePage={fixedPage}
            itemsCountPerPage={limit}
            getPageUrl={(pageNumber) => createPath({ path: ROUTE.COMICS, params: { page: pageNumber } })}
            totalItemsCount={stateData.data.total}
            pageRangeDisplayed={10}
            onChange={(pageNumber) => redirect(params, pageNumber)}
          />
        </>
      ) : (
        <div className='no-results'>
          <p>No results found.</p>
          <button type='button' className='params__date-picker-button' onClick={() => cleanFunction(true)}>
            Reset
          </button>
        </div>
      )}
    </>
  );
};

export default React.memo(ComicList);
