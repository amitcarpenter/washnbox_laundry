import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS, IMAGES } from '../../constant/constant';

const BackButton = () => {
  return (
    <TouchableOpacity style={styles.button}>
      <Image source={IMAGES.back_icon} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 54,
    height: 52,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    position: 'absolute',
    left: 0,
  },
  image: {
    width: 10,
    height: 14,
  },
});

export default BackButton;
