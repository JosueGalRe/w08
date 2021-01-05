/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { createPath, ROUTE } from 'utils/Routing';
import useFetch from 'hooks/useFetch';
import API_ENDPOINTS from 'utils/API_ENDPOINTS';
import Loading from 'components/Loading/';
import Modal from 'components/Modal/';
import ComicDataWrapper from 'interfaces/comics/ComicDataWrapper';
import CreatorSummary from 'interfaces/common/CreatorSummary';
import { decamelize, toTitleCase } from 'utils/utils';
import { MarvelActionList } from 'interfaces/reducers/MarvelActionsInterfaces';
import { Comic } from 'interfaces/comics/Comic';
import { useDataContext } from 'context/DataContext';

const ComicPage = () => {
  const [isOpen, setIsOpen] = useState(true);

  const { id }: { id: string } = useParams();
  const { state, dispatch } = useDataContext();
  const filteredID: number = Number.isNaN(Number.parseInt(id, 10)) ? 0 : Number.parseInt(id, 10);

  const [response, error, loading] = useFetch<ComicDataWrapper>({
    url: API_ENDPOINTS.COMICS({ id: filteredID }),
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

  const selectedData: Comic = state?.selected ? JSON.parse(state.selected)?.data.results[0] : null;

  const imageURL =
    selectedData &&
    `${selectedData.thumbnail.path}${
      !selectedData.thumbnail.path.includes('image_not_available') ? `.${selectedData.thumbnail.extension}` : '/clean.jpg'
    }`;

  return (
    <>
      {selectedData && (
        <div className='information__wrapper'>
          <div className='information__container'>
            <div className='information__header'>
              <div className='information__background' style={{ backgroundImage: `url(${imageURL})` }} />
              <img src={imageURL} alt={selectedData.title} className='information__image' />
              <div className='gradient' />
              <div className='information__header-info'>
                <p className='information__title'>{selectedData.title}</p>
              </div>
            </div>

            <div className='information__content-wrapper'>
              <p className='information__field'>
                <span className='information__data'>
                  <b>Published:</b> {new Date(selectedData.dates[0].date).toUTCString().slice(0, 16)}
                </span>
              </p>
              <p className='information__field'>
                Format: <span className='information__data'>{selectedData.format.trim() || 'No format provided.'}</span>
              </p>
              <p className='information__field'>
                Description:
                <span className='information__data'> {selectedData.description ?? 'No description provided.'}</span>
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
                <span className='information__wrapper-title'>Prices:</span>
                {selectedData.prices.length ? (
                  selectedData.prices.map((price, index) => {
                    return (
                      <span className='information__rol' key={index}>
                        <b>{toTitleCase(decamelize(price.type, ' '))}: $</b>
                        {price.price ?? 'No price provided'}
                      </span>
                    );
                  })
                ) : (
                  <span className='information__rol span2'>
                    <b>No prices provided.</b>
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
                <span className='information__wrapper-title'>Stories:</span>
                {selectedData.stories.items.length ? (
                  selectedData.stories.items.map((story, index) => {
                    return (
                      <a
                        key={story.name + index}
                        href={createPath({
                          path: ROUTE.STORIE,
                          params: { id: story.resourceURI.match(/\/([0-9]+)/)?.[1] as string },
                        })}
                        className='information__link'
                      >
                        <p>{toTitleCase(decamelize(story.name, ' '))}</p>
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
