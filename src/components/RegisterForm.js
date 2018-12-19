import React, { Component } from 'react';
import { Image, View, TouchableOpacity, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {
  emailChangedForRegisterUser,
  passwordChangedForRegisterUser,
  registerUser
} from '../utils/actions';
import {
  SView,
  CardSection,
  SInput,
  ButtonSection,
  Spinner
} from '../utils/common';

class RegisterForm extends Component {
  onRegisterAccountPress() {
    const { email, password } = this.props;
    this.props.registerUser({ email, password });
  }

  onLoginAccountPress() {
    Actions.auth({ type: 'reset' });
  }

  onEmailChange(text) {
    this.props.emailChangedForRegisterUser(text);
  }

  onPasswordChange(text) {
    this.props.passwordChangedForRegisterUser(text);
  }

  renderError() {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>{this.props.error}</Text>
        </View>
      );
    }
  }
  renderButton() {
    if (this.props.loading) {
      return (
        <CardSection>
          <Spinner size="large" />
        </CardSection>
      );
    }

    return (
      <Button
        title="Register"
        textStyle={styles.buttonTextStyle}
        onPress={this.onRegisterAccountPress.bind(this)}
        fontFamily="Helvetica"
        buttonStyle={styles.buttonStyle}
      />
    );
  }
  render() {
    return (
      <SView>
        <View style={styles.containerStyle}>
          <View style={styles.imageContainerStyle} >
            <Image
              style={styles.imageStyle}
              source={require('../assets/images/launch.png')} // eslint-disable-line global-require
              resizeMode="contain"
            />
          </View>
          <View style={styles.cardContainerStyle} >
            <CardSection style={{ borderBottomWidth: 0 }}>
              <SInput
                placeholder="Email"
                onChangeText={this.onEmailChange.bind(this)}
                value={this.props.email}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </CardSection>
            <CardSection style={{ borderBottomWidth: 0 }}>
              <SInput
                secureTextEntry
                placeholder="Password"
                onChangeText={this.onPasswordChange.bind(this)}
                value={this.props.password}
                autoCapitalize="none"
              />
            </CardSection>
            {this.renderError()}
            <ButtonSection style={{ borderBottomWidth: 0 }}>
              {this.renderButton()}
            </ButtonSection>
          </View>
        </View>
        <View>
          <View style={styles.buttonContainerStyle} >
            <TouchableOpacity onPress={this.onLoginAccountPress.bind(this)}>
              <Text style={{ color: '#cc3641' }}>Login Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SView>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: 'white'
  },
  cardContainerStyle: {
    borderWidth: 0,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    alignItems: 'stretch',
    flexDirection: 'column'
  },
  buttonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  imageContainerStyle: {
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#cc3641'
  },
  buttonTextStyle: {
    color: '#fff',
    fontSize: 20
  },
  buttonStyle: {
    backgroundColor: '#cc3641',
    height: 50,
    borderColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    borderWidth: 0,
    borderRadius: 3
  },
  imageStyle: {
    height: 300,
    flex: 1,
    paddingRight: 5,
    paddingLeft: 5,
    alignItems: 'stretch',
    width: null
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
    paddingBottom: 5
  }
};

const mapStateToProps = ({ registerReducer }) => {
  const { email, password, error, loading } = registerReducer;

  return {
    email,
    password,
    error,
    loading
  };
};

export default connect(
  mapStateToProps,
  { emailChangedForRegisterUser, passwordChangedForRegisterUser, registerUser }
)(RegisterForm);
