import React, { useContext, useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { AppContext } from "../../../App";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import update_avatar from "../../api/put/update_avatar";
import update_user_info from "../../api/put/update_user_info";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Info = () => {
  const { user, setUser, setAuth } = useContext(AppContext);
  const [fullName, setFullName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatar, setAvatar] = useState(user?.avatar?.url || null);

  const handleChooseAvatar = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.cancelled) {
        const base64 = await convertImageToBase64(result.assets[0].uri);
        try {
          const result = await update_avatar({ avatar: `data:image/jpg;base64,${base64}` });
          console.log(result);
        } catch (error) {
          console.log(error.response.data);
        }
        setAvatar(`data:image/jpg;base64,${base64}`);
      }
    } catch (error) {
      Alert.alert(error?.response?.data?.message);
      console.log(error);
    }
  };

  const convertImageToBase64 = async (imageUri) => {
    const base64 = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return base64;
  };

  const handleSave = async () => {
    try {
      const result = await update_user_info({ name: fullName });
      Alert.alert("Thông báo", "Thông tin đã được lưu thành công.");
    } catch (error) {
      Alert.alert(error?.response?.data?.message);
    }
  };

  const handleLogout = async () => {
    // Perform logout actions here, such as clearing user data or session
    setUser(null); // Assuming setUser method sets user state to null or default
    // You can also navigate to a login screen or perform other cleanup tasks
    setAuth(false)
    setUser()
    await AsyncStorage.removeItem("accessToken")
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleChooseAvatar}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <Image source={{ uri: user?.avatar?.url }} style={styles.avatar} />
        )}
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={(text) => setFullName(text)}
      />
      <TextInput
        readOnly
        style={styles.input}
        placeholder="Email Address"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white"
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Info;
