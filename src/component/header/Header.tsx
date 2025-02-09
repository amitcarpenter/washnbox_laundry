import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../../constant/constant'
import BackButton from '../back_button/BackButton'

type Props = {
  title:string
}
const Header = (props:Props) => {
  return (
    <View style={styles.container}>
        <BackButton />
        <Text style={styles.headerTextStyle}>{props.title}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        width:"100%",
        height:52,
        justifyContent:"center",
        alignItems:"center",
        marginTop:20
    },
    headerTextStyle:{
        fontSize:24,
        color:COLORS.black,
        fontWeight:"700"
    }
})
export default Header