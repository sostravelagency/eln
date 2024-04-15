import { ListItem } from "@rneui/base";
import React, { useState } from "react";
import { View } from "react-native";

const Item = (props) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <View style={{ width: "100%", marginBottom: 12 }}>
      <ListItem.Accordion
        content={
          <>
            <ListItem.Content>
              <ListItem.Title style={{fontWeight: "600", fontSize: 18}}>{props?.title}</ListItem.Title>
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
            <ListItem.Title>{props?.content}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </ListItem.Accordion>
    </View>
  );
};

export default Item;
