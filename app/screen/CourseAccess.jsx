import React, { createContext, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import get_course_content from "../api/get/get_course_access";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Overview from "../subscreen/course_access/Overview";
import Resources from "../subscreen/course_access/Resources";
import QAA from "../subscreen/course_access/QAA";
import Reviews from "../subscreen/course_access/Reviews";
import Chatbots from "../subscreen/course_access/Chatbots";
import Scripts from "../subscreen/course_access/Scripts";
import get_detail_course from "../api/get/get_detail_course";
const Tab = createMaterialTopTabNavigator();

export const CourseAccessContext = createContext();
const CourseAccess = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [change, setChange]= useState(false)
  const navigation = useNavigation();
  const route = useRoute();
  const { courseId } = route.params;
  const [courseContent, setCourseContent] = useState();
  const [course, setCourse] = useState();
  const [dataCurrent, setDataCurrent] = useState();
  useEffect(()=> {
    (async ()=> {
      try {
        const result = await get_detail_course(courseId);
        setCourse(result);
      } catch (error) {
        console.log(error);
      }
    })()
  }, [change])
  useEffect(() => {
    (async () => {
      try {
        const result = await get_course_content(courseId);
        setCourseContent(result.content);
        setDataCurrent(result.content[currentPage]);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [courseId, change, currentPage]);

  const handlePage = (state) => {
    if (state == 0) {
      if (currentPage - 1 < 0) {
        return;
      } else {
        setCurrentPage(parseInt(currentPage) - 1);
        setDataCurrent(courseContent[parseInt(currentPage) - 1])
      }
    } else if (state == 1) {
      if (currentPage + 1 >= courseContent.length) {
        return;
      } else {
        setCurrentPage(parseInt(currentPage) + 1);
        setDataCurrent(courseContent[parseInt(currentPage) + 1])

      }
    }
  };
  return (
    <CourseAccessContext.Provider
      value={{ currentPage, dataCurrent, courseId, course, change, setChange }}
    >
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1, padding: 10 }}>
          <View style={{ width: "100%" }}>
            <View style={{ width: "100%" }}>
              <Image
                style={{
                  width: "100%",
                  aspectRatio: 4 / 3,
                  objectFit: "cover",
                }}
              />
            </View>
          </View>
          <View
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              marginBottom: 24,
            }}
          >
            <TouchableHighlight
              style={{
                backgroundColor: "#2190ff",
                borderRadius: 80,
                paddingLeft: 10,
                paddingRight: 10,
              }}
              onPress={() => handlePage(0)}
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
                <Icon name="arrow-back" color={"white"} size={24} />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    marginLeft: 12,
                    color: "white",
                  }}
                >
                  Prev lession
                </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={{
                backgroundColor: "#2190ff",
                borderRadius: 80,
                paddingLeft: 10,
                paddingRight: 10,
              }}
              onPress={() => handlePage(1)}
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
                  Next lession
                </Text>
                <Icon name="arrow-forward" color={"white"} size={24} />
              </View>
            </TouchableHighlight>
          </View>
          <View style={{ width: "100%", marginBottom: 24 }}>
            <Text style={{ fontSize: 20, fontWeight: "600" }}>
              {dataCurrent?.title}
            </Text>
          </View>
          <View style={{ width: "100%", flex: 1 }}>
            <Tab.Navigator>
              <Tab.Screen
                name="Overview"
                component={Overview}
                options={{ title: "Overview" }}
                initialParams={{ courseId, currentPage, dataCurrent }}
              />
              <Tab.Screen
                name="Resources"
                component={Resources}
                options={{ title: "Resource" }}
                initialParams={{ courseId, currentPage, dataCurrent }}
              />
              <Tab.Screen
                name="QAA"
                component={QAA}
                options={{ title: "Q&A" }}
                initialParams={{ courseId, currentPage, dataCurrent }}
              />
              <Tab.Screen
                name="Reviews"
                component={Reviews}
                options={{ title: "Reviews" }}
                initialParams={{ courseId, currentPage, dataCurrent }}
              />
              {/* <Tab.Screen
              name="Chatbots"
              component={Chatbots}
              options={{ title: "Chatbots" }}
            />
            <Tab.Screen
              name="Scripts"
              component={Scripts}
              options={{ title: "Scripts" }}
            /> */}
            </Tab.Navigator>
          </View>
        </View>
      </View>
    </CourseAccessContext.Provider>
  );
};

export default CourseAccess;
