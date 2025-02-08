import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewProps } from 'react-native'
import React from 'react'
import { COLORS } from '../../constant/constant'

type Props = {
  style?:StyleProp<ViewProps>
  onPress?:()=>void;
}
const Button = (props:Props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={[styles.buttonStyle,props.style]}>
      <Text style={styles.buttonTitleStyle}>Continue</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonStyle:{
    width:"90%",
    minHeight:60,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:COLORS.primary,
    borderRadius:100,
    alignSelf:"center",
    position:"absolute",
    bottom:10
  },
  buttonTitleStyle:{
    fontSize:17,
    color:COLORS.white,
    fontWeight:"600",
  }
})

export default Button