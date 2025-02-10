import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import TabNavigation from '../tab/TabNavigation'

const Stack = createStackNavigator()

const RootStackNavigation = () => {
  return (
   <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen 
        name='TabNavigation' 
        component={TabNavigation} 
        options={{headerShown:false}}
      />
    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default RootStackNavigation