import ReactDom from 'react-dom';
import './Modal.scss';

type ModalTypes = {
  open: boolean;
  info: string;
  type: 'success' | 'error' | 'info';
  onClose: Function;
};

function Modal({ open, info, type, onClose }: ModalTypes) {
  if (open === false) {
    return null;
  }

  let title = '';
  let icon = '';

  switch (type) {
    default:
    case 'success':
      title = 'Success';
      icon = 'check';
      break;
    case 'error':
      title = 'Error';
      icon = 'error';
      break;
    case 'info':
      title = 'Info';
      icon = 'info';
      break;
  }

  return ReactDom.createPortal(
    <>
      <div className='overlay' />
      <div className='modal__wrapper'>
        <i className={`bx bx-${icon}-circle ${type}`} />
        <p className='modal__type'>{title}</p>
        <p className='modal__info'>{info}</p>
        <button className='modal__button' type='button' onClick={() => onClose()}>
          Close Modal
        </button>
      </div>
    </>,
    document.getElementById('modal')!
  );
}

export default Modal;
