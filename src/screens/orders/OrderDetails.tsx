import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, FlatList, Alert, ActivityIndicator, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import Container from '../../component/view/Container'
import Header from '../../component/header/Header'
import { COLORS, ICONS, IMAGES, USERS } from '../../constant/constant'
import Button from '../../component/button/Button'
import DropDownPicker from 'react-native-dropdown-picker'
import { styles } from './styles'
import { useSelector } from 'react-redux'
import { PROVIDER_URLS } from '../../utils/config'
import { getUserToken, makeGetApiCall, makePostApiCall, renderAlertBox, showAlert } from '../../utils/helper'
import OutLinedButton from '../../component/button/OutLinedButton'

const OrderDetails = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Ready for Pick', value: 'Ready for Pick' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Received', value: 'Received' }
  ]);

  const userData = useSelector(state => state.data.selectedUser);
  const orderDetails = useSelector(state => state.data.selectedOrderDetails);
  const [isOrderUpdated,setIsOrderUpdated] = useState(false)
  const [orderItems, setOrderItems] = useState(orderDetails?.item_details || []);
  const [status, setStatus] = useState("")
  const [statusCode, setStatusCode] = useState(0)
  const [token, setToken] = useState("")
  const [updatedTotalPrice, setUpdatedTotalPrice] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    getToken()
  },[token])

  useEffect(()=>{
    if(token){
      getOrderStatusData()
    }
  },[token])

  const getOrderStatusData = async () =>{
    let data = {
      order_id:orderDetails?.order_id
    }
    let url = PROVIDER_URLS.GET_ORDER_BY_ID
    let { result } = await makePostApiCall(url,data,false,token)
    if(result?.success){
      setIsLoading(false)
      setStatus(result?.data[0]?.status)
    }else{
      setIsLoading(false)
    }
  }
  
  const getToken = async () =>{
  let token = await getUserToken()
  setToken(token)
  }

  const increaseCount = (index:number) => {

    if(status === "In Process" || status === "Completed"){
      Alert.alert("Failed","order cannot be updated once work is started")
      return
    }
    setIsOrderUpdated(true)
    setOrderItems((prevItems:any) =>
      prevItems.map((item:any, i:number) =>
        i === index ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
  };
  
  const decresCount = (index:number) => {
    if(status === "In Process" || status === "Completed"){
      Alert.alert("Failed","order cannot be updated once work is started")
      return
    }
    setIsOrderUpdated(true)
    setOrderItems((prevItems:any) =>
      prevItems.map((item:any, i:number) =>
        i === index && (item.quantity || 1) > 1 ? { ...item, quantity: (item.quantity || 1) - 1 } : item
      )
    );
  };
  
  const showModal = () => {
    if(status==="Pending"){
      Alert.alert("Failed","Please start work before completing")
      return
    }

    updateOrderStatus("Completed");
    setStatusCode(statusCode+1)
    setIsModalVisible(true);
  };

  const cancelModal = () => {
    setIsModalVisible(false);
  };

  const updateOrder = async () => {

    if(!isOrderUpdated){
      Alert.alert("Failed","Please update order details")
      return
    }

    const data = {
      order_id: orderDetails?.order_id,
      provider_id: orderDetails?.provider_id || 1,
      user_id: orderDetails?.user_id,
      total_price: orderItems.reduce((total:number, item:any) => total + (item.quantity * item.price_per_unit), 0),
      item_details: orderItems 
    };
    setUpdatedTotalPrice(data.total_price)
    let url = PROVIDER_URLS.UPDATE_ORDER_DETAILS
    let { result } = await makePostApiCall(url,data,false,token)
    checkOrderUpdateResponse(result)
  };

  const checkOrderUpdateResponse = (result:any) =>{
    if(result?.success){
      showAlert("Success",result)
      return
    }else{
      showAlert("Failed",result)
    }
  }

  const renderUpdateOrderButton = () =>{
    return(
      <OutLinedButton style={{height:52}} onPress={updateOrder} title='Update Order' />
    )
  }

  const updateOrderStatus = async (newStatus: string) => {
    let data = {
      order_id: orderDetails?.order_id,
      status: newStatus
    };
  
    let url = PROVIDER_URLS.UPDATE_ORDER_STATUS;
    let { result } = await makePostApiCall(url, data, false, token);
    console.log(result)
    if (result?.success) {
      setStatus(newStatus);
      setStatusCode(newStatus === "In Process" ? 1 : 2);
    } else {
      Alert.alert("Failed", "Failed to update order status");
    }
  };
  

  const updateStatus = () =>{
    if (statusCode > 2) {
      setStatusCode(0) 
      setStatus("Pending")
    }

    switch (status) {
      case "Pending":
        return(
          <>
            <TouchableOpacity 
              activeOpacity={0.8} 
              onPress={() => updateOrderStatus("In Process")} 
              style={styles.outlinedButtonStyle}>
              <Text style={styles.outlineButtonText}>Start Work</Text>
            </TouchableOpacity>
            {renderUpdateOrderButton()}
          </>
        )
      case "In Process":
        return(
          <TouchableOpacity activeOpacity={0.8}  style={[styles.outlinedButtonStyle,styles.grayoutlineButtonStyle]}>
            <Text style={[styles.outlineButtonText,{color:"white"}]}>Work Started</Text>
          </TouchableOpacity>
        )
      case "Completed":
        return(
          <TouchableOpacity activeOpacity={0.8} style={[styles.outlinedButtonStyle,styles.grayoutlineButtonStyle]}>
            <Text style={[styles.outlineButtonText,{color:"white"}]}>Order Completed</Text>
          </TouchableOpacity>
        )
    
      default:
        return(
          <TouchableOpacity  onPress={() => updateOrderStatus("In Process")}  activeOpacity={0.8} style={styles.outlinedButtonStyle}>
            <Text style={styles.outlineButtonText}>Start Work</Text>
          </TouchableOpacity>
        )
        
    }
  }

  const completeWork = () =>{
    setIsModalVisible(false)
  }

  const handleRefereshing = async() =>{
    setIsLoading(true)
    await getOrderStatusData()
    setIsLoading(false)
  }

  const renderModal = () => {
    return (
      <Modal
        statusBarTranslucent
        visible={isModalVisible}
        backdropColor={"rgba(0,0,0,0.1)"}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBoxContainer}>
            <View style={styles.modalImageAndTextContainer}>
              <View style={styles.modalImageContainer}>
                <Image source={IMAGES.success} style={styles.modalImageStyle} />
              </View>
              <Text style={styles.modalText}>Work done Successful!</Text>
            </View>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity style={styles.cancelButtonStyle} onPress={cancelModal}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={cancelModal} style={styles.orderButtonStyle}>
                <Text style={styles.orderTextStyle}>Order Completed</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.crossIconContainer} onPress={cancelModal}>
              <Image source={ICONS.cancel} style={{ width: 28, height: 28 }} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const qunatityAlert = () =>{
    Alert.alert("Failed","Quantity cannot update once work is started.")
    return true
  }

  const renderServices = ({ item, index }:{item:any,index:number}) => {
    return (
      <View style={styles.serviceItemContainer}>
        <View style={styles.serviceItemTextAndQuantityContainer}>
          <Text style={styles.serviceItemNameText}>{item?.item_name}</Text>
          <DropDownPicker
            disabled={true}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            dropDownContainerStyle={styles.dropDownContainerStyle}
            style={styles.dropDownContainerStyle}
            textStyle={styles.dropDownTextStyle}
            placeholder={`${item?.service_type}  $ ${item?.price_per_unit}/unit`}
          />
        </View>

        <View style={{ flex: 0.2 }}>
          <View style={styles.priceAndQuantityContainer}>
            <Text style={styles.priceText}>
              $ {item?.quantity*item?.price_per_unit}
            </Text>
          </View>
          <View style={styles.quantityContainer}>
            <View style={styles.quantityContainer2}>
            <Text style={{ fontSize: 16, fontWeight: "600", color: COLORS.white }}>
              <Text onPress={() => decresCount(index)}> - </Text>
                {" "} {item.quantity || 1} {" "}
              <Text onPress={() => increaseCount(index)}> + </Text>
            </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderUserDetails = () =>{
    // console.log(`renderUserDetails ${new Date(orderDetails?.updated_at).toLocaleString()}`)
    // console.log("Order Details =>",orderDetails)
    let date = new Date(orderDetails?.updated_at).toLocaleString();
    const image = userData?.profile_image?.trim()
    return (
      <View style={styles.orderItemContainer}>
        <View style={styles.imageContainer}>
          <Image source={image?{uri:image}:USERS.dummy} resizeMode="contain" style={styles.orderImage} />
        </View>
        <View style={styles.orderDetails}>
          <Text style={styles.orderName}>{userData?.name}</Text>
          <Text style={styles.orderDateTime}>{date}</Text>
          <View style={styles.servicesContainer}>
            {orderDetails?.item_details?.map((service:any, index:number) => (
              <Text key={index} style={styles.serviceText} ellipsizeMode='tail'>
                {service?.item_name}
              </Text>
            ))}
          </View>
        </View>
        <View style={styles.priceContainer}>
          <View style={styles.priceRow}>
            <Image source={ICONS.rupees} style={styles.rupeesIcon} />
            <Text style={styles.orderPrice}>{updatedTotalPrice?updatedTotalPrice:orderDetails?.total_price }</Text>
          </View>
        </View>
      </View>
    )
  }

  const openDialer = () => {
    let phoneNumber = userData?.mobile_number
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url).catch(() => Alert.alert("Error", "Unable to open dialer"));
  };

  return (
    <View>
      <>
       {isLoading ? (

        <View style={{minHeight:"100%",justifyContent:"center",alignItems:"center"}}>
          <ActivityIndicator size={"large"} color={COLORS.primary} />
        </View>

       ): (
        <>
          <Container 
            scrollEnabled={true} 
            refereshing={true}
            onRefresh={handleRefereshing} 
            containerStyle={{ paddingBottom: 0 }}>
            <Header title='Order Details' isFilter={false} />
    
            {renderUserDetails()}
    
            <View style={{ width: "100%", height: "80%" }}>
              <View style={styles.lockboxAndCallIconContainer}>
                <Text style={styles.lockboxText}>Lock box drop off</Text>
                <TouchableOpacity onPress={openDialer} style={styles.callIconButton}>
                  <Image source={ICONS.phone} style={styles.callIconImage} />
                  <Text style={styles.callText}> Call </Text>
                </TouchableOpacity>
              </View>
    
              <View style={{ flex: 0.5, paddingTop: 10 }}>
                <FlatList
                  data={orderItems}
                  contentContainerStyle={{ marginBottom: "30%" }}
                  ListFooterComponent={updateStatus()}
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={renderServices}
                />
              </View>
            </View>
    
          </Container>
    
          {
            status === "In Process" && (
              <View style={styles.bottomModalButtonContainer}>
                <Button onPress={showModal} title='Complete the work' />
              </View>
            )
          }
    
          {renderModal()}
        </>

      )}
      </>
    </View>
  );
};

export default OrderDetails;
