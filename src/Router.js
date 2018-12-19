import React, { Component } from 'react';
import { BackHandler, Platform, Alert } from 'react-native';
import RNExitApp from 'react-native-exit-app';
import { Scene, Router, Stack, Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import SplashForm from './components/SplashForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import LaunchList from './components/LaunchList';
import LaunchDetail from './components/LaunchDetail';

class RouterComponent extends Component {
  componentDidMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener(
        'hardwareBackPress', this.handleBackButton
      );
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress',
        this.handleBackButton
      );
    }
  }

  onLogOutPress() {
    Alert.alert(
      'Information',
      'Are you sure you want to logout app?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => firebase.auth().signOut()
        }
      ],
      {
        cancelable: false
      }
    );
    return true;
  }
  /* eslint-disable */
   handleBackButton = () => {
    if (Actions.currentScene !== 'launchList') {
      return false;
    }
    Alert.alert(
      'Information',
      'Are you sure you want to exit?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => RNExitApp.exitApp()
        }
      ],
      {
        cancelable: false
      }
    );
    return true;
  }
  /* eslint-enable */

  render() {
    return (
      <Router
        navigationBarStyle={styles.navBar}
        titleStyle={styles.navBarTitle}
        tintColor="white"
      >
        <Stack key="root" hideNavBar cardStyle={styles.cardStyle}>
          <Scene key="welcome">
            <Scene key="welcome" component={SplashForm} initial />
          </Scene>
          <Scene key="auth">
            <Scene
              key="login"
              component={LoginForm}
              title="Please Login"
              initial
            />
            <Scene
              key="register"
              component={RegisterForm}
              title="Please Register"
            />
          </Scene>
          <Scene key="main">
            <Scene
              key="launchList"
              component={LaunchList}
              title="Launch List"
              onRight={() => this.onLogOutPress()}
              rightButtonImage={require('./assets/images/logout.png')} // eslint-disable-line global-require
              rightButtonIconStyle={{
                width: 30,
                height: 30
              }}
              initial
            />
            <Scene
              key="launchDetail"
              component={LaunchDetail}
              title="Launch Detail"
              onRight={() => console.log('test')}
              rightButtonImage={require('./assets/images/unstar.png')} // eslint-disable-line global-require
              rightButtonIconStyle={{
                width: 30,
                height: 30
              }}
            />
          </Scene>
        </Stack>
      </Router>
    );
  }
}

const styles = {
  sceneStyle: {
    backgroundColor: 'FFFFFF',
    shadowOpacity: 1,
    shadowRadius: 3
  },
  navBar: {
    backgroundColor: '#cc3641'
  },
  navBarTitle: {
    color: '#FFFFFF'
  },
  barButtonTextStyle: {
    color: '#FFFFFF'
  },
  barButtonIconStyle: {
    tintColor: '#FFFFFF'
  },
  cardStyle: {
    backgroundColor: '#FFFFFF'
  }
};

export default RouterComponent;
