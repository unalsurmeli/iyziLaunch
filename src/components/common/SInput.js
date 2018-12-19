import React from 'react';
import { TextInput, View } from 'react-native';

const SInput = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  dataDetectorTypes,
  returnKeyType,
  onSubmitEditing,
  blurOnSubmit,
  ref,
  multiline,
  numberOfLines
}) => {
  const { inputStyle, containerStyle } = styles;

  return (
      <View style={containerStyle}>
        <TextInput
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          autoCorrect={false}
          autoCapitalize={autoCapitalize}
          style={inputStyle}
          value={String(value)}
          onChangeText={onChangeText}
          underlineColorAndroid='transparent'
          dataDetectorTypes={dataDetectorTypes}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          blurOnSubmit={blurOnSubmit}
          ref={ref}
          multiline={multiline}
          numberOfLines={numberOfLines}
        />
      </View>
  );
};


const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2,
    borderColor: '#ddd',
    borderWidth: 2,
    borderRadius: 5,
    height: 50
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 50,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export { SInput };
