import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screen/HomeScreen';
import SearchScreen from '../screen/Search';
import DetailCourse from '../screen/DetailCourse';
import CourseAccess from '../screen/CourseAccess';

const Stack = createStackNavigator();

const StackHome = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        
         {/* <Stack.Screen name="Notifications" component={Notifications} /> */}
    </Stack.Navigator>      
  )
}

export default StackHome
