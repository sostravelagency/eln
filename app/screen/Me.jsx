import React from "react";
import { ScrollView, Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Info from "../subscreen/me/info";
import ChangePass from "../subscreen/me/changepass";
import CourseRegister from "../subscreen/me/course_register";

const Tab = createMaterialTopTabNavigator();

const Me = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Tab.Navigator>
        <Tab.Screen
          name="Info"
          component={Info}
          options={{ title: "Information" }}
        />
        <Tab.Screen
          name="ChangePass"
          component={ChangePass}
          options={{ title: "Password" }}
        />
         <Tab.Screen
          name="EnrollCourse"
          component={CourseRegister}
          options={{ title: "Enroll courses" }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default Me;
