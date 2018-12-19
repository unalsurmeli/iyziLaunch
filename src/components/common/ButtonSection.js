import React from 'react';
import { View } from 'react-native';

const ButtonSection = (props) => (
    <View style={[styles.containerStyle, props.style]} >
      {props.children}
    </View>
);

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    paddingBottom: 3,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    flexDirection: 'column',
    flexWrap: 'wrap',
  }
};

export { ButtonSection };
