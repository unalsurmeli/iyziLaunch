import React from 'react';
import { ScrollView } from 'react-native';

const SView = (props) => (
  <ScrollView style={[styles.containerStyle, props.style]}>
      {props.children}
  </ScrollView>
);

const styles = {
  containerStyle: {
    backgroundColor: 'white'
  }
};

export { SView };
