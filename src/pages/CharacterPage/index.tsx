/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { createPath, ROUTE } from 'utils/Routing';
import useFetch from 'hooks/useFetch';
import API_ENDPOINTS from 'utils/API_ENDPOINTS';
import Loading from 'components/Loading/';
import Modal from 'components/Modal/';
import { decamelize, toTitleCase } from 'utils/utils';
import CharacterDataWrapper from 'interfaces/characters/CharacterDataWrapper';
import ComicSummary from 'interfaces/common/ComicSummary';
import { MarvelActionList } from 'interfaces/reducers/MarvelActionsInterfaces';
import { useDataContext } from 'context/DataContext';
import Character from 'interfaces/characters/Character';

const ComicPage = () => {
  const [isOpen, setIsOpen] = useState(true);

  const { id }: { id: string } = useParams();
  const { state, dispatch } = useDataContext();
  const filteredID: number = Number.isNaN(Number.parseInt(id, 10)) ? 0 : Number.parseInt(id, 10);

  const [response, error, loading] = useFetch<CharacterDataWrapper>({
    url: API_ENDPOINTS.CHARACTERS({ id: filteredID }),
  });

  useEffect(() => {
    if (response !== null) {
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

  const selectedData: Character = state?.selected ? JSON.parse(state.selected)?.data.results[0] : null;

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
              <img src={imageURL} alt={selectedData.name} className='information__image' />
              <div className='gradient' />
              <div className='information__header-info'>
                <p className='information__title'>{selectedData.name}</p>
              </div>
            </div>

            <div className='information__content-wrapper'>
              <p className='information__field'>
                Description:
                <span className='information__data'> {selectedData.description.trim() || 'No description provided.'}</span>
              </p>

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
                <span className='information__wrapper-title'>Comics:</span>
                {selectedData.comics.items.length ? (
                  selectedData.comics.items.map((comic: ComicSummary, index) => {
                    return (
                      <a
                        key={comic.name + index}
                        href={createPath({
                          path: ROUTE.COMIC,
                          params: { id: comic.resourceURI.match(/\/([0-9]+)/)?.[1] as string },
                        })}
                        className='information__link'
                      >
                        {comic.name}
                      </a>
                    );
                  })
                ) : (
                  <span className='information__rol span2'>
                    <b>No comics provided.</b>
                  </span>
                )}
              </div>

              <div className='information__wrapper'>
                <span className='information__wrapper-title'>Stories:</span>
                {selectedData.stories.items.length ? (
                  selectedData.stories.items.map((story, index) => {
                    return (
                      <a
                        key={index}
                        href={createPath({
                          path: ROUTE.STORIE,
                          params: { id: story.resourceURI.match(/\/([0-9]+)/)?.[1] as string },
                        })}
                        className='information__link'
                      >
                        {toTitleCase(decamelize(story.name, ' '))}
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
