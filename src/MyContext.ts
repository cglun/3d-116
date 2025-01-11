import { createContext } from 'react';
import { DELAY, Modal, APP_COLOR, ToastItem, HTTP_TYPE } from './type';

export type App = {
  toast: ToastItem;
  modal: Modal;
};

export type Action =
  | { type: 'toast'; toast: ToastItem }
  | { type: 'modal'; modal: Modal };

export const initState: App = {
  toast: {
    title: 'title',
    content: 'content',
    type: APP_COLOR.Success,
    delay: DELAY.MIDDLE,
    show: false,
  },
  modal: {
    title: '标题',
    show: false,
    body: '',
    action: {
      url: '',
      method: HTTP_TYPE.GET,
    },
  },
};

export const MyContext = createContext<{
  state: App;
  dispatch: React.Dispatch<Action>;
}>({
  state: initState,
  dispatch: () => undefined,
});
