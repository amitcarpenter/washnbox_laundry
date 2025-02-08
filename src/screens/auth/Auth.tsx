import { View, Text,FlatList } from 'react-native'
import React from 'react'

const Auth = () => {
  return (
    <FlatList
        data={[]}
        renderItem={(item)=>{
            return(
                <View>

                </View>
            )
        }}
        pagingEnabled
    />
  )
}

export default Auth