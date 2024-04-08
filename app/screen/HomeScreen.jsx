import React from 'react'
import { Image, ScrollView, Text, TextInput, TouchableHighlight, View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import CourseList from '../component/Home/CourseList'
import Header from '../component/Header/Header'
const HomeScreen = () => {
  return (
    <ScrollView style={{flex: 1, backgroundColor: "white"}}>
      <Header />
      <View style={{width: "100%", display: 'flex', justifyContent: "center", alignItems: "center", padding: 10, marginBottom: 36}}>
        <Image source={{uri: "https://res.cloudinary.com/cockbook/image/upload/v1712546859/single/banner-img-2_zywejk.webp"}} style={{width: 300, height: 350, objectFit: "contain"}} />
      </View>
      <View style={{display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 24, padding: 10}}>
        <Text style={{fontSize: 32, fontWeight: "600", textAlign: "center", marginBottom: 12}}>Improve Your Online</Text>
        <Text style={{fontSize: 32, fontWeight: "600", textAlign: "center", marginBottom: 12}}>Learning Experience Better</Text>
        <Text style={{fontSize: 32, fontWeight: "600", textAlign: "center", marginBottom: 12}}>Instantly</Text>
      </View>
      <View style={{display: "flex", justifyContent: "center", alignItems: "center", padding: 10}}>  
            <Text style={{fontSize: 17, color: "#000000ac", fontWeight: "600", textAlign: "center", marginBottom: 12}}>We have 40K+ Online courses & 500k+ Online</Text>
            <Text style={{fontSize: 17, color: "#000000ac", fontWeight: "600", textAlign: "center", marginBottom: 12}}>registered student. Find your desired Courses from</Text>
            <Text style={{fontSize: 17, color: "#000000ac", fontWeight: "600", textAlign: "center", marginBottom: 12}}>them.</Text>
      </View>
      <View style={{display: "flex", justifyContent: "center", alignItems: "center", padding: 10, width: "100%"}}>
        <View style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'row'}}>
            <TextInput style={{height: 40, flex: 1, borderBottomLeftRadius: 5, borderTopLeftRadius: 5, padding: 10, borderColor: "#e7e7e7", borderWidth: 1}} placeholder="Search Courses..." />
            <TouchableHighlight underlayColor={"unset"}>
                <View style={{height: 40, width: 40, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#39c1f3", borderTopRightRadius: 5, borderBottomRightRadius: 5}}>
                    <MaterialIcons name="search" size={24} color="white" />
                </View>
            </TouchableHighlight>
        </View>
      </View>
      <View style={{display: "flex", justifyContent: "center", alignItems: "center", padding: 10}}>  
            <Text style={{fontSize: 24, color: "#000", fontWeight: "900", textAlign: "center", marginBottom: 12}}>Expand Your Career</Text>
            <Text style={{fontSize: 24, color: "#5648d7", fontWeight: "900", textAlign: "center", marginBottom: 12}}>Opportunity</Text>
            <Text style={{fontSize: 24, color: "#000", fontWeight: "900", textAlign: "center", marginBottom: 12}}>Opportunity With Our Courses</Text>
      </View>
      <CourseList />
    </ScrollView>
  )
}

export default HomeScreen
