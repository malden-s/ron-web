import React, { ReactNode } from "react";
import {
  Text,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  StyleSheet
} from "react-native-web";
import { Colors } from "../constants/colors";

interface Props {
  title: string | ReactNode;
  disabled?: boolean;

  theme?: "clearBlue" | "lightPeriwinkle";
  onPress: () => void;
}

const Button = ({ onPress, title, disabled, theme }: Props) => {
  let backgroundColor = "transparent";
  let textColor = "grey";
  if (theme === "clearBlue") {
    backgroundColor = Colors.ClearBlue;
    textColor = "white";
  } else if (theme === "lightPeriwinkle") {
    backgroundColor = Colors.LightPeriwinkleWithOpacity(0.3);
    textColor = Colors.ClearBlue;
  }

  const buttonStyle: StyleProp<ViewStyle> = [
    styles.buttonStyle,
    {
      opacity: disabled ? 0.5 : 1,
      backgroundColor
    }
  ];

  const titleStyle = [styles.textStyle, { color: textColor }];

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle} disabled={disabled}>
      <Text style={titleStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 16,
    fontWeight: "500"
  },
  buttonStyle: {
    flex: 1,
    padding: 14,
    backgroundColor: "transparent",
    borderColor: "clear",
    justifyContent: "center",
    alignItems: "center",
    boxShadow:
      "0px -4px 4px rgba(0, 0, 0, 0.24), 0px 0px 4px rgba(0, 0, 0, 0.12)"
  }
});

export default Button;
