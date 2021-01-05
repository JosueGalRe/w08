import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDataContext } from 'context/DataContext';
import { createPath, ROUTE } from 'utils/Routing';
import API_ENDPOINTS, { urlParams } from 'utils/API_ENDPOINTS';
import CharacterDataWrapper from 'interfaces/characters/CharacterDataWrapper';
import Character from 'interfaces/characters/Character';
import { MarvelActionList } from 'interfaces/reducers/MarvelActionsInterfaces';
import ComicDataWrapper from 'interfaces/comics/ComicDataWrapper';
import StoryDataWrapper from 'interfaces/stories/StoryDataWrapper';
import Pagination from 'react-js-pagination';
import useFetch from 'hooks/useFetch';
import Loading from 'components/Loading/';
import Card from 'components/Card/';
import Modal from 'components/Modal/';
import Search from 'components/Search';
import Select from 'components/Select';
import './CharacterList.scss';
import ISelect from 'interfaces/common/Select';

const CharacterList = () => {
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
      if (param.includes('name=')) {
        const name = param.split('=')[1];
        if (name.trim()) {
          apiParams = { ...apiParams, name };
        }
      }

      if (param.includes('comics=')) {
        const comics = param.split('=')[1];
        apiParams = { ...apiParams, comics };
      }

      if (param.includes('stories=')) {
        const stories = param.split('=')[1];
        apiParams = { ...apiParams, stories };
      }

      apiParams = { ...apiParams, limit, offset };
      return true;
    });
  }

  const initialParams = {
    offset,
    limit,
    orderBy: 'name',
  };

  const defaultParams: urlParams = apiParams || initialParams;

  const [params, setParams] = useState(defaultParams);

  const [response, error, loading] = useFetch<CharacterDataWrapper>({
    url: API_ENDPOINTS.CHARACTERS(params),
  });

  const [comics, cError, cLoading] = useFetch<ComicDataWrapper>({
    url: API_ENDPOINTS.COMICS(),
  });

  const [stories, sError, sLoading] = useFetch<StoryDataWrapper>({
    url: API_ENDPOINTS.STORIES(),
  });

  useEffect(() => {
    if (response !== null) {
      dispatch({ type: MarvelActionList.SET_DATA, payload: { data: response } });
    }
  }, [response, dispatch]);

  if (loading || sLoading || cLoading) {
    return <Loading />;
  }

  if (sError.error || cError.error || error.error) {
    return (
      <Modal open={isOpen} info={sError.body || cError.body || error.body} type='error' onClose={() => setIsOpen(false)} />
    );
  }

  const stateData: CharacterDataWrapper = state?.data ? JSON.parse(state.data) : null;

  const comicList = comics?.data.results.map((comic) => {
    return { id: comic.id, title: comic.title };
  });

  const storyList = stories?.data.results.map((story) => {
    return { id: story.id, title: story.title };
  });

  const redirect = (data: urlParams, page: number) => {
    setParams({ ...data, offset: page * limit - limit });
    const customParams: string[] = [];
    Object.entries(data).forEach(([name, value]) => {
      if (value) {
        if (name !== 'offset' && name !== 'limit') {
          if (value !== undefined && value !== null) {
            customParams.push(`${name}=${value}`);
          }
        }
      }
    });

    history.push(`${createPath({ path: ROUTE.CHARACTERS, params: { page } })}?${customParams.join('&')}`);
  };

  const searchFunction = ({ name, stories, comics }: urlParams) => {
    let savedParams: urlParams = { ...params };
    if (name) {
      setParams({ ...params, name });
      savedParams = { ...savedParams, name };
    }

    if (stories) {
      setParams({ ...params, stories });
      savedParams = { ...savedParams, stories };
    }

    if (comics) {
      setParams({ ...params, comics });
      savedParams = { ...savedParams, comics };
    }

    return redirect(savedParams, 1);
  };

  const cleanFunction = (complete: boolean) => {
    delete params.name;
    if (complete) {
      delete params.comics;
      delete params.stories;
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
          info={{ name: 'Filter by comics:', icon: 'bx bxs-file-image', type: 'id' }}
          list={comicList as ISelect[]}
          setParams={searchFunction}
        />
        <Select
          info={{ name: 'Filter by stories:', icon: 'bx bxs-file', type: 'id' }}
          list={storyList as ISelect[]}
          setParams={searchFunction}
        />
      </div>
      {stateData.data.results.length ? (
        <>
          <div className='game-list__wrapper'>
            {stateData.data.results.map((result: Character) => {
              return (
                <Card id={result.id} image={result.thumbnail} title={result.name} key={result.id} route={ROUTE.CHARACTER} />
              );
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
            getPageUrl={(pageNumber) => createPath({ path: ROUTE.CHARACTERS, params: { page: pageNumber } })}
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

export default React.memo(CharacterList);
