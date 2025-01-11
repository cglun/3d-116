import { Action, App } from '../MyContext';

export default function reducer(state: App, action: Action): any {
  switch (action.type) {
    case 'toast': //login with user info
      return { ...state, toast: { ...state.toast, ...action.toast } };
    case 'modal': //logout return true
      return { ...state, modal: { ...state.modal, ...action.modal } };

    default:
      return state;
  }
}
