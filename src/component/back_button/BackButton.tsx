import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS, ICONS, IMAGES } from '../../constant/constant';


type Props = {
  isFilter?:boolean
}
const BackButton = (props:Props) => {
  return (
    <TouchableOpacity style={props.isFilter?styles.filterButton:styles.button}>
      {
        props.isFilter ?
        <Image source={ICONS.filter} style={styles.filterImageStyle} />
        :
        <Image source={IMAGES.back_icon} style={styles.image} />
      }
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
  filterButton: {
    width: 54,
    height: 52,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    position: 'absolute',
    right: 0,
  },
  image: {
    width: 10,
    height: 14,
    resizeMode:"contain"
  },
  filterImageStyle:{
    width: 24,
    height: 24,
    resizeMode:"contain"
  }
});

export default BackButton;
