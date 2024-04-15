import React from "react";
import { ScrollView, Text, View } from "react-native";
import Item from "../component/FAQ/Item";

const FAQ = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ width: "100%" }}>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            padding: 12,
            marginBottom: 12,
          }}
        >
          <Text style={{ fontWeight: "600", fontSize: 24 }}>
            Frequently Asked Questions
          </Text>
        </View>
        <Item
          title={"Does the website offer any courses ?"}
          content="Yes, we provide a variety of courses covering different programming languages, frameworks, and technology topics"
        />
        <Item
          title={"How do I enroll in a course?"}
          content="To enroll, simply create an account on our website and then select the course you wish to join."
        />
        <Item
          title={"Are the courses free"}
          content="Some courses may require payment, but we also offer free courses to help individuals get started."
        />
        <Item
          title={"How long does it take to complete a course?"}
          content="The time to complete a course varies. Specific information will be provided when you view the course details."
        />
        <Item
          title={"Are study materials provided?"}
          content="Yes, each course comes with detailed study materials to support your learning journey."
        />
        <Item
          title={"Can I access the course materials after completing the course?"}
          content="Yes, you will have continued access to course materials even after completing the course, allowing you to review the content at your own pace."
        />
        <Item
          title={"Are there prerequisites for enrolling in certain courses?"}
          content="Some courses may have prerequisites, and these requirements will be outlined in the course details to help you determine if the content aligns with your current skill level."
        />
        <Item
          title={"How can I provide feedback on the courses and suggest new topics?"}
          content="We welcome your feedback! You can share your thoughts and suggest new topics through our platform's feedback form or participate in surveys that we periodically conduct to enhance the learning experience."
        />
        <Item
          title={"Is there a community forum for students to connect and collaborate?"}
          content="Yes, we have a dedicated community forum where students can interact, ask questions, and collaborate on projects, fostering a sense of community among learners."
        />
        <Item
          title={"Can I access the courses on multiple devices?"}
          content="Yes, our platform is designed to be accessible across various devices, allowing you to seamlessly switch between desktop, tablet, and mobile for an optimal learning experience."
        />
      </View>
    </ScrollView>
  );
};

export default FAQ;
