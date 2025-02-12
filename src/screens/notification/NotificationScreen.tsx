import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Container from '../../component/view/Container'
import Header from '../../component/header/Header'
import { COLORS, ICONS, IMAGES, NotificationData, USERS } from '../../constant/constant'

const NotificationScreen = () => {


  const renderNotificationsItem = (item:any) =>{
    return(
        <View style={styles.notificationCard}>
            <View style={styles.rowContainer}>

                <View style={styles.iconContainer}>
                    <Image source={ICONS.picking_box} style={styles.icon} />
                </View>

                <View style={styles.textContainer}>
                    <View style={styles.titleRow}>
                        <Text style={styles.title}>An Order received</Text>
                    </View>
                    <View style={styles.userRow}>
                        <Image source={USERS.user1} style={styles.userImage} />
                        <Text style={styles.userName}>Albert papsen</Text>
                    </View>
                </View>

                <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>{item.date}</Text>
                    <Text style={styles.timeText}>{item.time}</Text>
                </View>

            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.detailsButton}>
                    <Text style={styles.detailsButtonText}>See Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
  }
  return (
    <Container containerStyle={{paddingBottom:0}}>

        <Header title='Notifications' />

        <FlatList
            data={NotificationData}
            contentContainerStyle={styles.flatListContainer}
            renderItem={({item})=>renderNotificationsItem(item)}
        />
    </Container>
  )
}

const styles = StyleSheet.create({
    flatListContainer: {
        paddingTop: 20,
    },
    notificationCard: {
        width: "100%",
        height: 135,
        backgroundColor: "#F1F1F1",
        marginVertical: 10,
        borderRadius: 8,
    },
    rowContainer: {
        flex: 0.6,
        flexDirection: "row",
    },
    iconContainer: {
        flex: 0.2,
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        width: 30,
        height: 30,
        resizeMode: "contain",
    },
    textContainer: {
        flex: 0.6,
    },
    titleRow: {
        flex: 0.5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontSize: 16,
        fontWeight: "500",
    },
    userRow: {
        flex: 0.5,
        flexDirection: "row",
        alignItems: "center",
    },
    userImage: {
        width: 30,
        height: 30,
        borderRadius: 30,
        resizeMode: "contain",
    },
    userName: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.black,
        marginHorizontal: 10,
    },
    timeContainer: {
        flex: 0.2,
        justifyContent: "space-evenly",
        alignItems: "flex-end",
        paddingHorizontal: 10,
    },
    timeText: {
        fontSize: 14,
        fontWeight: "600",
    },
    buttonContainer: {
        flex: 0.4,
        alignItems: "center",
        paddingTop: 10,
    },
    detailsButton: {
        width: "90%",
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.primary,
        borderRadius: 5,
    },
    detailsButtonText: {
        fontSize: 14,
        fontWeight: "700",
        color: COLORS.white,
    },
})

export default NotificationScreen;
