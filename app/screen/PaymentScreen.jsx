import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { View, Button, Alert } from "react-native";
import { WebView } from "react-native-webview";
import create_order from "../api/post/create-order";
import { AppContext } from "../../App";

const PaymentScreen = () => {
  const {setChange }= useContext(AppContext)
  const navigation= useNavigation()
  const route = useRoute();
  const { paymentLink, courseId } = route.params;
  console.log(route.params);
  const [webViewVisible, setWebViewVisible] = useState(false);

  const openPaymentWebView = () => {
    setWebViewVisible(true);
  };

  const handlePaymentResult = async (navState) => {
    const { url } = navState;
    console.log(url)

    if (url.includes("payment-success")) {
      try {
        const result= await create_order({courseId})
        setChange(prev=>!prev)
       Alert.alert("Thanh toán thành công!")
       navigation.navigate("DetailCourse", {courseId, purchase: true})

      } catch (error) {
        console.log(error)
        Alert.alert("Thanh toán thất bại!")
        navigation.navigate("DetailCourse", {courseId, purchase: false})

      }
      
      setWebViewVisible(false); 
    } else if (url.includes("payment-cancel")) {
      Alert.alert("Đã hủy thanh toán.");
      navigation.navigate("DetailCourse", {courseId, purchase: false})
      setWebViewVisible(false); 
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Nút để mở WebView */}
      <Button title="Mở trang thanh toán" onPress={openPaymentWebView} />
      {webViewVisible && <WebView  onNavigationStateChange={handlePaymentResult} source={{ uri: paymentLink }} />}
    </View>
  );
};

export default PaymentScreen;
