import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import React from "react";
import { Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./app/screen/HomeScreen";
import Icon from "react-native-vector-icons/Entypo";
import Course from "./app/screen/Course";

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, size }) => {
              let iconName;
              let color;
              if (route.name === "Home") {
                iconName = focused ? "home" : "home";
                color= focused ? "#2e89ff" : "#555"
              } else if (route.name === "Course") {
                iconName = focused ? "drive" : "drive";
                color= focused ? "#2e89ff" : "#555"
              }
              else if (route.name === "About") {
                iconName = focused ? "shield" : "shield";
                color= focused ? "#2e89ff" : "#555"
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Course"
            component={Course}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="About"
            component={Course}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
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
