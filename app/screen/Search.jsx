import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableHighlight, View } from "react-native";
import Header from "../component/Header/Header";
import CourseListCourse from "../component/Course/CourseList";
import get_categories_list from "../api/get/get_categories_list";

const SearchScreen = () => {
  const [categories, setCategories] = useState([]);
  const [course, setCourse] = useState([]);
  const [currentCategories, setCurrentCategories] = useState(0);

  useEffect(() => {
    (async () => {
      const result1 = await get_categories_list();
      setCategories(result1.layout.categories);
    })();
  }, []);

  const handleClickCategories= (page)=> {
    setCurrentCategories(page)
  }

  const renderCategories = (data) => {
    return data?.map((item, key) => (
      <TouchableHighlight onPress={()=> handleClickCategories(parseInt(key) + 1)} key={key} underlayColor={"unset"}>
        <View
          style={{
            backgroundColor: currentCategories== (parseInt(key) + 1) ? "#dc143c" : "#5050cb",
            borderRadius: 80,
            padding: 10,
            paddingRight: 16,
            paddingLeft: 16,
            marginLeft: 12,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>{item.title}</Text>
        </View>
      </TouchableHighlight>
    ));
  };
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <Header />
      <View
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          flexWrap: "wrap",
          marginTop: 12,
        }}
      >
        <TouchableHighlight onPress={()=> handleClickCategories(0)} underlayColor={"unset"}>
          <View
            style={{
              backgroundColor: currentCategories== 0 ? "#dc143c" : "#5050cb",
              borderRadius: 80,
              padding: 10,
              paddingRight: 16,
              paddingLeft: 16,
              marginLeft: 12,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>All</Text>
          </View>
        </TouchableHighlight>
        {renderCategories(categories)}
        <View style={{width: "100%", marginBottom: 24}}>
            <CourseListCourse />
        </View>
      </View>
    </ScrollView>
  );
};

export default SearchScreen;
