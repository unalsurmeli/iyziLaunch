import {
  FAVORITE_CREATE,
  FAVORITE_EXISTS,
  FAVORITE_NOT_EXISTS,
  FAVORITE_CREATE_FAIL,
  FAVORITE_CREATE_SUCCESS
} from '../utils/types';

const INITIAL_STATE = {
  id: '',
  name: '',
  error: '',
  loading: false,
  exists: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FAVORITE_CREATE:
      return { ...state, loading: true, error: '' };
    case FAVORITE_EXISTS:
      return { ...state, exists: true, error: '', loading: false };
    case FAVORITE_NOT_EXISTS:
      return { ...state, exists: false, error: '', loading: false };
    case FAVORITE_CREATE_SUCCESS:
      return { ...state, exists: true, loading: false };
    case FAVORITE_CREATE_FAIL:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
