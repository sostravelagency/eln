import React from 'react'
import { Text, View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const Header = () => {
  return (
    <View style={{width: "100%", display: "flex", justifyContent: "space-between", padding: 10, flexDirection: "row", alignItems: "center", borderBottomColor: "#e7e7e7", borderBottomWidth: 1, borderStyle: "solid"}}>
        <Text style={{fontSize: 36, fontWeight: "600"}}>Elearning</Text>
        <Text style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <MaterialIcons name="light-mode" size={24} />
        </Text>
    </View>
  )
}

export default Header
