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
import Stars from "react-native-stars";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet } from "react-native";
const Reviews = () => {
  const route = useRoute();
  const { courseId } = route.params;
  const { user } = useContext(AppContext);
  const [review, setReview]= useState()
  const { dataCurrent, course, setChange } = useContext(CourseAccessContext);
  const [rating, setRating] = useState(0);
  const handleRating = (rating) => {
    setRating(rating);
  };

  const isReviewExists = course?.course?.reviews?.find(
    (item) => item.user._id === user._id
  );

  const handleReview = async () => {
    try {
      const result = await add_review(
        {
          // answer,
          courseId,
          contentId: dataCurrent?._id,
          rating: rating,
          review
          // questionId: item?._id,
        },
        courseId
      );
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
                value={review}
                onChangeText={setReview}
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
                    <Stars
                      default={item?.rating}
                      count={5}
                      half={false}
                      starSize={200}
                      fullStar={
                        <Icon
                          size={24}
                          name={"star"}
                          style={[styles.myStarStyle]}
                        />
                      }
                      emptyStar={
                        <Icon
                          size={24}
                          name={"star-outline"}
                          style={[styles.myStarStyle, styles.myEmptyStarStyle]}
                        />
                      }
                      halfStar={
                        <Icon
                          size={24}
                          name={"star-half"}
                          style={[styles.myStarStyle]}
                        />
                      }
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
const styles = StyleSheet.create({
  myStarStyle: {
    color: "orange",
    backgroundColor: "transparent",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  myEmptyStarStyle: {
    color: "white",
  },
});
