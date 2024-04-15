import React, { useContext, useState } from "react";
import { Button, Image, TextInput } from "react-native";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import add_answer from "../../api/put/add_answer";
import { CourseAccessContext } from "../../screen/CourseAccess";
import { useRoute } from "@react-navigation/native";

const Replies = ({ item }) => {
  const route = useRoute();
  const { courseId } = route.params;
  const { dataCurrent, setChange } = useContext(CourseAccessContext);
  const [open, setOpen] = useState(false);
  const [answer, setAnswer] = useState();
  const handleAnswer = async () => {
    try {
      const result = await add_answer({
        answer,
        courseId,
        contentId: dataCurrent?._id,
        questionId: item?._id
      });
      setChange((prev) => !prev);
      setAnswer("");
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <View>
      {item?.questionReplies?.length > 0 && (
        <View style={{ marginTop: 4 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <Text
              onPress={() => {
                setOpen((prev) => !prev);
              }}
              style={{ fontSize: 16, marginRight: 12 }}
            >
              {open === true ? "Hide Replies" : "All Replies"}
            </Text>
            <Icon name="comment-alt" size={18} />
            <Text style={{ marginLeft: 8 }}>
              {item?.questionReplies?.length}
            </Text>
          </View>
          {open === true && (
            <View style={{ marginLeft: 24 }}>
              {item?.questionReplies?.length > 0 &&
                item?.questionReplies?.map((item, key) => (
                  <View key={key} style={{ marginBottom: 12 }}>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Image
                        source={{ uri: item?.user?.avatar?.url }}
                        style={{ width: 60, height: 60, borderRadius: 30 }}
                      />
                      <View style={{ marginLeft: 12 }}>
                        <Text style={{ fontSize: 18, fontWeight: "600" }}>
                          {item?.user?.name}
                        </Text>
                        <Text style={{ fontSize: 16 }}>{item?.answer}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              <TextInput
                value={answer}
                onChangeText={setAnswer}
                placeholder="Add your answer"
                multiline={true}
                style={{
                  width: "100%",
                  borderRadius: 5,
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "#e7e7e7",
                  marginTop: 12,
                  height: 40,
                  textAlignVertical: "top",
                  padding: 10,
                }}
              />
              <Button onPress={handleAnswer} title="Submit reply"></Button>
            </View>
          )}
          {/*  */}
        </View>
      )}
      {item?.questionReplies?.length <= 0 && (
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <Text
              onPress={() => {
                setOpen((prev) => !prev);
              }}
              style={{ fontSize: 16, marginRight: 12 }}
            >
              {open === true ? "Hide Replies" : "Add Replies"}
            </Text>
            <Icon name="comment-alt" size={18} />
            <Text style={{ marginLeft: 8 }}>
              {item?.questionReplies?.length}
            </Text>
          </View>
          {open === true && (
            <View style={{ marginLeft: 24 }}>
              {item?.questionReplies?.length > 0 &&
                item?.questionReplies?.map((item, key) => (
                  <View key={key} style={{ marginBottom: 12 }}>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Image
                        source={{ uri: item?.user?.avatar?.url }}
                        style={{ width: 60, height: 60, borderRadius: 30 }}
                      />
                      <View style={{ marginLeft: 12 }}>
                        <Text style={{ fontSize: 18, fontWeight: "600" }}>
                          {item?.user?.name}
                        </Text>
                        <Text style={{ fontSize: 16 }}>{item?.answer}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              <TextInput
                value={answer}
                onChangeText={setAnswer}
                placeholder="Add your answer"
                multiline={true}
                style={{
                  width: "100%",
                  borderRadius: 5,
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "#e7e7e7",
                  marginTop: 12,
                  height: 40,
                  textAlignVertical: "top",
                  padding: 10,
                }}
              />
              <Button onPress={handleAnswer} title="Submit reply"></Button>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default Replies;
