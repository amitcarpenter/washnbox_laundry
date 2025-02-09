import { View, Text, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, ScrollView, StyleSheet, StyleProp } from 'react-native'
import React, { ReactNode } from 'react'
import { COLORS } from '../../constant/constant'

type Props = {
    children:ReactNode
}
const Container = (props:Props) => {
  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={styles.container}
    >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                contentContainerStyle={styles.scrollViewContent} 
                keyboardShouldPersistTaps="handled"
            >
                {props.children}
            </ScrollView>
         </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.white,
        padding:16
    },
    scrollViewContent: {
        minHeight: "100%",
    },
})
export default Container