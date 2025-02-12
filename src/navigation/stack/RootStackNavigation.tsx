import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import TabNavigation from '../tab/TabNavigation'
import NotificationScreen from '../../screens/notification/NotificationScreen'
import OnboardingScreen from '../../screens/common/onboarding/OnboardingScreen'
import EditScreen from '../../screens/edit/EditScreen'
import OrderDetails from '../../screens/orders/OrderDetails'

const Stack = createStackNavigator()

const RootStackNavigation = () => {
  return (
   <NavigationContainer>
    <Stack.Navigator initialRouteName='OnbordingScreen' >

      <Stack.Screen 
        name='OnbordingScreen'
        component={OnboardingScreen}
        options={{headerShown:false}}
      />

      <Stack.Screen 
        name='ProfileScreen'
        component={EditScreen}
        options={{headerShown:false}}
      />

      <Stack.Screen 
        name='TabNavigation' 
        component={TabNavigation} 
        options={{headerShown:false}}
      />

      <Stack.Screen 
        name='NotificationScreen' 
        component={NotificationScreen} 
        options={{headerShown:false}}
      />

      <Stack.Screen 
        name='OrderDetailScreen'
        component={OrderDetails} 
        options={{headerShown:false}}
      />
    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default RootStackNavigation