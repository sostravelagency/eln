import React, { useContext, useEffect } from "react";
import { ScrollView, Text, View, Linking, Alert } from "react-native";
import { CourseAccessContext } from "../../screen/CourseAccess";

const Resources = ({ route }) => { 
  const { dataCurrent } = useContext(CourseAccessContext);

  const handleOpenLink= (url)=> {
    Linking.canOpenURL(url).catch(err=> {
        Alert.alert("Cannot open url ", err)
    })
  }
  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingTop: 12}}>
      <ScrollView>
        {
            dataCurrent?.links?.map((item, key)=> <View key={key}>
                <Text style={{fontSize: 16}}>{item.title}</Text>
                <Text onPress={()=> handleOpenLink(item.url)} style={{fontSize: 16, fontWeight: "600", color: "#2e89ff"}}>{item.url}</Text>
            </View>)
        }
      </ScrollView>
    </View>
  );
};

export default Resources;
