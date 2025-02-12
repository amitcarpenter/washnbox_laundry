import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import Container from '../../component/view/Container'
import Header from '../../component/header/Header'
import { COLORS, ICONS, OrderItems } from '../../constant/constant'
import { useNavigation } from '@react-navigation/native'
import Modal from "react-native-modal"

const OrderScreen = () => {

  const navigation  = useNavigation()

  const navigateToOrderDetails = () =>{
    navigation.navigate("OrderDetailScreen")
  }

  const renderOrderStatusBasedOnCode = (code:number,item:any) =>{
    switch (code) {
      case 0:
      return(
        <Text style={styles.orderReadyStatusStyle}>{item?.order_status}</Text>
      )
      case 1:
        return(
          <Text style={styles.orderInprogressStatusStyle}>{item?.order_status}</Text>
        )
      case 2:
        return(
          <Text style={styles.orderRecivedStatusStyle}>{item?.order_status}</Text>
        )
      default:
        return(<Text>Un</Text>);
    }
  }

  const renderOrderItem = ({item}) =>{
    return(
      <TouchableOpacity onPress={navigateToOrderDetails} style={styles.orderItemContainer}>
        <View style={styles.orderItemHeader}>
          <Text style={styles.orderDateText}>{item?.date_time}</Text>
          {renderOrderStatusBasedOnCode(item?.order_status_code,item)}
        </View>
        <View style={styles.orderItemFooter}>
          <View style={styles.orderDetailsContainer}>
            <Text style={styles.orderIdText}>OID {item?.order_id}</Text>
            <Text style={styles.lockCodeText}>Lock Code - {item?.lock_code}</Text>
          </View>
          <View style={styles.paymentContainer}>
            <Text style={styles.paymentStatus}>{item?.payment_status}</Text>
            <View style={styles.rowRupee}>
              <Image source={ICONS.rupees} style={styles?.rupeesIcon}/>
              <Text style={styles.paymentAmount}>{item?.price}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <Container>
      
      <Header title='Orders' isFilter={true} />
      
      <View>
        <Text style={styles.activeOrdersText}>6 Active Orders</Text>
      </View>

      <FlatList data={OrderItems} renderItem={(item)=>renderOrderItem(item)} />

    </Container>
  )
}

const styles = StyleSheet.create({
  activeOrdersText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.black,
    marginVertical: 20
  },
  orderItemContainer: {
    width: "100%",
    height: 90,
    borderRadius: 8,
    backgroundColor: COLORS.orderItemBackgroundColor,
    marginVertical: 10,
    paddingVertical: 8
  },
  orderItemHeader: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  orderDateText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.black
  },
  orderReadyStatusStyle: {
    backgroundColor: "#00A013",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 10,
    color: COLORS.white,
    fontWeight: "600"
  },
  orderInprogressStatusStyle:{
    backgroundColor: "#C8C80A",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 10,
    color: COLORS.white,
    fontWeight: "600",

  },
  orderRecivedStatusStyle:{
    backgroundColor: "#FF5E18",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 10,
    color: COLORS.white,
    fontWeight: "600"
  },
  orderItemFooter: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  orderDetailsContainer: {
    flex: 0.6,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10
  },
  orderIdText: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 22
  },
  lockCodeText: {
    color: COLORS.black,
    fontWeight: "600",
    backgroundColor: "#D4D4D4",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 6
  },
  paymentContainer: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingLeft:10,
    paddingHorizontal: 10
  },
  paymentStatus: {
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 22,
    color: COLORS.primary,
    // paddingLeft: 20
  },
  paymentAmount: {
    fontWeight: "700",
    color: "black",
    fontSize: 18,
    lineHeight: 22
  },
  rowRupee:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"
  },
  rupeesIcon: {
    width: 10,
    height: 10,
    resizeMode: "contain",
  }
})

export default OrderScreen;