import React, { useContext, useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableHighlight, View } from "react-native";
import { AppContext } from "../../../App";
import { CourseAccessContext } from "../../screen/CourseAccess";
import Icon from "react-native-vector-icons/FontAwesome5";
import Replies from "../../component/QAA/Replies";
import add_answer from "../../api/put/add_answer";
import { useRoute } from "@react-navigation/native";
import add_question from "../../api/put/add_question";

const QAA = () => {
  const route= useRoute()
  const {courseId }= route.params
  const { user } = useContext(AppContext);
  const [question, setQuestion]= useState()
  const { dataCurrent, setChange } = useContext(CourseAccessContext);
  const handleQuestion= async ()=> {
    try {
      const result= await add_question({question, courseId, contentId: dataCurrent?._id})
      setChange(prev=> !prev)
      setQuestion("")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingTop: 12 }}>
      <ScrollView>
        <View style={{ width: "100%", display: "flex", flexDirection: "row" }}>
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
            <TextInput
              value={question}
              onChangeText={setQuestion}
              placeholder="Write your question"
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
                marginBottom: 12
              }}
            />
            <TouchableHighlight
              onPress={handleQuestion}
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
        <View style={{width: "100%", marginTop: 24}}>
          {dataCurrent?.questions?.map((item, key)=> <View style={{width: "100%", marginBottom: 20}} key={key}>
              <View style={{display: "flex", flexDirection: "row"}}>
                <Image source={{uri: item?.user?.avatar?.url}} style={{width: 60, height: 60, borderRadius: 30}} />
                <View style={{marginLeft: 12}}>
                  <Text style={{fontSize: 18, fontWeight: "600"}}>{item?.user?.name}</Text>
                  <Text style={{fontSize: 16}}>{item?.question}</Text>
                </View>
              </View>
              <View>
                <Replies item={item} />
              </View>
          </View>)}
        </View>
      </ScrollView>
    </View>
  );
};

export default QAA;
