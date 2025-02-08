import { 
  View, Text, StyleSheet, Image, 
  KeyboardAvoidingView, Platform, 
  TouchableWithoutFeedback, Keyboard, ScrollView 
} from 'react-native';
import React from 'react';
import { COLORS, IMAGES } from '../../../constant/constant';
import Button from '../../../component/button/Button';
import Input from '../../../component/input/Input';

const RegisterPhoneScreen = () => {
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
          <View style={styles.inner}>
            <View style={styles.topSection}>
              <Image source={IMAGES.laundry_service} style={styles.laundryImage} />
              <Image source={IMAGES.logo} style={styles.logo} />
              <Text style={styles.title}>Let’s get started</Text>
              <Text style={styles.subtitle}>Create an account to start ordering</Text>
            </View>

            <View style={styles.bottomSection}>
              <Input keyboardType='phone-pad' />

              <Text style={styles.termsText}>
                By pressing “Continue”, you are agreeing to our {"\n"}
                <Text style={styles.termsLink}>Terms and Conditions</Text>
              </Text>

              <Button />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

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
  inner: {
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
  },
  topSection: {
    width: "100%",
    height: "50%",
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
    width: "100%",
    height: "50%",  // ✅ Fixed height for input & button area
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
