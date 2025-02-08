import { View, Text } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper'
import OnboardingScreen from './src/screens/common/onboarding/OnboardingScreen'
import Carousel from 'react-native-snap-carousel'
import { onboardingData } from './src/constant/constant'
import RegisterPhoneScreen from './src/screens/auth/register_number/RegisterPhoneScreen'
import OtpScreen from './src/auth/otp/OtpScreen'

const App = () => {
  return (
    <OtpScreen/>
  )
}

export default App