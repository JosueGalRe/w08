import { useState } from 'react';
import { Calendar as CalendarComponent } from 'react-date-range';
import { formatDate } from 'utils/utils';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './Calendar.scss';
import { urlParams } from 'utils/API_ENDPOINTS';

const Calendar = ({ input }: { input: ({ modifiedSince }: urlParams) => void }) => {
  const [state, setState] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='params__date-picker-wrapper'>
      <div className='params__date-title'>
        <p>Order by date:</p>
        <span
          className='bx bx-calendar'
          role='presentation'
          onClick={() => {
            setIsOpen((prevState) => !prevState);
          }}
        />
      </div>
      {isOpen && (
        <div className='params__date-picker-picker'>
          <CalendarComponent onChange={(item) => setState(item as Date)} date={state as Date} />
          <div className='button__container'>
            <button
              type='button'
              className='params__date-picker-button reset'
              onClick={() => input({ modifiedSince: 'reset' })}
            >
              Reset
            </button>
            <button
              type='button'
              className='params__date-picker-button accept'
              onClick={() => {
                setIsOpen(false);
                input({ modifiedSince: formatDate(state as Date) });
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

export default Calendar;
