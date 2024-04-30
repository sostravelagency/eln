import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useContext } from "react";
import Icon from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import StackHome from "../stack/StackHome";
import About from "../screen/About";
import Course from "../screen/Course";
import Policy from "../screen/Policy";
import FAQ from "../screen/FAQ";
import { AppContext } from "../../App";
import Me from "../screen/Me";
import { Text } from "react-native";
import LoginTabScreen from "../screen/LoginTab";

const Tab = createBottomTabNavigator();

const WrapTab = () => {
  const { auth, user } = useContext(AppContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName;
          let color;
          if (route.name === "StackHome") {
            iconName = focused ? "home" : "home";
            color = focused ? "#2e89ff" : "#555";
          } else if (route.name === "Course") {
            iconName = focused ? "drive" : "drive";
            color = focused ? "#2e89ff" : "#555";
          } else if (route.name === "About") {
            iconName = focused ? "shield" : "shield";
            color = focused ? "#2e89ff" : "#555";
          } else if (route.name === "Policy") {
            iconName = focused ? "policy" : "policy";
            color = focused ? "#2e89ff" : "#555";
          } else if (route.name === "FAQ") {
            iconName = focused ? "question-answer" : "question-answer";
            color = focused ? "#2e89ff" : "#555";
          } else if (route.name === "Me") {
            iconName = focused ? "user" : "user";
            color = focused ? "#2e89ff" : "#555";
          }
          else if (route.name === "LoginTab") {
            iconName = focused ? "user" : "user";
            color = focused ? "#2e89ff" : "#555";
          }
          

          if (route.name === "Policy" || route.name === "FAQ") {
            return <MaterialIcons name={iconName} size={size} color={color} />;
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarLabel: ({ focused, color }) => {
          let label;

          if (route.name === "StackHome") {
            label = "Home";
          } else if (route.name === "Course") {
            label = "Courses";
          } else if (route.name === "About") {
            label = "About";
          } else if (route.name === "Policy") {
            label = "Policy";
          } else if (route.name === "FAQ") {
            label = "FAQ";
          } else if (route.name === "Me") {
            label = "Me";
          }
          else if (route.name === "LoginTab") {
            label = "Login";
          }

          return <Text style={{ color, fontSize: 12 }}>{label}</Text>;
        },
      })}
    >
      <Tab.Screen
        name="StackHome"
        component={StackHome}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Course"
        component={Course}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="About"
        component={About}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Policy"
        component={Policy}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="FAQ" component={FAQ} options={{ headerShown: false }} />
      {auth === true && (
        <Tab.Screen name="Me" component={Me} options={{ headerShown: false }} />
      )}
      {auth === false && (
        <Tab.Screen name="LoginTab" component={LoginTabScreen} options={{ headerShown: false }} />
      )}
    </Tab.Navigator>
  );
};

export default WrapTab;
