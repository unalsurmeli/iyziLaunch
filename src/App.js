import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './utils/reducers';
import Router from './Router';
import FirebaseUtil from './utils/FirebaseUtil';

class App extends Component {
  componentWillMount() {
    this.initializeFirebase();
  }

  initializeFirebase() {
    const config = {
      apiKey: FirebaseUtil.getApiKey(),
      authDomain: FirebaseUtil.getAuthDomain(),
      databaseURL: FirebaseUtil.getDatabaseURL(),
      projectId: FirebaseUtil.getProjectId(),
      storageBucket: FirebaseUtil.getStorageBucket(),
      messagingSenderId: FirebaseUtil.getMessagingSenderId()
    };

    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
