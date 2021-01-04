/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { createPath, ROUTE } from 'utils/Routing';
import useFetch from 'hooks/useFetch';
import API_ENDPOINTS from 'utils/API_ENDPOINTS';
import Loading from 'components/Loading/';
import Modal from 'components/Modal/';
import CreatorSummary from 'interfaces/common/CreatorSummary';
import { decamelize, toTitleCase } from 'utils/utils';
import StoryDataWrapper from 'interfaces/stories/StoryDataWrapper';
import { MarvelActionList } from 'interfaces/reducers/MarvelActionsInterfaces';
import { useDataContext } from 'context/DataContext';
import Story from 'interfaces/stories/Story';

const ComicPage = () => {
  const [isOpen, setIsOpen] = useState(true);

  const { id }: { id: string } = useParams();
  const { state, dispatch } = useDataContext();
  const filteredID: number = Number.isNaN(Number.parseInt(id, 10)) ? 0 : Number.parseInt(id, 10);

  const [response, error, loading] = useFetch<StoryDataWrapper>({
    url: API_ENDPOINTS.STORIES({ id: filteredID }),
  });

  useEffect(() => {
    if (response) {
      dispatch({ type: MarvelActionList.SET_SELECTED_DATA, payload: { data: response } });
    }
  }, [response, dispatch, filteredID]);

  if (loading) {
    return <Loading />;
  }

  if (error.error) {
    const errorHandler = () => {
      setIsOpen(false);
      return <Redirect to={createPath({ path: ROUTE.HOME })} push />;
    };
    return <Modal open={isOpen} info={error.body || `Failed to fetch data with that ID`} type='error' onClose={errorHandler} />;
  }

  const selectedData: Story = state?.selected ? JSON.parse(state.selected)?.data.results[0] : null;

  return (
    <>
      {selectedData && (
        <div className='information__wrapper'>
          <div className='information__container'>
            <div className='information__content-wrapper'>
              <p className='information__title'>{selectedData.title}</p>
              <p className='information__field'>
                Description:
                <span className='information__data'> {selectedData.description.trim() || 'No description provided.'}</span>
              </p>

              <div className='information__wrapper'>
                <span className='information__wrapper-title'>Creators:</span>
                {selectedData.creators.items.length ? (
                  selectedData.creators.items.map((creator: CreatorSummary, index) => {
                    return (
                      <p key={creator.role + index} className='information__rol'>
                        <b>{toTitleCase(creator.role)}: </b>
                        {creator.name}
                      </p>
                    );
                  })
                ) : (
                  <span className='information__rol span2'>
                    <b>No creators provided.</b>
                  </span>
                )}
              </div>

              <div className='information__wrapper'>
                <span className='information__wrapper-title'>Series:</span>
                {selectedData.comics.items.length ? (
                  selectedData.series.items.map((serie, index) => {
                    return (
                      <p key={serie.name + index} className='information__rol'>
                        {toTitleCase(decamelize(serie.name, ' '))}
                      </p>
                    );
                  })
                ) : (
                  <span className='information__rol span2'>
                    <b>No series provided.</b>
                  </span>
                )}
              </div>

              <div className='information__wrapper'>
                <span className='information__wrapper-title'>Characters:</span>
                {selectedData.characters.items.length ? (
                  selectedData.characters.items?.map((character, index) => {
                    return (
                      <a
                        key={character.name + index}
                        href={createPath({
                          path: ROUTE.CHARACTER,
                          params: { id: character.resourceURI.match(/\/([0-9]+)/)?.[1] as string },
                        })}
                        className='information__link'
                      >
                        {toTitleCase(decamelize(character.name, ' '))}
                      </a>
                    );
                  })
                ) : (
                  <span className='information__rol span2'>
                    <b>No characters provided.</b>
                  </span>
                )}
              </div>

              <div className='information__wrapper'>
                <span className='information__wrapper-title'>In Comics:</span>
                {selectedData.comics.items.length ? (
                  selectedData.comics.items.map((comic, index) => {
                    return (
                      <a
                        key={comic.name + index}
                        href={createPath({
                          path: ROUTE.COMIC,
                          params: { id: comic.resourceURI.match(/\/([0-9]+)/)?.[1] as string },
                        })}
                        className='information__link'
                      >
                        {toTitleCase(decamelize(comic.name, ' '))}
                      </a>
                    );
                  })
                ) : (
                  <span className='information__rol span2'>
                    <b>No stories provided.</b>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(ComicPage);
