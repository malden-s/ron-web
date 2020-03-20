import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native-web";
import { Colors } from "../constants/colors";

interface Props {
  title: string;
  disabled?: boolean;
  color?: string;
  colorReceive?: boolean;
  onPress: () => void;
}

export default function PrimaryButton({
  onPress,
  title,
  disabled,
  color,
  colorReceive
}: Props) {
  return (
    <TouchableOpacity
      style={
        disabled
          ? styles.btnSend
          : [
              styles.btnSendFill,
              color === "green"
                ? { backgroundColor: Colors.FrogGreen }
                : void 0,
              colorReceive ? styles.btnBackground : void 0
            ]
      }
      activeOpacity={0.5}
      disabled={disabled}
      onPress={disabled ? () => {} : onPress}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 16,
          color: colorReceive ? Colors.ClearBlue : "#fff",
          fontWeight: "500"
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export function BottomPrimaryButton(props: Props) {
  return (
    <View style={{ marginBottom: 20 }}>
      <PrimaryButton {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  btnSendFill: {
    backgroundColor: Colors.ClearBlue, // "rgb(38,105,255)",
    justifyContent: "center",
    borderRadius: 5,
    height: 50,
    marginHorizontal: "2%"
  },
  btnSend: {
    backgroundColor: Colors.LightPeriwinkle, // "rgb(204,220,255)",
    justifyContent: "center",
    borderRadius: 5,
    height: 50,
    marginHorizontal: "2%"
  },
  btnBackground: {
    backgroundColor: "rgba(204, 220, 255, 0.3)"
  }
});
