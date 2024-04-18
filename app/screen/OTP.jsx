import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Alert,
} from "react-native";
import activation from "../api/post/activation";

const OTPScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { activationToken } = route.params;

  // References for OTP input fields
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);
  const [v1, setV1] = useState();
  const [v2, setV2] = useState();
  const [v3, setV3] = useState();
  const [v4, setV4] = useState();

  const handleVerifyOTP = async () => {
    const otpValue = `${v1}${v2}${v3}${v4}`;
    try {
      const result = await activation({
        activation_code: otpValue,
        activation_token: activationToken,
      });
      console.log(result)
      if (result?.success === true) {
        alert("OTP verified successfully!, Signup successfully");
        navigation.navigate("Home");
      } else {
        alert("Invalid OTP. Please try again.");
        input1Ref.current.clear();
        input2Ref.current.clear();
        input3Ref.current.clear();
        input4Ref.current.clear();
        input1Ref.current.focus();
      }
    } catch (error) {
      Alert.alert(error?.response?.data?.message);
      input1Ref.current.clear();
      input2Ref.current.clear();
      input3Ref.current.clear();
      input4Ref.current.clear();
      input1Ref.current.focus();
    }
  };

  const handleInputChange = (text, inputRef) => {
    // Move focus to the next input when a digit is entered
    if (text?.length > 0 && inputRef?.current) {
      inputRef.current.focus();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.subTitle}>
        An OTP (One Time Password) has been sent to your mobile number.
      </Text>
      <View style={styles.otpInputContainer}>
        <TextInput
          ref={input1Ref}
          style={styles.otpInput}
          keyboardType="number-pad"
          maxLength={1}
          onChangeText={(text) => {
            handleInputChange(text, input2Ref);
            setV1(text);
          }}
        />
        <TextInput
          ref={input2Ref}
          style={styles.otpInput}
          keyboardType="number-pad"
          maxLength={1}
          onChangeText={(text) => {
            handleInputChange(text, input3Ref);
            setV2(text);
          }}
        />
        <TextInput
          ref={input3Ref}
          style={styles.otpInput}
          keyboardType="number-pad"
          maxLength={1}
          onChangeText={(text) => {
            handleInputChange(text, input4Ref);
            setV3(text);
          }}
        />
        <TextInput
          ref={input4Ref}
          style={styles.otpInput}
          keyboardType="number-pad"
          maxLength={1}
          onChangeText={(text) => {
            handleInputChange(text, null);
            setV4(text);
          }}
        />
      </View>
      <TouchableOpacity style={styles.resendContainer}>
        <Text style={styles.resendText}>Resend OTP</Text>
      </TouchableOpacity>
      <Button title="Verify OTP" onPress={handleVerifyOTP} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  otpInputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    fontSize: 24,
    textAlign: "center",
    marginHorizontal: 5,
  },
  resendContainer: {
    marginBottom: 20,
  },
  resendText: {
    color: "blue",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

export default OTPScreen;
