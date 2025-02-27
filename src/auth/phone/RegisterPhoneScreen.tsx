import { 
  View, Text, StyleSheet, Image, 
  KeyboardAvoidingView, Platform, 
  TouchableWithoutFeedback, Keyboard, ScrollView, 
  Alert,
  BackHandler
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { COLORS, IMAGES } from '../../constant/constant';
import Button from '../../component/button/Button';
import Input from '../../component/input/Input';
import Container from '../../component/view/Container';
import { useNavigation } from '@react-navigation/native';
import PhoneInput from 'react-native-phone-number-input';
import { makePostApiCall } from '../../utils/helper';
import { PROVIDER_URLS } from '../../utils/config';
import { useDispatch, UseDispatch } from 'react-redux';
import { addLoginData } from '../../redux/dataSlice';
import CheckBox from 'react-native-check-box';

const RegisterPhoneScreen = () => {

  const navigation = useNavigation()
  const phoneInput = useRef<PhoneInput>(null);
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [checkBox, setCheckBox] = useState(false)
  const dispatch = useDispatch()
  const [backPressCount, setBackPressCount] = useState(0);

  useEffect(() => {
    const backAction = () => {
      if (backPressCount === 1) {
        Alert.alert(
          "Exit App",
          "Are you sure you want to exit?",
          [
            {
              text: "Cancel",
              onPress: () => setBackPressCount(0),
              style: "cancel",
            },
            { text: "OK", onPress: () => BackHandler.exitApp() },
          ]
        );
        return true;
      } else {
        setBackPressCount(1);
        setTimeout(() => setBackPressCount(0), 2000); // Reset count after 2 seconds
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => backHandler.remove(); // Clean up event listener
  }, [backPressCount]);

  
  const onRegisterNumberPress = async () =>{
    let formattedNum = formattedValue;
    if (!formattedNum) {
      Alert.alert("Error", "Please enter a valid phone number.");
      return;
    }
    console.log(checkBox)

    if(!checkBox){
      Alert.alert("Error", "Please accept the terms and conditions.");
      return;
    }

    let data = { "mobile_number": formattedNum };
    let url = PROVIDER_URLS.LOGIN_WITH_NUMBER;
    let response = await makePostApiCall(url, data);
    await checkResponse(response);
  }

  const checkResponse = async (response:any) =>{
    if(response?.success){
      dispatch(addLoginData({
        number:value,
        formattedValue:formattedValue,
        ...response
      }))
      navigation.navigate("OtpScreen")
    }else{
      Alert.alert("Failed","Something went wrong",[
        {
          text:"OK",
          onPress:()=>{}
        }
      ])
    }
  }
  const oncheckBoxPress = () =>{
    setCheckBox(!checkBox)
  }

  return (
    <Container containerStyle={{flex:1}}>
      <View style={styles.inner}>
        <View style={styles.topSection}>
          <Image source={IMAGES.laundry_service} style={styles.laundryImage} />
          <Image source={IMAGES.logo} style={styles.logo} />
          <Text style={styles.title}>Let’s get started</Text>
          <Text style={styles.subtitle}>Create an account to start ordering</Text>
        </View>

        <View style={styles.bottomSection}>
          <Text style={styles.labelStyle}>Your Phone number</Text>
          <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode="IN"
            layout="second"
            containerStyle={styles.phoneInputStyle}
            onChangeText={(text) => { setValue(text)}}
            onChangeFormattedText={(text)=> { 
              console.log("Formatted Number:", text); 
              setFormattedValue(text); 
            }}
            textInputStyle={{
              padding:0,
              margin:0,
              marginTop:0,
              fontSize:16,
              fontWeight:"500",
            }}
            codeTextStyle={{
              padding:0,
              margin:0
            }}
            textContainerStyle={{
              backgroundColor:"white",
              flex:1
            }}
          />

          <View style={{flexDirection:"row",alignItems:"center"}}>
            <CheckBox 
              isChecked={checkBox} 
              checkBoxColor={COLORS.primary} 
              onClick={oncheckBoxPress} 
            />
            <Text style={styles.termsText}>
              {" "}By pressing “Continue”, you are agreeing to our {"\n"}
              <Text style={styles.termsLink}>Terms and Conditions</Text>
            </Text>
          </View>


          <Button 
            title='Continue' 
            onPress={onRegisterNumberPress} 
          />
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  labelStyle: {
    color: 'black',
    fontSize: 16,
    marginBottom: 8,
    fontWeight:"600"
  },
  phoneInputStyle:{
    width:"100%",
    height:55,
    borderRadius:12,
    borderWidth:1,
    borderColor:COLORS.borderColor,
    paddingRight:8,
    fontSize:16,
    fontWeight:"500",
    marginTop:8
  },
  scrollViewContent: {
    minHeight: "100%",
  },
  inner: {
    minHeight: "100%",
  },
  topSection: {
    minHeight: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  laundryImage: {
    width: "80%",
    height: 29,
    resizeMode: "contain",
  },
  logo: {
    width: "70%",
    height: 200,
    resizeMode: "contain",
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    color: COLORS.primary,
    marginTop: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.black,
    marginTop: 16,
    textAlign: "center",
  },
  bottomSection: {
    minHeight:"50%",
    justifyContent: "flex-start",
    paddingTop: 20,
  },
  termsText: {
    fontSize: 16,
    color: "#949494",
    marginTop: 20,
    lineHeight: 20,
    textAlign: "center",
  },
  termsLink: {
    fontWeight: "700",
    color: COLORS.primary,
  },
});

export default RegisterPhoneScreen;
