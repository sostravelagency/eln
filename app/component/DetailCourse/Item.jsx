import { ListItem } from "@rneui/base";
import React, { useState } from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/Octicons";

const Item = (props) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <View style={{ width: "100%", marginBottom: 12 }}>
      <ListItem.Accordion
        content={
          <>
            <ListItem.Content>
              <ListItem.Title style={{fontWeight: "600", fontSize: 20}}>{props?.title}</ListItem.Title>
              <ListItem.Subtitle>1 lession · {props?.videoLength} minutes</ListItem.Subtitle>
            </ListItem.Content>
          </>
        }
        isExpanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
        }}
      >
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>
                <View style={{display: 'flex', flexDirection: "row"}}>
                    <Icon name="video" size={16} color={"#1CDADA"} />
                    <View style={{marginLeft: 12, marginTop: -4}}>
                        <Text style={{fontSize: 16}}>Introduction to Python</Text>
                        <Text style={{fontSize: 14}}>{props?.videoLength} minutes</Text>
                    </View>
                </View>
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </ListItem.Accordion>
    </View>
  );
};

export default Item;
