import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import Container from '../../component/view/Container';
import Header from '../../component/header/Header';
import { COLORS, IMAGES } from '../../constant/constant';
import Input from '../../component/input/Input';
import Button from '../../component/button/Button';
// import Geolocation from 'react-native-geolocation-service';
import Geolocation from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/native';

const EditScreen = () => {

  const navigation = useNavigation()
  

  const renderProfileImage = () => {
    return (
      <View style={styles.profileContainer}>
        <View style={styles.profileImageWrapper}>
          <Image source={IMAGES.profile} style={styles.profileImage} />
          <TouchableOpacity activeOpacity={0.8} style={styles.cameraButton}>
            <Image source={IMAGES.camera} style={styles.cameraIcon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderInputFields = () => {
    return (
      <View>
        <Input 
          keyboardType="email-address" 
          label='Business Name' 
          placeholder="Enter your business name" 
          labelStyle={styles.labelStyle}
          containerStyle={styles.inputContainer}
        />

        <View style={styles.locationContainer}>
          <Text style={styles.locationLabel}>Location on map</Text>
          <Image source={IMAGES.map} style={styles.mapImage} />
          <Text style={styles.addressText}>16, Nahar Shah Wali Rd, Mamta Colony, Indore, Madhya Pradesh 452010, India</Text>
        </View>

        <Input 
          keyboardType="email-address" 
          label='UPI ID for Payment' 
          placeholder="Enter your UPI ID" 
          labelStyle={styles.labelStyle}
          containerStyle={styles.inputContainer}
        />
        <Input 
          keyboardType="email-address" 
          label='Email' 
          placeholder="Enter your email" 
          labelStyle={styles.labelStyle}
          containerStyle={styles.inputContainer}
        />
        <Input 
          keyboardType="phone-pad" 
          label='Phone' 
          placeholder="Enter your phone number" 
          labelStyle={styles.labelStyle}
          containerStyle={styles.inputContainer}
        />
        <Input 
          keyboardType="email-address" 
          label='Services' 
          placeholder="Enter your services" 
          labelStyle={styles.labelStyle}
          containerStyle={styles.inputContainer}
        />
      </View>
    );
  };

  const getLocationPermission = () =>{
    Geolocation.requestAuthorization()
  }

  useEffect(()=>{
    getLocationPermission()
  },[])

  const getLocation = () =>{
    navigation.navigate("TabNavigation")
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContainer}>
      <Header title='Edit Profile' />
      {renderProfileImage()}
      {renderInputFields()}
      <Button onPress={getLocation} title='Update' style={styles.updateButton} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    padding: 16,
  },
  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
  },
  profileImageWrapper: {
    width: 164,
    height: 164,
    borderRadius: 164,
  },
  profileImage: {
    width: 164,
    height: 164,
    borderRadius: 164,
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  cameraIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  inputContainer: {
    marginTop: 20,
  },
  labelStyle: {
    color: COLORS.primary,
    fontSize: 16,
    marginBottom: 8,
  },
  locationContainer: {
    marginTop: 20,
  },
  locationLabel: {
    color: COLORS.primary,
    fontSize: 16,
    lineHeight: 16,
    fontWeight: "600",
    marginBottom: 18,
  },
  mapImage: {
    width: "100%",
    alignSelf: "center",
    borderRadius: 12,
  },
  addressText: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
  },
  updateButton: {
    position: "relative",
    marginTop: 40,
  },
});

export default EditScreen;
