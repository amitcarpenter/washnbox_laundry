import RegisterPhoneScreen from "../auth/phone/RegisterPhoneScreen"

export const BASE_URL = "https://washnbox.com:4000/laundry/"

export const PROVIDER_URLS = {
    LOGIN_WITH_NUMBER:"login-with-mobile",
    LOGIN_WITH_OTP:"login-with-otp",
    EDIT_LAUNDRY_PROFILE:"complete-and-edit-laundry-profile",
    GET_ALL_LAUNDRY_ITEMS:"get-all-laundry-items",
    GET_PROVIDER_ORDERS:"get-provider-orders",
    GET_PROVIDER_NOTIFICATION:"get-provider-notification",
    GET_PROVIDER_ACTIVE_ORDERS:"get-provider-active-orders",
    GET_PROFILE:"profile",
    UPDATE_ORDER_DETAILS:"update-order-details",
    UPDATE_ORDER_STATUS:"update-order-status",
    GET_ORDER_BY_ID:"get-order-by-id"
}


export const NAVIGATE_TO = {
    HOME_SCREEN:"HomeScreen",
    NOTIFICATION_SCREEN:"NotificationScreen",
    ORDER_SCREEN:"OrderScreen",
    ORDER_DETAILS_SCREEN:"OrderDetails",
    TAB_NAVIGATION :"TabNavigation",
    ONBOARDIN_SCREEN:"OnbordingScreen",
    REGISTER_PHONE_SCREEN:"RegisterPhoneScreen"
}
