import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import React, { createContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { ThemeProvider } from "@rneui/themed";
import { createStackNavigator } from "@react-navigation/stack";
import WrapTab from "./app/tab/WrapTab";
import LoginScreen from "./app/screen/Login";
import RegisterScreen from "./app/screen/Register";
import AsyncStorage from "@react-native-async-storage/async-storage";
import get_me from "./app/api/get/me";
import { LogBox } from 'react-native';
import DetailCourse from "./app/screen/DetailCourse";
import CourseAccess from "./app/screen/CourseAccess";
import OTPScreen from "./app/screen/OTP";

LogBox.ignoreLogs(['WARN  Require cycle: App.js']);

const Stack = createStackNavigator();

export const AppContext = createContext();
export default function App() {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState();
  useEffect(() => {
    checkToken();
  }, []);
  const checkToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem('accessToken');
      const result= await get_me(userToken)
      if(result.success=== true) {
        setAuth(true)
        setUser(result.user)
      }

    } catch (error) {
      console.error('Error retrieving token:', error);
      setAuth(false)
      
    }
  };
  return (
    <AppContext.Provider value={{ auth, user, setAuth, setUser }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="WrapTab" component={WrapTab} />
            <Stack.Screen name="DetailCourse" component={DetailCourse} />
            <Stack.Screen name="CourseAccess" component={CourseAccess} />
            {
              auth=== false &&
              <>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="OTP" component={OTPScreen} />
              </>
            }
            {/* <Stack.Screen name="Notifications" component={Notifications} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
