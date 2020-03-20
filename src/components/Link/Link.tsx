import React from "react";
import { TouchableOpacity, Text } from "react-native-web";
import { Colors } from "../../constants/colors";

interface Props {
  onPress: () => void;
}

const Link: React.FC<Props> = props => (
  <TouchableOpacity onPress={props.onPress} style={{ flexShrink: 1 }}>
    <Text
      style={{
        color: Colors.ClearBlue
      }}
    >
      {props.children}
    </Text>
  </TouchableOpacity>
);

export default Link;
