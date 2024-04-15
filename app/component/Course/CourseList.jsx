import React, { useContext, useEffect, useState } from "react";
import { Image, Text, TouchableHighlight, View } from "react-native";
import get_course_list from "../../api/get/get_course_list";
import { Rating } from "react-native-ratings";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../../../App";

const CourseListCourse = () => {
  const [data, setData] = useState([]);
  const navigation= useNavigation()
  const {user }= useContext(AppContext)

  useEffect(() => {
    (async () => {
      const result = await get_course_list();
      setData(result.courses);
    })();
  }, []);
  const handlePress= (id)=> {
    if(user) {
      const isPurchased = user.courses?.find(
        (item) => item._id === id
      );
      if(isPurchased) {
        navigation.navigate("CourseAccess", {courseId: id})
      }
      else {
        navigation.navigate("DetailCourse", {courseId: id}) 
      }
    } 
    else {
      navigation.navigate("DetailCourse", {courseId: id})
    }
  }
  const renderData = (data) => {
    return data?.map((item, key) => (
      <TouchableHighlight key={key} onPress={()=> handlePress(item._id)} style={{width: "100%"}} underlayColor={"unset"}>
        <View
            style={{
            width: "100%",
            borderRadius: 5,
            padding: 10,
            borderColor: "#e7e7e7",
            borderStyle: "solid",
            borderWidth: 1,
            marginBottom: 24,
            }}
        >
            <Image
            style={{
                width: "100%",
                aspectRatio: 1,
                objectFit: "contain",
                borderRadius: 5,
                marginBottom: 24,
            }}
            source={{ uri: item?.thumbnail?.url }}
            />
            <Text style={{ fontWeight: "600", fontSize: 18, marginBottom: 12 }}>
            {item.name}
            </Text>
            <View style={{width: "100%", display: "flex", justifyContent: "flex-start", flexDirection: "row"}}>
            <Rating
                ratingCount={item.ratings}
                style={{ paddingVertical: 10 }}
                imageSize={18}
            />
            </View>
        </View>
      </TouchableHighlight>
    ));
  };
  return (
    <View
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
      }}
    >
      {renderData(data)}
    </View>
  );
};

export default CourseListCourse;
