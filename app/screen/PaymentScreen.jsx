import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Button, Alert } from "react-native";
import { WebView } from "react-native-webview";

const PaymentScreen = () => {
  const navigation= useNavigation()
  const route = useRoute();
  const { paymentLink, courseId } = route.params;
  console.log(route.params);
  const [webViewVisible, setWebViewVisible] = useState(false);

  const openPaymentWebView = () => {
    setWebViewVisible(true);
  };

  const handlePaymentResult = (navState) => {
    const { url } = navState;
    console.log(url)

    if (url.includes("payment-success")) {
      Alert.alert("Thanh toán thành công!")
      navigation.navigate("DetailCourse", {courseId, purchase: true})
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
