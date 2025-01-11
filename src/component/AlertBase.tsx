import { Alert } from 'react-bootstrap';
import { setClassName } from '../app/utils';
import { APP_COLOR } from '../type';

export default function AlertBase(type: string, text: string) {
  let iconClassName = setClassName('info-circle') + ' me-1';
  if (type === APP_COLOR.Success) {
    iconClassName = setClassName('check-circle') + ' me-1';
  }
  return (
    <Alert variant={type}>
      <i className={setClassName(iconClassName)}></i>
      {text}
    </Alert>
  );
}
