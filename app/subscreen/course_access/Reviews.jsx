import React, { useContext, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import { AirbnbRating, Rating } from "react-native-ratings";
import { AppContext } from "../../../App";
import { CourseAccessContext } from "../../screen/CourseAccess";
import add_review from "../../api/put/add_review";
import { useRoute } from "@react-navigation/native";

const Reviews = () => {
    const route= useRoute()
    const {courseId }= route.params
  const { user } = useContext(AppContext);
  const { dataCurrent, course } = useContext(CourseAccessContext);
  const [rating, setRating] = useState(0);
  const handleRating = (rating) => {
    setRating(rating);
  };

  const isReviewExists = course?.course?.reviews?.find(
    (item) => item.user._id === user._id
  );

  const handleReview = async () => {
    try {
      const result = await add_review({
        // answer,
        courseId,
        contentId: dataCurrent?._id,
        // questionId: item?._id,
      });
      setChange((prev) => !prev);
      setAnswer("");
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <View
      style={{
        width: "100%",
        flex: 1,
        backgroundColor: "white",
        paddingTop: 12,
      }}
    >
      <ScrollView>
        {!isReviewExists && (
          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              marginBottom: 24,
            }}
          >
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingRight: 10,
              }}
            >
              <Image
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  objectFit: "cover",
                }}
                source={{ uri: user?.avatar?.url }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{ fontSize: 18, fontWeight: "600", marginBottom: 12 }}
              >
                Give a Rating *
              </Text>
              <View
                style={{
                  justifyContent: "flex-start",
                  display: "flex",
                  width: "30%",
                  marginBottom: 12,
                }}
              >
                <Rating
                  count={5}
                  defaultRating={rating}
                  imageSize={20}
                  onFinishRating={handleRating}
                />
              </View>
              <TextInput
                placeholder="Write your review"
                multiline={true}
                style={{
                  width: "100%",
                  borderStyle: "solid",
                  borderColor: "#e7e7e7",
                  borderWidth: 1,
                  borderRadius: 10,
                  height: 100,
                  padding: 10,
                  textAlignVertical: "top",
                  marginBottom: 12,
                }}
              />
              <TouchableHighlight
                onPress={handleReview}
                style={{
                  backgroundColor: "#2190ff",
                  borderRadius: 80,
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    padding: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      marginRight: 12,
                      color: "white",
                    }}
                  >
                    Submit
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        )}
        <View style={{ width: "100%" }}>
          {course?.course?.reviews?.map((item, key) => (
            <View style={{ width: "100", marginBottom: 12 }} key={key}>
              <View
                style={{ width: "100%", display: "flex", flexDirection: "row" }}
              >
                <Image
                  source={{ uri: item?.user?.avatar?.url }}
                  style={{ width: 60, height: 60, borderRadius: 30 }}
                />
                <View style={{ marginLeft: 12 }}>
                  <Text style={{ fontSize: 18, fontWeight: "600" }}>
                    {item?.user?.name}
                  </Text>
                  <View style={{ marginTop: 4 }}>
                    <Rating
                      count={5}
                      defaultRating={5}
                      imageSize={20}
                      onFinishRating={handleRating}
                    />
                    <Text style={{ fontSize: 16, marginTop: 4 }}>
                      {item?.comment}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Reviews;
