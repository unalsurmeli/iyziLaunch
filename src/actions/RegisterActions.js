import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  REGISTER_USER_EMAIL_CHANGED,
  REGISTER_USER_PASSWORD_CHANGED,
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
  REGISTER_USER
} from '../utils/types';

export const emailChangedForRegisterUser = (text) => {
  return {
    type: REGISTER_USER_EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChangedForRegisterUser = (text) => {
  return {
    type: REGISTER_USER_PASSWORD_CHANGED,
    payload: text
  };
};

export const registerUser = ({ email, password }) => {
  const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!email || reg.test(email) === false) {
    return (dispatch) => {
      registerUserFail(dispatch, 'Email should be valid.');
    };
  }

  if (!password) {
    return (dispatch) => {
      registerUserFail(dispatch, 'Password can not empty');
    };
  }
  return (dispatch) => {
    dispatch({ type: REGISTER_USER });

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => {
      registerUserSuccess(dispatch, user);
    })
    .catch(error => {
      registerUserFail(dispatch, error.message);
    });
  };
};

const registerUserFail = (dispatch, response) => {
  dispatch({ type: REGISTER_USER_FAIL, payload: response });
};

const registerUserSuccess = (dispatch, response) => {
  dispatch({ type: REGISTER_USER_SUCCESS, payload: response });
  Actions.login({ response });
};
