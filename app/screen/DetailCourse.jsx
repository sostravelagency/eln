import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import get_detail_course from "../api/get/get_detail_course";
import { Rating } from "react-native-ratings";
import Icon from "react-native-vector-icons/Ionicons";
import Item from "../component/DetailCourse/Item";
import ItemReview from "../component/DetailCourse/ItemReview";
import { AppContext } from "../../App";

const DetailCourse = () => {
  const navigation= useNavigation()
  const {auth }= useContext(AppContext)
  const [data, setData] = useState();
  const params = useRoute().params;
  const courseId = params.courseId;
  

  useEffect(() => {
    (async () => {
      const result = await get_detail_course(courseId);
      setData(result.course);
    })();
  }, [courseId]);

  const handleClick= async ()=> {
    if(auth=== true) {
     
    }
    else {
      navigation.navigate("Login", {from: "DetailCourse", courseId})
    }
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ width: "100%", padding: 12 }}>
        <View style={{ width: "100%", marginBottom: 12 }}>
          <Image
            source={{ uri: data?.thumbnail.url }}
            style={{ width: "100%", aspectRatio: 4 / 3 }}
          />
        </View>
        <View
          style={{ display: "flex", flexDirection: "row", marginBottom: 12 }}
        >
          <Text style={{ fontSize: 20, fontWeight: "600" }}>
            {data?.price}$
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "600", marginLeft: 12 }}>
            {data?.estimatedPrice}$
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "600", marginLeft: 12 }}>
            {Math.ceil((data?.price / data?.estimatedPrice) * 100)}% Off
          </Text>
        </View>
        <View style={{ alignItems: "baseline", marginBottom: 24 }}>
          <TouchableHighlight
            onPress={handleClick}
            style={{
              paddingTop: 12,
              paddingBottom: 12,
              paddingLeft: 30,
              paddingRight: 30,
              borderRadius: 80,
              backgroundColor: "#dc143c",
              width: "max-content",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600", color: "white" }}>
              Buy now {data?.price}$
            </Text>
          </TouchableHighlight>
        </View>
        <View style={{ alignItems: "baseline", marginBottom: 12 }}>
          <Text style={{ marginBottom: 6 }}>· Source code included</Text>
          <Text style={{ marginBottom: 6 }}>· Full lifetime access</Text>
          <Text style={{ marginBottom: 6 }}>· Certificate of completion</Text>
          <Text style={{ marginBottom: 6 }}>· Premium support</Text>
        </View>
        <View style={{ alignItems: "baseline", marginBottom: 12 }}>
          <Text style={{ fontSize: 24, fontWeight: "600" }}>{data?.name}</Text>
        </View>
        <View
          style={{
            alignItems: "baseline",
            marginBottom: 12,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Rating
              ratingCount={5}
              style={{ paddingVertical: 10 }}
              imageSize={18}
            />
            <Text>{data?.reviews?.length || 0} Reviews</Text>
          </View>
          <View>
            <Text>{data?.purchased || 0} Students</Text>
          </View>
        </View>
        <View style={{ alignItems: "baseline", marginBottom: 12 }}>
          <Text style={{ fontSize: 24, fontWeight: "600", marginBottom: 18 }}>
            What you learn from this course?
          </Text>
          {data?.benefits?.map((item, key) => (
            <View
              key={key}
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: 12,
              }}
            >
              <Icon name="checkmark-done-outline" size={16} />
              <Text style={{ marginLeft: 10 }}>{item.title}</Text>
            </View>
          ))}
        </View>
        <View style={{ marginBottom: 24 }}></View>
        <View style={{ alignItems: "baseline", marginBottom: 12 }}>
          <Text style={{ fontSize: 24, fontWeight: "600", marginBottom: 18 }}>
            What are the prerequisites for starting this course?
          </Text>
          {data?.prerequisites?.map((item, key) => (
            <View
              key={key}
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: 12,
              }}
            >
              <Icon name="checkmark-done-outline" size={16} />
              <Text style={{ marginLeft: 10 }}>{item.title}</Text>
            </View>
          ))}
        </View>
        {/*  */}
        <View style={{ marginBottom: 24 }}></View>
        <View style={{ alignItems: "baseline", marginBottom: 12 }}>
          <Text style={{ fontSize: 24, fontWeight: "600", marginBottom: 18 }}>
            Course Overview
          </Text>
          {data?.courseData?.map((item, key) => (
            <Item key={key} {...item} />
          ))}
        </View>
        <View style={{ marginBottom: 24 }}></View>
        <View style={{ alignItems: "baseline", marginBottom: 12 }}>
          <Text style={{ fontSize: 24, fontWeight: "600", marginBottom: 18 }}>
            Course Details
          </Text>
          <Text style={{ fontSize: 16 }}>{data?.description}</Text>
        </View>
        <View style={{ marginBottom: 24 }}></View>
        <View style={{ alignItems: "baseline", marginBottom: 12 }}>
          <Rating
            ratingCount={5}
            style={{ paddingVertical: 10 }}
            imageSize={18}
          />
          <View style={{ display: "flex", alignItems: "center" }}>
            <Text style={{ fontSize: 24 }}>
              {data?.ratings?.toFixed(1)} Course Rating ·{" "}
              {data?.reviews?.length} Reviews
            </Text>
            
          </View>
          {data?.reviews?.map((item, key) => (
              <ItemReview key={key} {...item} />
            ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailCourse;
