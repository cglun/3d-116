import { createContext } from 'react';
import { DELAY, APP_COLOR, ToastBody, ModalBody } from './type';

export type Toast = { type: string; toastBody: ToastBody };
export type Modal = { type: string; ModalBody: ModalBody };

export const initToast: Toast = {
  type: 'toast',
  toastBody: {
    title: 'title',
    content: 'content',
    show: false,
    type: APP_COLOR.Success,
    delay: DELAY.MIDDLE,
  },
};

export const MyContext = createContext<{
  toast: Toast;
  dispatchToast: React.Dispatch<Toast>;
}>({
  toast: initToast,
  dispatchToast: () => {},
});
