import { View, Text, StyleSheet, Image, TouchableOpacity,Modal } from 'react-native'
import React, { useState } from 'react'
import Container from '../../component/view/Container'
import Header from '../../component/header/Header'
import { COLORS, ICONS, IMAGES, USERS } from '../../constant/constant'
import Button from '../../component/button/Button'
import DropDownPicker from 'react-native-dropdown-picker'
// import Modal from "react-native-modal"

const OrderDetails = () => {

  const [isModalVisible,setIsModalVisible] = useState(false)
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      { label: 'Ready for Pick', value: 'Ready for Pick' },
      { label: 'In Progress', value: 'In Progress' },
      { label: 'Received', value: 'Received' }
    ]);

  const showModal = () =>{
    setIsModalVisible(true)
  }

  const cancelModal = () =>{
    setIsModalVisible(false)
  }

  const renderModal = () =>{
    return(
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

                  <Text style={styles.modalText}>Work done Successful !</Text>
                </View>
                <View style={styles.modalButtonsContainer}>
                  <TouchableOpacity style={styles.cancelButtonStyle} onPress={cancelModal}>
                    <Text style={styles.cancelButtonText}>cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.orderButtonStyle}
                  >
                    <Text style={styles.orderTextStyle}>Order Completed</Text>
                  </TouchableOpacity>
                </View>
                
                <TouchableOpacity style={styles.crossIconContainer} onPress={cancelModal}>
                  <Image source={ICONS.cancel} style={{width:28,height:28}} />
                </TouchableOpacity>
              </View>
            </View>
        </Modal>
    )
  }

  return (
    <View>
        <Container containerStyle={{paddingBottom:0}}>
          <Header title='Order Details' />

          <View style={styles.orderItemContainer}>
            <View style={styles.imageContainer}>
            <Image source={USERS.user1} style={styles.orderImage} />
            </View>
            <View style={styles.orderDetails}>
            <Text style={styles.orderName}>Roxanne Jaskolski</Text>
            <Text style={styles.orderDateTime}>13-05-2025 07:30 PM</Text>
            <View style={styles.servicesContainer}>
                {["Iron","Dry Clean","Washing"].map((service, index) => (
                <Text key={index} style={styles.serviceText} ellipsizeMode='tail'>
                    {service}
                </Text>
                ))}
            </View>
            </View>
            <View style={styles.priceContainer}>
            <View style={styles.priceRow}>
                <Image source={ICONS.rupees} style={styles.rupeesIcon} />
                <Text style={styles.orderPrice}>130</Text>
            </View>
            </View>
          </View>

          <View style={{width:"100%",height:"80%"}}>
            <View style={styles.lockboxAndCallIconContainer}>
                <Text style={styles.lockboxText}>lock box drop off</Text>
                <TouchableOpacity style={styles.callIconButton}>
                    <Image source={ICONS.phone} style={styles.callIconImage} />
                    <Text style={styles.callText}>Call</Text>
                </TouchableOpacity>
            </View>

            <View style={{flex:0.5,paddingTop:10}}>
                <View style={styles.serviceItemContainer}>
                  <View style={styles.serviceItemTextAndQuantityContainer}>
                    <Text style={styles.serviceItemNameText}>T-shirt</Text>
                    <DropDownPicker
                      open={open}
                      value={value}
                      items={items}
                      setOpen={setOpen}
                      setValue={setValue}
                      setItems={setItems}
                      dropDownContainerStyle={styles.dropDownContainerStyle}
                      style={styles.dropDownContainerStyle}
                      textStyle={styles.dropDownTextStyle}
                      placeholder="Iron  $3/unit"
                    />
                  </View>

                  <View style={{flex:0.2}}>
                    <View style={styles.priceAndQuantityContainer}>
                        <Text style={styles.priceText}>$  12</Text>
                    </View>
                    <View style={styles.quantityContainer}>
                      <View style={styles.quantityContainer2}>
                        <Text style={{fontSize:16,fontWeight:"600",color:COLORS.white}}> <Text onPress={()=>console.log("reduce item")}>-</Text> {" "} 4 {" "} <Text onPress={()=>console.log("increase item")}>+</Text></Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* extra */}
                <View style={{
                  width:"100%",
                  height:105,
                  backgroundColor:COLORS.orderItemBackgroundColor,
                  marginVertical:10,
                  borderRadius:8,
                  flexDirection:"row",
                  paddingVertical:14,
                  paddingHorizontal:16
                }}>
                  <View style={{flex:0.8,justifyContent:"space-around",alignItems:"flex-start"}}>
                    <Text style={{fontSize:20,lineHeight:24,color:COLORS.black,fontWeight:"700"}}>Jeans</Text>
                    <Text style={{fontSize:16,lineHeight:18,fontWeight:"600",color:COLORS.black}}>Wash <Text style={{fontSize:14,fontWeight:"500"}}> $ 3 / Unit</Text></Text>
                  </View>
                  <View style={{flex:0.2}}>
                    <View style={{flex:0.5,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                        <Text style={{
                          fontSize:20,
                          color:COLORS.primary,
                          fontWeight:"600"
                        }}>$  12</Text>
                    </View>
                    <View style={{flex:0.5,justifyContent:"center",alignItems:"center"}}>
                      <TouchableOpacity style={{width:70,height:32,justifyContent:"center",alignItems:"center",backgroundColor:COLORS.primary,borderRadius:8}}>
                        <Text style={{fontSize:16,fontWeight:"600",color:COLORS.white}}>1</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <TouchableOpacity style={styles.outlinedButtonStyle}>
                  <Text style={styles.outlineButtonText}>Start Work</Text>
                </TouchableOpacity>
            </View>

          </View>
        </Container>
        
        <View style={styles.bottomModalButtonContainer}>
            <Button onPress={showModal} title='Complete the work' />
        </View>

        {renderModal()}
    </View>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    paddingBottom: 0,
  },
  callText:{fontWeight:"600",color:COLORS.white},
  callIconImage:{width:14,right:14,resizeMode:"contain"},
  callIconButton:{
    width:90,
    height:40,
    borderRadius:12,
    backgroundColor:
    COLORS.primary,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"
},
  lockboxText:{fontSize:16,fontWeight:"700",color:COLORS.black},
  lockboxAndCallIconContainer:{flex:0.1,flexDirection:"row",justifyContent:"space-between",alignItems:"center"},
  outlineButtonText:{fontSize:17,lineHeight:18,color:COLORS.primary,fontWeight:"600"},
  outlinedButtonStyle:{
    width:"100%",
    height:52,
    borderRadius:8,
    justifyContent:"center",
    alignItems:"center",
    borderWidth:1,
    borderColor:COLORS.primary,
    marginTop:10
    },
  quantityContainer2:{width:70,height:32,justifyContent:"center",alignItems:"center",backgroundColor:COLORS.primary,borderRadius:8},
  quantityContainer:{flex:0.5,justifyContent:"center",alignItems:"center"},
  priceText:{
    fontSize:20,
    color:COLORS.primary,
    fontWeight:"600"
  },
  priceAndQuantityContainer:{flex:0.5,flexDirection:"row",justifyContent:"space-evenly",alignItems:"center"},
  dropDownTextStyle:{
    fontSize:14,
    fontWeight:"600",
    color:"black",
    paddingHorizontal:10
  },
  dropDownContainerStyle:{
    width:"85%",
    borderColor:COLORS.borderColor,
    borderRadius:20,
    marginTop:10,
    // paddingHorizontal:10
  },
  serviceItemNameText:{fontSize:20,lineHeight:24,color:COLORS.black,fontWeight:"700"},
  serviceItemTextAndQuantityContainer:{flex:0.8,justifyContent:"space-around",alignItems:"flex-start"},
  serviceItemContainer:{
    width:"100%",
    height:120,
    backgroundColor:COLORS.orderItemBackgroundColor,
    marginVertical:10,
    borderRadius:8,
    flexDirection:"row",
    paddingVertical:14,
    paddingHorizontal:16
  },
  crossIconContainer:{
    justifyContent:"center",
    alignItems:"center",
    position:"absolute",
    top:10,
    right:10
  },
  orderTextStyle:{fontSize:14,fontWeight:"500",color:COLORS.white},
  orderButtonStyle:{
    width:"48%",
    height:48,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:COLORS.primary,
    borderRadius:8
  },
  cancelButtonText:{fontSize:14,fontWeight:"500"},
  cancelButtonStyle:{
    width:"48%",
    height:48,
    justifyContent:"center",
    alignItems:"center",
    borderWidth:1,
    borderColor:'gray',
    borderRadius:8
  },
  modalButtonsContainer:{flex:0.3,flexDirection:"row",justifyContent:"space-between",alignItems:"center"},
  modalText:{fontSize:18,fontWeight:"700",color:COLORS.black,marginTop:10},
  modalImageStyle: {width:66,height:66,resizeMode:"contain"},
  modalImageContainer:{width:106,height:106,borderRadius:106,backgroundColor:"#FFEA9F",justifyContent:"center",alignItems:"center"},
  modalImageAndTextContainer:{flex:0.7,justifyContent:"center",alignItems:"center"},
  modalBoxContainer:{width:"96%",height:300,borderRadius:16,backgroundColor:COLORS.white,padding:16},
  modalContainer:{flex:1,justifyContent:"center",alignItems:"center",padding:16},
  bottomModalButtonContainer:{
    width:"100%",
    height:"10%",
    backgroundColor:"white",
    position:"absolute",
    bottom:0,
    justifyContent:"center",
    alignItems:"center",
    paddingHorizontal:16,
    borderTopLeftRadius:25,
    borderTopRightRadius:25,
    elevation:10,
    shadowOpacity:0.9,shadowColor:"black",shadowOffset:{width:0,height:10}
  },
  topSection: {
    width: '100%',
    height: '15%',
  },
  bottomSection: {
    width: '100%',
    height: '85%',
    paddingTop: 10,
  },
  headerContainer: {
    width: '100%',
    height: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 45,
    height: 50,
    resizeMode: 'contain',
  },
  laundryLogo: {
    width: '45%',
    height: 29,
  },
  notificationIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
  filterButton: {
    width: 52,
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.borderColor,
  },
  filterIcon: {
    width: 22,
    height: 22,
    resizeMode: 'center',
  },
  searchContainer: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
  },
  searchField: {
    width: '100%',
    height: 60,
    backgroundColor: COLORS.search_field_color,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderColor,
  },
  searchIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginHorizontal: 12,
  },
  searchInput: {
    flex: 1,
  },
  pendingOrdersText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.black,
    lineHeight: 19,
  },
  listContainer: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  orderItemContainer: {
    width: '100%',
    height: "10%",
    flexDirection: 'row',
    marginVertical: 30,
  },
  imageContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    resizeMode: 'contain',
  },
  orderDetails: {
    flex: 0.7,
    justifyContent: 'space-around',
    paddingLeft: 12,
  },
  orderName: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
    lineHeight: 19,
  },
  orderDateTime: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.black,
    lineHeight: 20,
  },
  servicesContainer: {
    flexDirection: 'row',
  },
  serviceText: {
    backgroundColor: '#FFF3FA',
    color: COLORS.black,
    fontWeight: '500',
    fontSize: 14,
    padding: 4,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  priceContainer: {
    flex: 0.1,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rupeesIcon: {
    width: 10,
    height: 12,
    resizeMode: 'contain',
  },
  orderPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
  },
});

export default OrderDetails