import { Toast } from 'react-bootstrap';
import { initState, MyContext } from '../MyContext';
import { useContext } from 'react';
import { DELAY, APP_COLOR } from '../type';
import { setClassName } from '../app/utils';

function ToastExample() {
  const { state, dispatch } = useContext(MyContext);

  const { toast } = state;

  let iconClassName = setClassName('info-circle');
  if (toast.type === APP_COLOR.Success) {
    iconClassName = setClassName('check-circle');
  }

  return (
    toast.show && (
      <div className="fixed-top py-2">
        <Toast
          className="mx-auto"
          onClose={() => {
            dispatch({
              type: 'toast',
              toast: {
                title: 'title',
                content: 'content',
                type: APP_COLOR.Success,
                delay: DELAY.MIDDLE,
                show: false,
              },
            });
          }}
          show={toast.show}
          delay={toast.delay}
          bg={toast.type}
          autohide
        >
          <Toast.Header>
            <i className={setClassName('info-circle') + ' me-1'}></i>
            <strong className="me-auto ">{toast.title}</strong>
          </Toast.Header>
          <Toast.Body
            className={toast.type.toString() === 'Dark' ? 'text-white' : ''}
          >
            <i className={iconClassName}></i> {toast.content}
          </Toast.Body>
        </Toast>
      </div>
    )
  );
}
export default ToastExample;
