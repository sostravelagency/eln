import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import get_course_list from "../../api/get/get_course_list";
import { Rating, AirbnbRating } from "react-native-ratings";

const CourseList = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await get_course_list();
      setData(result.courses);
    })();
  }, []);

  const renderData = (data) => {
    return data?.map((item, key) => (
      <View
        key={key}
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

export default CourseList;
