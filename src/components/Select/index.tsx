import ISelect from 'interfaces/common/Select';
import { useState } from 'react';
import { urlParams } from 'utils/API_ENDPOINTS';
import { toTitleCase } from 'utils/utils';
import './Select.scss';

type selectType = {
  info: { name: string; icon: string; type: string };
  list: Array<ISelect>;
  setParams: ({ ...args }: urlParams) => void;
};

const FilterItems = ({ info, list, setParams }: selectType) => {
  const [format, setFormat] = useState<string | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='params__select-wrapper'>
      <div className='params__select-title'>
        <p>{info.name}</p>
        <span
          className={info.icon}
          role='presentation'
          onClick={() => {
            setIsOpen((prevState) => !prevState);
          }}
        />
      </div>
      {isOpen && (
        <div className='select'>
          <div className='select__select'>
            <select value={format || 1} name='sortSelect' id='sortSelect' onChange={(e) => setFormat(e.target.value)}>
              {list.map(({ id, title }) => (
                <option key={id} value={info.type === 'id' ? id : title}>
                  {toTitleCase(title)}
                </option>
              ))}
            </select>
          </div>

          <div className='select__button'>
            <button
              type='button'
              onClick={() => {
                setIsOpen(false);
                if (info.name.includes('comics')) {
                  setParams({ comics: format });
                } else if (info.name.includes('stories')) {
                  setParams({ stories: format });
                } else {
                  setParams({ format });
                }
              }}
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterItems;
