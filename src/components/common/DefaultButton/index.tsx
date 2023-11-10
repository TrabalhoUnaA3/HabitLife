import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {DefaultButtonProps} from './types';

export default function DefaultButton({
  buttonText,
  handlePress,
  width,
  height,
  disabled,
}: DefaultButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, {width, height}]}
      activeOpacity={0.7}
      disabled={disabled}
      onPress={handlePress}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
