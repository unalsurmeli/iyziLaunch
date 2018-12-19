import firebase from 'firebase';
import {
  LOGIN_USER_EMAIL_CHANGED,
  LOGIN_USER_PASSWORD_CHANGED,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
  LOGIN_USER
} from '../utils/types';

export const emailChangedForLoginUser = (text) => {
  return {
    type: LOGIN_USER_EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChangedForLoginUser = (text) => {
  return {
    type: LOGIN_USER_PASSWORD_CHANGED,
    payload: text
  };
};


export const loginUser = ({ email, password }) => {
  const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!email || reg.test(email) === false) {
    return (dispatch) => {
      loginUserFail(dispatch, 'Email can not empty');
    };
  }

  if (!password) {
    return (dispatch) => {
      loginUserFail(dispatch, 'Password can not empty');
    };
  }
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        loginUserSuccess(dispatch, user);
      })
      .catch(() => {
        loginUserFail(dispatch, 'User not found. Please register.');
      });
  };
};

const loginUserFail = (dispatch, response) => {
  dispatch({ type: LOGIN_USER_FAIL, payload: response });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({ type: LOGIN_USER_SUCCESS, payload: user }); 
};
