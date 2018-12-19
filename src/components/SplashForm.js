import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import TimerMixin from 'react-timer-mixin';
import firebase from 'firebase';

class SplashForm extends Component {
  componentDidMount() {
    TimerMixin.setTimeout(() => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          Actions.main({ user });
        } else {
          Actions.auth({ type: 'reset' });
        }
      });
    }, 3000);
  }

  render() {
    return (
      <View style={styles.containerStyle} >
        <Image
          style={styles.imageStyle}
          source={require('../assets/images/launch.png')} // eslint-disable-line global-require
          resizeMode="contain"
        />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#cc3641'
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  imageStyle: {
    height: '100%',
    paddingRight: 5,
    paddingLeft: 5,
    width: '100%',
    position: 'absolute'
  }
};

export default SplashForm;
