import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
import React from 'react';
import Container from '../../component/view/Container';
import { COLORS, HomeScreenData, ICONS, IMAGES } from '../../constant/constant';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {

  const navigation = useNavigation()

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
      <TouchableOpacity style={styles.filterButton}>
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

export default HomeScreen;
