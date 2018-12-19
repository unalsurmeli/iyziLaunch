import {
  LOGIN_USER_EMAIL_CHANGED,
  LOGIN_USER_PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
} from '../utils/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER_EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case LOGIN_USER_PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, user: action.payload, ...INITIAL_STATE };
    case LOGIN_USER_FAIL:
      return { ...state, error: action.payload, password: '', loading: false };
    default:
      return state;
  }
};
