import { View, Text } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper'
import OnboardingScreen from './src/screens/common/onboarding/OnboardingScreen'
import Carousel from 'react-native-snap-carousel'
import { onboardingData } from './src/constant/constant'
import RegisterPhoneScreen from './src/auth/phone/RegisterPhoneScreen'
import OtpScreen from './src/auth/otp/OtpScreen'
import EditScreen from './src/screens/edit/EditScreen'

const App = () => {
  return (
    <EditScreen />
  )
}

export default App