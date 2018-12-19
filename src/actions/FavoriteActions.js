import firebase from 'firebase';
import { Alert } from 'react-native';
import {
  FAVORITE_CREATE_SUCCESS,
  FAVORITE_EXISTS,
  FAVORITE_NOT_EXISTS
} from '../utils/types';

export const addThisLaunchToMyFavorites = ({ id, name }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
  firebase.database()
  .ref(`/users/${currentUser.uid}/favorites/`)
  .orderByChild('id')
  .equalTo(id)
  .once('value', snapshot => {
    console.log(snapshot.val());
    //console.log(Object.keys(snapshot.val())[0]);
      if (!snapshot.exists()) {
        firebase.database().ref(`/users/${currentUser.uid}/favorites`)
          .push({ id, name })
          .then(() => {
            Alert.alert(
              'Added to your favorites',
               name, [{
                       text: 'Ok',
                       onPress: () => console.log('OK Pressed')
                      }],
                      {
                        cancelable: false
                        }
            );
            dispatch({ type: FAVORITE_CREATE_SUCCESS });
          });
      } else {
        const key = Object.keys(snapshot.val())[0];
        Alert.alert(
          'You already have your favorites.',
           name, [{
                   text: 'Ok',
                   onPress: () => {
                     dispatch({ type: FAVORITE_EXISTS });
                   }
                 },
                 {
                   text: 'Remove',
                   onPress: () => {
                     firebase.database().ref(`/users/${currentUser.uid}/favorites/${key}`)
                     .remove()
                     .then(() => {
                       dispatch({ type: FAVORITE_NOT_EXISTS });
                     });
                   },
                   style: 'cancel'
                 }
                  ],
                  {
                    cancelable: false
                  }
        );
      }
    });
  };
};

export const cheksExistsThisLaunchToMyFavorites = ({ id }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
  firebase.database()
  .ref(`/users/${currentUser.uid}/favorites/`)
  .orderByChild('id')
  .equalTo(id)
  .once('value', snapshot => {
      if (snapshot.exists()) {
        dispatch({ type: FAVORITE_EXISTS });
      } else {
        dispatch({ type: FAVORITE_NOT_EXISTS });
      }
    });
  };
};
