import { View, Text, TextInput, StyleSheet, StyleProp, TextProps, ViewProps, TextStyle, ViewStyle } from 'react-native'
import React from 'react'
import { COLORS } from '../../constant/constant'

type Props = {
    label?:string,
    labelStyle?:StyleProp<TextStyle>,
    inputStyle?:StyleProp<ViewStyle>,
    keyboardType:"phone-pad" | "email-address"
}
const Input = (props:Props) => {
  return (
    <View>

      <Text 
        style={[
            styles.labelStyle,
            props.labelStyle
        ]}>
            Your Phone number
        </Text>

      <TextInput 
        placeholder='+91' 
        style={[
            styles.inputFieldStyle,
            props.inputStyle
        ]}
        keyboardType={props.keyboardType}
      />
    </View>
  )
}
const styles = StyleSheet.create({
    inputFieldStyle:{
        width:"100%",
        height:55,
        borderRadius:12,
        borderWidth:1,
        borderColor:COLORS.borderColor,
        paddingHorizontal:16,
        marginTop:10,
        fontSize:16,
        fontWeight:"700"
    },
    labelStyle:{
        fontSize:14,
        color:COLORS.black,
        lineHeight:16,
        fontWeight:"700"
    }
})

export default Input