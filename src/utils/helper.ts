
import axios from "axios"
import { BASE_URL } from "./config"
import { ProfileDataType } from "./type";
import { GOOGLE_API_KEY } from '@env';
import { Alert, Linking } from "react-native";
import Geolocation from "@react-native-community/geolocation";
import { GeolocationError } from "@react-native-community/geolocation";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const makePostApiCall = async (url: string, data: any, isFormData = false,token="") => {
    try {
        const headers = isFormData
            ? {
                "Content-Type":"multipart/form-data",
                "Authorization" : `Bearer ${token}`
            }
            : { 
                "Content-Type": "application/json",
                 "Authorization" : `Bearer ${token}`
             };

        const response = await axios.post(`${BASE_URL + url}`, data, { headers });

        console.log(`
            URL: ${url} \n
            Response: ${response.data}
        `);

        return {
            isLoading: false,
            result: response.data,
            success: true,
        };
    } catch (error:any) {
        console.log(`URL: ${url}`);
        if (error.response) {
            console.log("Response Error:", error.response.data);
        } else if (error.request) {
            console.log("Request Error:", error.request);
        } else {
            console.log("Error Message:", error.message);
        }

        return {
            isLoading: false,
            result: error,
            success: false,
        };
    }
};

export const makeGetApiCall = async (url:string,token:string) => {
    try {
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        console.log("URL:", url, "Token:", token);
        const response = await axios.get(`${BASE_URL + url}`,{headers})
        console.log(`
            URL: ${url} \n
            Response: ${response.data}
        `);

        return {
            isLoading: false,
            result: response.data,
            success: true,
        };
    } catch (error) {
        console.log(`
            URL: ${url} \n
            Error: ${error}
        `);

        return {
            isLoading: false,
            result: error,
            success: false,
        };
    }
}

export const getUserToken = async () =>{
    try {
        let token:string = await AsyncStorage.getItem("loginData").then(resp=>JSON.parse(resp))
        return token?.data;
    } catch (error) {
        console.log(`
            TOKEN:
            Error => ${error}
            `)
        return ""
    }
}

export const getAddressFromCoordinates = async (lat:string, lng:string) => {
    const apiKey = GOOGLE_API_KEY
    // console.log("GOOGLE_API_KEY",GOOGLE_API_KEY);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.status === "OK") {
        const address = data.results[0].formatted_address;
        console.log(`
            Address ==== ${address}
        `);
        return address;
      } else {
        console.log(`
            Error fetching address : ${ data.error_message }
        `);
      }
    } catch (error) {
      console.error("Error:", error);
    }
};

export const checkIsDataValid = async (data: ProfileDataType) => {
    let { shop_name, email, phone, services, upi_id, address, file } = data;
    
    if (!file) return { isDeatilsValid: false, error: 'Please select a business image' };

    if (!shop_name) return { isDeatilsValid: false, error: 'Business name is required' };
    const formattedName = shop_name.trim().replace(/\s+/g, ' ');
    if (formattedName.length < 2) {
      return { isDeatilsValid: false, error: 'Business name must be at least 2 characters' };
    }
  
    if (!address) return { isDeatilsValid: false, error: 'Please select an address. It is required' };
  
    if (!email) return { isDeatilsValid: false, error: 'Email is required' };
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { isDeatilsValid: false, error: 'Invalid email format' };
    }
  
    return { isDeatilsValid: true };
  };
export const getLocationCoordinates = () => {
return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
    (success) => {
        resolve(success.coords);
    },
    (error) => {
        let errorMessage = "";
        switch (error.code) {
        case 1: // Permission denied
            errorMessage = "Location permission denied. Please enable it in settings.";
            Alert.alert(
            "Location Permission",
            "This app requires location access. Please enable it in settings.",
            [
                { text: "Cancel", style: "cancel" },
                { 
                text: "Open Settings", 
                onPress: () => Linking.openSettings()
                }
            ]
            );
            break;
        case 2:
            errorMessage = "Location position unavailable.";
            break;
        case 3:
            errorMessage = "Location request timed out.";
            break;
        default:
            errorMessage = "An unknown error occurred.";
        }
        if (error.code !== 1) {
        Alert.alert("Location Error", errorMessage);
        }
        reject(error);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
});
};

export const renderAlertBox = (data:any)=>{
    Alert.alert("Error",data.error,[{
        text:"OK",
        onPress:()=>{}
    }])
}


export const showAlert = (status:string,data:any)=>{
    return (
        Alert.alert(status,data?.message,[
            {
                text:"cancel",
                onPress:()=>{}
            },
            {
                text:"ok",
                onPress:()=>{}
            }
        ])
    )
}