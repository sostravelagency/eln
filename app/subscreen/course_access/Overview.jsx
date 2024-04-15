import React, { useContext, useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { CourseAccessContext } from "../../screen/CourseAccess";

const Overview = ({ route }) => {
  const { dataCurrent } = useContext(CourseAccessContext);
  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingTop: 12}}>
      <ScrollView>
        <Text style={{fontSize: 16, lineHeight: 24}}>{dataCurrent?.description}</Text>
      </ScrollView>
    </View>
  );
};

export default Overview;
