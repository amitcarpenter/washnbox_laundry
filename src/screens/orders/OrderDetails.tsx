import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Container from '../../component/view/Container'
import Header from '../../component/header/Header'
import { COLORS, ICONS, IMAGES, USERS } from '../../constant/constant'

const OrderDetails = () => {
  return (
    <Container>

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

        <View>
            
            <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                <Text style={{fontSize:16,fontWeight:"700",color:COLORS.black}}>lock box drop off</Text>
                <TouchableOpacity style={{
                    width:90,
                    height:40,
                    borderRadius:12,
                    backgroundColor:
                    COLORS.primary,
                    flexDirection:"row",
                    justifyContent:"center",
                    alignItems:"center"
                }}>
                    <Image source={ICONS.phone} style={{width:14,right:14,resizeMode:"contain"}} />
                    <Text style={{fontWeight:"600",color:COLORS.white}}>Call</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Container>
  )
}

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