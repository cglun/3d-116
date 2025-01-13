import { Toast } from '../MyContext';

export default function reducerToast(toast: Toast, action: Toast): any {
  switch (action.type) {
    case 'toast': //login with user info
      return { ...toast, toastBody: { ...action.toastBody } };
    default:
      return toast;
  }
}
