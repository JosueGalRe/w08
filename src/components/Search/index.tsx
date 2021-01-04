/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import { debounce } from 'lodash';
import './Search.scss';
import { urlParams } from 'utils/API_ENDPOINTS';

const Search = ({ input, cleaning }: { input: ({ ...args }: urlParams) => void; cleaning: () => void }) => {
  const [state, setState] = useState('');
  const delayedFunct = useCallback(
    debounce((title: string) => input({ title, name: title }), 1000),
    []
  );

  function searchFunction(value: string): void {
    setState(value);
    delayedFunct(value.trim());
  }

  return (
    <div className='params__search-wrapper'>
      <div className='params__date-title'>
        <p>Search by title: </p>
        <div className='search__field'>
          <i id='search' className='bx bx-search' />
          <input className='search__input' type='text' value={state} onChange={(e) => searchFunction(e.target.value)} />
          <i id='delete' className='bx bx-x' role='button' onClick={cleaning} />
        </div>
      </div>
    </div>
  );
};

export default Search;
