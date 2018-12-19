import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

const InfoText = (props) => (
      <View style={styles.container}>
        <Text style={[styles.infoText, props.style]}>{props.text}</Text>
      </View>
);

InfoText.propTypes = {
  text: PropTypes.string.isRequired,
};

const styles = {
  container: {
    paddingTop: 20,
    paddingBottom: 12,
    backgroundColor: '#fff',
  },
  infoText: {
    fontSize: 16,
    marginLeft: 20,
    color: 'black',
    fontWeight: 'bold'
  }
};

export { InfoText };
