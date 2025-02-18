import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, FlatList, Dimensions, Platform, Alert, BackHandler } from 'react-native';
import React, { useEffect, useState } from 'react';
import Container from '../../component/view/Container';
import { COLORS, HomeScreenData, ICONS, IMAGES } from '../../constant/constant';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal"
import Header from '../../component/header/Header';
import CheckBox from 'react-native-check-box';
import Dropdown from "react-native-dropdown-picker"
import { PROVIDER_URLS } from '../../utils/config';
import { getUserToken, makeGetApiCall } from '../../utils/helper';
import AsyncStorage from '@react-native-async-storage/async-storage';


const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height


const HomeScreen = () => {
  
  const navigation = useNavigation()
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Ready for Pick', value: 'Ready for Pick' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Received', value: 'Received' }
  ]);

  const [openPayStatus, setOpenPayStatus] = useState(false)
  const [payStatusValue, setPayStatusValue] = useState(null)
  const [payStatusItems, setPayStatusItems] = useState([
    { label: 'Cash on Delivery', value: 'Cash on Delivery' },
    { label: 'Paid', value: 'Paid' },
    // { label: 'Ready for Pick', value: 'Ready for Pick' }
  ]);
  const [token, setToken] = useState("")

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          "Exit App",
          "Are you sure you want to exit?",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Yes", onPress: () => BackHandler.exitApp() },
          ],
          { cancelable: false }
        );
        return true;
      };

      const backHandler = BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => backHandler.remove()
    }, [])
  );

  useEffect(()=>{
    getToken()
    fetchAllOrders()
  },[token])

  const getToken = async () =>{
    let token = await getUserToken()
    // console.log("token =>",token)
    setToken(token)
  }

  const fetchAllOrders = async () =>{
    let url = PROVIDER_URLS.GET_PROVIDER_ORDERS
    let response = await makeGetApiCall(url,token)
    console.log("Home Screen Data =====>",response)
  }


  // <--------- Below this we have all the UI stuff ------->

  const renderSearchField = () => (
    <View style={styles.searchContainer}>
      <View style={styles.searchField}>
        <Image source={ICONS.search} style={styles.searchIcon} />
        <TextInput placeholder='Search' style={styles.searchInput} />
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Image source={IMAGES.logo} style={styles.logo} />
      <Image source={IMAGES.my_laundry} style={styles.laundryLogo} resizeMode='contain' />
      <TouchableOpacity onPress={()=>navigation.navigate("NotificationScreen")}>
        <Image source={ICONS.notification_bell} style={styles.notificationIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={openFilterModal} style={styles.filterButton}>
        <Image source={ICONS.filter} style={styles.filterIcon} />
      </TouchableOpacity>
    </View>
  );

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItemContainer}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.orderImage} />
      </View>
      <View style={styles.orderDetails}>
        <Text style={styles.orderName}>{item.name}</Text>
        <Text style={styles.orderDateTime}>{item.date_time}</Text>
        <View style={styles.servicesContainer}>
          {item.services.map((service, index) => (
            <Text key={index} style={styles.serviceText} ellipsizeMode='tail'>
              {service}
            </Text>
          ))}
        </View>
      </View>
      <View style={styles.priceContainer}>
        <View style={styles.priceRow}>
          <Image source={ICONS.rupees} style={styles.rupeesIcon} />
          <Text style={styles.orderPrice}>{item.price}</Text>
        </View>
      </View>
    </View>
  );

  const renderOrdersList = () =>{
    return(
      <FlatList
          data={HomeScreenData}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          renderItem={renderOrderItem}
          keyExtractor={(item, index) => index.toString()}
      />
    )
  }

  const closeFilterModal = () =>{
    setIsFilterModalOpen(false)
  }

  const openFilterModal = () =>{
    setIsFilterModalOpen(true)
  }

  const renderFilterModal = () => {
    return(
      <View style={{flex:1}}>
        <Modal 
          style={{margin:0}} 
          animationIn="slideInRight" 
          isVisible={isFilterModalOpen} 
          onBackdropPress={closeFilterModal}
          animationOut={"slideOutRight"}
          backdropOpacity={0.2}
        >
        <View style={{
          width:"70%",
          height:"100%",
          borderTopLeftRadius:50,
          borderBottomLeftRadius:20,
          backgroundColor:"white",
          alignSelf:"flex-end",
          padding:16
        }}>
          <View style={{flex:0.15,justifyContent:"center"}}>
            <Header 
              onFilterPress={closeFilterModal} 
              title='Filters'
              isFilter={false}
            />
          </View>
          <View style={{flex:0.85,paddingVertical:10}}>
            <View>
              <Text style={{
                fontSize:16,
                fontWeight:"600",
                color:COLORS.primary,
                marginBottom:15
              }}>Order Status</Text>

              <View style={{flexDirection:"row",alignItems:"center"}}>
                <CheckBox
                  onClick={()=>{}}
                  isChecked={true}
                  rightText=' '
                  checkBoxColor={COLORS.primary}
                />
                <Dropdown 
                  open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    dropDownContainerStyle={{
                      borderColor:COLORS.borderColor,
                      width:"85%",
                      marginHorizontal:10,
                      marginRight:-20,
                    }}
                    style={{
                      marginHorizontal:10,
                      width:"85%",
                      borderColor:COLORS.borderColor
                    }}
                    textStyle={{
                      fontSize:14,
                      fontWeight:"600",
                      color:"black",
                    }}
                    placeholder="Ready for Pick"
                />
              </View>
              
            </View>
            <View style={{paddingTop:20}}>
              <Text style={{
                fontSize:16,
                fontWeight:"600",
                color:COLORS.primary,
                marginBottom:15
              }}>Pay Status</Text>
              
              <View style={{flexDirection:"row",alignItems:"center"}}>
                  <CheckBox
                    onClick={()=>{}}
                    isChecked={true}
                    rightText=' '
                    checkBoxColor={COLORS.primary}
                  />
                <Dropdown 
                  open={openPayStatus}
                  value={payStatusValue}
                  items={payStatusItems}
                  setOpen={setOpenPayStatus}
                  setValue={setPayStatusValue}
                  setItems={setPayStatusItems}
                  dropDownContainerStyle={{
                    borderColor:COLORS.borderColor,
                    width:"85%",
                    marginHorizontal:10,
                    marginRight:-20,
                  }}
                  style={{
                    marginHorizontal:10,
                    width:"85%",
                    borderColor:COLORS.borderColor
                  }}
                  textStyle={{
                    fontSize:14,
                    fontWeight:"600",
                    color:"black",
                  }}
                  placeholder="Cash on Delivery"
                />
              </View>
              
            </View>
          </View>
        </View>
      </Modal>
      </View>
    )
  }

  return (
    <Container containerStyle={styles.containerStyle}>
      <View style={styles.topSection}>
        {renderHeader()}

        {renderSearchField()}
      </View>

      <View style={styles.bottomSection}>
        <Text style={styles.pendingOrdersText}>New Pending Orders</Text>
        {renderOrdersList()}
      </View>

      {renderFilterModal()}
    </Container>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    paddingBottom: 0,
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
    height: 90,
    flexDirection: 'row',
    marginVertical: 10,
    // backgroundColor:"red"
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
    flex: 0.68,
    justifyContent: 'space-around',
    paddingLeft: 12,
    paddingVertical: 5,
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
    flex: 0.12,
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

export default HomeScreen;
